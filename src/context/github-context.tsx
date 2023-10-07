import { Repo, User } from "@/types/types";
import { createContext, useState } from "react";

interface Github {
  user: User | null
  getUserData: (url: string) => Promise<void>
  repos: Repo[]
  getRepos: (url: string) => Promise<void>
}


export const GithubContext = createContext({} as Github)

export const GithubProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [repos, setRepos] = useState<Repo[]>([])

  async function getUserData(url: string) {
    const response = await fetch(url)
    const data: User = await response.json()

    setUser(data)
  }

  async function getRepos(url: string) {
    const response = await fetch(url)
    const data: Repo[] = await response.json()

    console.log(data)
    setRepos(data)
  }

  return (
    <GithubContext.Provider value={{ repos, getRepos, getUserData, user }}>
      {children}
    </GithubContext.Provider>
  )
}