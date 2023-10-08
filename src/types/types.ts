export type Repo = {
  id: string
  name: string
  description: string
  full_name: string
}

export type User = {
  name: string
  login: string
  avatar_url: string
  bio: string
  email: string
  followers: number
  following: number
  repos_url: string
}
