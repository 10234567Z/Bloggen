"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { publishToDevTo } from "../actions/publish"
import { storage } from "../utils/storage"
import type { BlogPost } from "../types/blog"

export function BlogEditor() {
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: "",
    content: "",
  })

  const handleSaveDraft = () => {
    const newPost: BlogPost = {
      id: crypto.randomUUID(),
      title: post.title || "",
      content: post.content || "",
      published: false,
      createdAt: new Date().toISOString(),
    }

    const posts = storage.getPosts()
    storage.savePosts([...posts, newPost])
  }

  const handlePublish = async () => {
    const credentials = storage.getCredentials()
    if (!credentials?.apiKey) {
      alert("Please set your dev.to API key first")
      return
    }

    const result = await publishToDevTo(credentials.apiKey, {
      title: post.title || "",
      content:  post.content || "",
      tags: [],
    })

    if (result.success) {
      const newPost: BlogPost = {
        id: crypto.randomUUID(),
        title: post.title || "",
        content: post.content || "",
        published: true,
        publishedUrl: result.url,
        createdAt: new Date().toISOString(),
      }

      const posts = storage.getPosts()
      storage.savePosts([...posts, newPost])
    } else {
      alert(`Failed to publish: ${result.error}`)
    }
  }

  return (
    <div className="space-y-4 p-4">
      <Input
        placeholder="Blog title"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <Textarea
        placeholder="Write your blog content (Markdown supported)"
        className="min-h-[300px]"
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
      />
      <div className="flex gap-2">
        <Button onClick={handleSaveDraft}>Save Draft</Button>
        <Button onClick={handlePublish} variant="default">
          Publish to dev.to
        </Button>
      </div>
    </div>
  )
}

