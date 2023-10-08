import { Repo, User } from "@/types/types";
import { createContext, useState } from "react";

interface Github {
  user: User | null
  repos: Repo[]
  repo: Repo
  getUserData: (url: string) => Promise<void>
  getRepos: (url: string) => Promise<void>
  getRepoDetails: (repo_full_name: string) => Promise<void>
}

export const GithubContext = createContext({} as Github)

export const GithubProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [repos, setRepos] = useState<Repo[]>([])
  const [repo, setRepo] = useState({} as Repo)

  async function fetchHandler<T>(url: string): Promise<T> {
    const response = await fetch(url)
    const data = await response.json()

    return data
  }

  async function getUserData(url: string) {
    const data = await fetchHandler<User | null>(url)
    setUser(data)
  }

  async function getRepos(url: string) {
    const data = await fetchHandler<Repo[]>(url)
    setRepos(data)
  }

  async function getRepoDetails(repo_full_name: string) {
    const data = await fetchHandler<Repo>(repo_full_name)
    setRepo(data)
  }

  return (
    <GithubContext.Provider value={{ repos, getRepos, getUserData, user, repo, getRepoDetails }}>
      {children}
    </GithubContext.Provider>
  )
}