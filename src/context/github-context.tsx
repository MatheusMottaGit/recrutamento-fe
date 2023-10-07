import { Repo, User } from "@/types/types";
import { createContext, useState } from "react";

interface Github {
  user: User | null
  getUserData: (url: string) => Promise<void>
  repos: Repo[]
  getRepos: (url: string) => Promise<void>
  getRepoDetails: (url: string) => Promise<void>
}

export const GithubContext = createContext({} as Github)

export const GithubProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [repos, setRepos] = useState<Repo[]>([])
  const [repo, setRepo] = useState<Repo | null>(null)

  async function fetchApi<T>(url: string): Promise<T> {
    const response = await fetch(url)
    const data = await response.json()

    return data
  }

  async function getUserData(url: string) {
    const data = await fetchApi<User | null>(url)
    setUser(data)
  }

  async function getRepos(url: string) {
    const data = await fetchApi<Repo[]>(url)
    setRepos(data)
  }

  async function getRepoDetails(url: string) {
    const data = await fetchApi<Repo | null>(url)
    setRepo(data)
  }

  return (
    <GithubContext.Provider value={{
      repos,
      getRepos,
      getUserData,
      user,
      getRepoDetails
    }}
    >
      {children}
    </GithubContext.Provider>
  )
}