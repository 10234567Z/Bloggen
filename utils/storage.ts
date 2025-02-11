import type { BlogPost, DevToCredentials } from "../types/blog"

const STORAGE_KEYS = {
  POSTS: "blog_posts",
  CREDENTIALS: "dev_to_credentials",
  DRAFTS: "blog_drafts",
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

  getDrafts: (): BlogPost[] => {
    if (typeof window === "undefined") return []
    const drafts = localStorage.getItem(STORAGE_KEYS.DRAFTS)
    return drafts ? JSON.parse(drafts) : []
  },

  saveDraft: (draft: BlogPost) => {
    const drafts = storage.getDrafts()
    const existingDraftIndex = drafts.findIndex((d) => d.id === draft.id)
    if (existingDraftIndex !== -1) {
      drafts[existingDraftIndex] = draft
    } else {
      drafts.push(draft)
    }
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts))
  },

  deleteDraft: (id: string) => {
    const drafts = storage.getDrafts()
    const updatedDrafts = drafts.filter((d) => d.id !== id)
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(updatedDrafts))
  },
}

