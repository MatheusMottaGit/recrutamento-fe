import { GithubContext } from "@/context/github-context"
import { useContext } from "react"

export const useGithub = () => {
  const context = useContext(GithubContext)
  return context
}