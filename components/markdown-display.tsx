"use client"

import ReactMarkdown from "react-markdown"
import { cn } from "@/lib/utils"

export function MarkdownDisplay({ content, className }: { content: string; className?: string }) {
  return (
    <div className={cn("w-full max-w-[800px] mx-auto px-8", className)}>
      <article
        className="prose prose-slate max-w-none dark:prose-invert
        /* Base styles */
        prose-p:text-gray-800 dark:prose-p:text-gray-200 prose-p:leading-7 prose-p:my-4
        
        /* Headings */
        prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-gray-100
        prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
        prose-h2:text-2xl prose-h2:mt-7 prose-h2:mb-3
        prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
        
        /* Lists */
        prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
        prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
        
        /* Links */
        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        
        /* Code */
        prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5
        prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg
        
        /* Blockquotes */
        prose-blockquote:border-l-4 prose-blockquote:border-gray-200 dark:prose-blockquote:border-gray-700
        prose-blockquote:pl-4 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
        
        /* Images */
        prose-img:rounded-lg prose-img:my-6"
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </div>
  )
}

