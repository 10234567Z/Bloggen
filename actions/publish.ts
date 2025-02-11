"use server"

export async function publishToDevTo(apiKey: string, post: { title: string; content: string; tags: string[] }) {
  try {
    const response = await fetch("https://dev.to/api/articles", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        article: {
          title: post.title,
          body_markdown: post.content,
          tags: post.tags,
          description: post.content.slice(0, 140),
        },
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to publish dev.to")
    }

    const data = await response.json()
    return { success: true, url: data.url }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

