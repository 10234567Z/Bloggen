import type { BlogPost, DevToCredentials } from "../types/blog"

const STORAGE_KEYS = {
  POSTS: "blog_posts",
  CREDENTIALS: "dev_to_credentials",
}

export const storage = {
  getPosts: (): BlogPost[] => {
    if (typeof window === "undefined") return []
    const posts = localStorage.getItem(STORAGE_KEYS.POSTS)
    return posts ? JSON.parse(posts) : []
  },

  savePosts: (posts: BlogPost[]) => {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
  },

  getCredentials: (): DevToCredentials | null => {
    if (typeof window === "undefined") return null
    const creds = localStorage.getItem(STORAGE_KEYS.CREDENTIALS)
    return creds ? JSON.parse(creds) : null
  },

  saveCredentials: (credentials: DevToCredentials) => {
    localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(credentials))
  },
}

