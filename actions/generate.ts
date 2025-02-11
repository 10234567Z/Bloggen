"use server"

import type { GeneratedContent } from "../types/blog"

export async function generateBlog(prompt: string): Promise<GeneratedContent> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/gen/blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })

    if (!response.ok) {
      throw new Error("Failed to generate blog content")
    }

    const data = await response.json()
    return data.generatedContent
  } catch (error) {
    throw new Error("Failed to generate blog:" + (error as Error).message)
  }
}

