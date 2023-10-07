import { Search } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardDescription, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { FormEvent, useState } from "react";
import SearchedUserCard from "./components/searched-user-card";
import { useGithub } from "./hooks/useGithub";

export function App() {
  const { getUserData, user } = useGithub()

  const [username, setUsername] = useState<string>('')

  function handleTypedUsername(username: string) {
    return username
  }

  async function searchForUser(event: FormEvent) {
    event.preventDefault()

    const githubUserName = handleTypedUsername(username)

    await getUserData(`https://api.github.com/users/${githubUserName}`)
  }

  return (
    <div className="px-10 py-10 min-h-screen flex">
      <main className="flex flex-col flex-1 items-center justify-center gap-8">
        <Card className="p-4 space-y-4 w-80">
          <div className="grid justify-center text-5xl">
            <GitHubLogoIcon className="text-4xl" />
          </div>

          <div className="space-y-2 text-center">
            <CardTitle>Pesquisar por usuário do Github</CardTitle>
            <CardDescription>Comece informando o nome de usuário que deseja abaixo.</CardDescription>
          </div>

          {/* seach for user form */}
          <form onSubmit={searchForUser} className="space-y-3">
            <div className="space-y-2">
              <Label>Usuário</Label>

              <Input
                value={username}
                placeholder="Digite aqui..."
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full font-bold gap-1">
              Pesquisar
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </Card>

        {user && <SearchedUserCard user={user} />}
      </main>
    </div>
  )
}
