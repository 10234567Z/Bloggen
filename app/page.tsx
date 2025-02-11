import { Toaster } from "sonner"
import { BlogGenerator } from "../components/blog-generator"
import { Settings } from "../components/settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Page() {
  return (
    <div className="container mx-auto py-8">
      <Toaster />
      <h1 className="text-3xl font-bold mb-8">Dev.to Blog Generator</h1>

      <Tabs defaultValue="generator" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="generator">
          <BlogGenerator />
        </TabsContent>

        <TabsContent value="settings">
          <Settings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

