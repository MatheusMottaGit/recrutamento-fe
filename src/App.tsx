import { Search } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardDescription, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { FormEvent, useState } from "react";
import { Avatar, AvatarImage } from "./components/ui/avatar";

interface User {
  name: string
  avatar_url: string
  bio: string
  email: string
  followers: number
  following: number
}

export function App() {
  const [user, setUser] = useState<User | null>(null)
  const [username, setUsername] = useState<string | null>(null)

  function handleTypedUsername(username: string | null) {
    return username
  }

  async function getUser(event: FormEvent) {
    event.preventDefault()

    const githubUserName = handleTypedUsername(username)

    const response = await fetch(`https://api.github.com/users/${githubUserName}`)
    const data: User = await response.json()
    setUser(data)
    console.log(data)
  }

  const userInfos = [
    {
      email: user?.email,
      followers: user?.followers,
      following: user?.following
    }
  ]

  return (
    <div className="px-10 py-10 min-h-screen flex">
      <main className="flex flex-1 items-center justify-center gap-20">
        <Card className="p-4 space-y-4 w-80">
          <div className="grid justify-center text-5xl">
            <GitHubLogoIcon className="text-4xl" />
          </div>

          <div className="space-y-2 text-center">
            <CardTitle>Pesquisar por usuário do Github</CardTitle>
            <CardDescription>Comece informando o nome de usuário que deseja abaixo.</CardDescription>
          </div>

          <form onSubmit={getUser} className="space-y-3">
            <div className="space-y-2">
              <Label>Usuário</Label>
              <Input
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

        {/* {user && (
          <Card className="p-4">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src={user.avatar_url} />
              </Avatar>

              <div className="space-y-2">
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>
                  {user.bio}
                </CardDescription>
              </div>
            </div>

            {userInfos.map(info )}
          </Card>
        )} */}


      </main>
    </div>
  )
}
