import { Card, CardContent, CardDescription, CardTitle } from './ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from './ui/badge'
import { useEffect } from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { Clipboard } from 'lucide-react'
import { useGithub } from '@/hooks/useGithub'
import { User } from '@/types/types'

interface SearchedUserProps {
  user: User
}

const SearchedUserCard = (props: SearchedUserProps) => {
  const navigate = useNavigate()

  const { getRepos, repos } = useGithub()

  function pageHandler(url: string) {
    return navigate(url)
  }

  useEffect(() => {
    getRepos(props.user.repos_url)
  }, [])


  return (
    <Card className="p-4 space-y-7">

      {/* searched user basic infos */}
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={props.user.avatar_url} />
        </Avatar>

        <div className="space-y-2">
          <div className="flex items-center gap-4">
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

      {/* searched user repositories list */}
      <CardContent className='pb-0'>
        <div className='flex items-center justify-between'>
          <CardTitle>Repositórios</CardTitle>

          <Button variant='outline' className='gap-2' onClick={() => pageHandler('/repos')}>
            Ver repositórios
            <Clipboard className='w-4 h-4' />
          </Button>
        </div>

        <div className='mt-4 grid grid-cols-2 gap-3'>
          {repos.slice(0, 4).map(repo => {
            return (
              <Card className='p-3 rounded-md space-y-1' key={repo.id}>
                <div className='flex items-center justify-between'>
                  <CardTitle>{repo.name}</CardTitle>

                  <Button variant='link' className='text-zinc-700' onClick={() => pageHandler(`/repos/${repo.id}`)}>
                    Ver repositório
                  </Button>
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