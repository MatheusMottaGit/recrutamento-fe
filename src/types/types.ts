export type Repo = {
  id: string
  name: string
  description: string
}

export type User = {
  name: string
  avatar_url: string
  bio: string
  email: string
  followers: number
  following: number
  repos_url: string
}
