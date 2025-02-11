export interface GeneratedContent {
  title: string
  content: string
}

export interface BlogPost extends GeneratedContent {
  id: string
  published: boolean
  createdAt: string
  publishedUrl?: string
}

export interface DevToCredentials {
  apiKey: string
}

