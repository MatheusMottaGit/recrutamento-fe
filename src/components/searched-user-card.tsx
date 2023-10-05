import { User } from '@/App'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from './ui/badge'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

interface SearchedUserProps {
  user: User
}

type Repo = {
  name: string
  description: string
}

const SearchedUserCard = (props: SearchedUserProps) => {
  const [repos, setRepos] = useState<Repo[]>([])

  async function getRepos() {
    const response = await fetch(props.user.repos_url)
    const data: Repo[] = await response.json()

    console.log(data)
    setRepos(data)
  }

  useEffect(() => {
    getRepos()
  }, [])


  return (
    <Card className="p-4 space-y-7">
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={props.user.avatar_url} />
        </Avatar>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle>{props.user.name}</CardTitle>

            <div className="flex gap-3">
              <Badge>{props.user.email}</Badge>
              <Badge>Seguidores: {props.user.followers}</Badge>
              <Badge>Seguindo: {props.user.following}</Badge>
            </div>
          </div>

          <CardDescription>
            {props.user.bio}
          </CardDescription>
        </div>
      </div>

      <CardContent className='pb-0'>
        <CardTitle>Repositórios</CardTitle>

        <div className='mt-4 grid grid-cols-2 gap-3'>
          {repos.slice(0, 4).map(repo => {
            return (
              <Card className='p-3 rounded-md space-y-1'>
                <div className='flex items-center justify-between'>
                  <CardTitle>{repo.name}</CardTitle>
                </div>
                <CardDescription>{repo.description.slice(0, 115).concat('...')}</CardDescription>
              </Card>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default SearchedUserCard