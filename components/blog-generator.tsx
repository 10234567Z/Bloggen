"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MarkdownDisplay } from "./markdown-display"
import { generateBlog } from "../actions/generate"
import { publishToDevTo } from "../actions/publish"
import { storage } from "../utils/storage"
import type { BlogPost } from "../types/blog"
import { Loader2, Eye, Edit2, Save, Trash2 } from "lucide-react"
import { toast } from "sonner"

export function BlogGenerator() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<BlogPost | null>(null)
  const [isPublishing, setIsPublishing] = useState(false)
  const [drafts, setDrafts] = useState<BlogPost[]>([])

  useEffect(() => {
    setDrafts(storage.getDrafts())
  }, [])

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt")
      return
    }

    setIsGenerating(true)
    try {
      const content = await generateBlog(prompt)
      const newPost: BlogPost = {
        id: crypto.randomUUID(),
        title: content.title,
        content: content.content,
        published: false,
        createdAt: new Date().toISOString(),
      }
      setGeneratedContent(newPost)
      toast.success("Blog generated successfully!")
    } catch (error) {
      toast.error("Failed to generate blog" + error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePublish = async () => {
    if (!generatedContent) return

    const credentials = storage.getCredentials()
    if (!credentials?.apiKey) {
      toast.error("Please set your dev.to API key in settings")
      return
    }

    setIsPublishing(true)
    try {
      const result = await publishToDevTo(credentials.apiKey, {
        title: generatedContent.title,
        content: generatedContent.content,
        tags: [],
      })

      if (result.success) {
        const publishedPost: BlogPost = {
          ...generatedContent,
          published: true,
          publishedUrl: result.url,
        }

        const posts = storage.getPosts()
        storage.savePosts([...posts, publishedPost])
        storage.deleteDraft(generatedContent.id)
        setDrafts(storage.getDrafts())
        toast.success("Published to dev.to successfully!")
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast.error("Failed to publish to dev.to" + error)
    } finally {
      setIsPublishing(false)
    }
  }

  const handleContentChange = (field: keyof BlogPost, value: string) => {
    if (generatedContent) {
      const updatedContent = {
        ...generatedContent,
        [field]: value,
      }
      setGeneratedContent(updatedContent)
      storage.saveDraft(updatedContent)
    }
  }

  const handleSaveDraft = () => {
    if (generatedContent) {
      storage.saveDraft(generatedContent)
      setDrafts(storage.getDrafts())
      toast.success("Draft saved successfully!")
    }
  }

  const handleLoadDraft = (id: string) => {
    const draft = drafts.find((d) => d.id === id)
    if (draft) {
      setGeneratedContent(draft)
    }
  }

  const handleDeleteDraft = (id: string) => {
    storage.deleteDraft(id)
    setDrafts(storage.getDrafts())
    if (generatedContent?.id === id) {
      setGeneratedContent(null)
    }
    toast.success("Draft deleted successfully!")
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Generate Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter your blog topic or idea..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px]"
            disabled={isGenerating}
          />
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Select onValueChange={handleLoadDraft}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Load draft" />
            </SelectTrigger>
            <SelectContent>
              {drafts.map((draft) => (
                <SelectItem key={draft.id} value={draft.id}>
                  {draft.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()}>
            {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isGenerating ? "Generating..." : "Generate Blog"}
          </Button>
        </CardFooter>
      </Card>

      {generatedContent && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
          <Tabs defaultValue="preview" className="w-full">
            <div className="border-b border-gray-200 dark:border-gray-800">
              <div className="px-8 pt-6 flex items-center justify-between">
                <TabsList className="grid w-[400px] grid-cols-2">
                  <TabsTrigger value="preview" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="edit" className="flex items-center gap-2">
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </TabsTrigger>
                </TabsList>
                <div className="space-x-2">
                  <Button onClick={handleSaveDraft} size="sm" variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button onClick={handlePublish} disabled={isPublishing} size="sm">
                    {isPublishing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isPublishing ? "Publishing..." : "Publish to dev.to"}
                  </Button>
                </div>
              </div>
            </div>

            <TabsContent value="preview" className="mt-0">
              <div className="border-b border-gray-200 dark:border-gray-800 px-8 py-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{generatedContent.title}</h1>
              </div>
              <div className="py-8">
                <MarkdownDisplay content={generatedContent.content} />
              </div>
            </TabsContent>

            <TabsContent value="edit" className="mt-0">
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                  <Input
                    value={generatedContent.title}
                    onChange={(e) => handleContentChange("title", e.target.value)}
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                  <Textarea
                    value={generatedContent.content}
                    onChange={(e) => handleContentChange("content", e.target.value)}
                    className="min-h-[500px] font-mono text-sm"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {drafts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Saved Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {drafts.map((draft) => (
                <li key={draft.id} className="flex items-center justify-between">
                  <span>{draft.title}</span>
                  <div>
                    <Button onClick={() => handleLoadDraft(draft.id)} size="sm" variant="outline" className="mr-2">
                      Load
                    </Button>
                    <Button onClick={() => handleDeleteDraft(draft.id)} size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

