import { useGithub } from '@/hooks/useGithub'
import { Repo } from '@/types/types'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const RepoDetails = () => {
  const { full_name } = useParams()
  const { getRepoDetails, repo } = useGithub()

  useEffect(() => {
    getRepoDetails(`https://api.github.com/users/${full_name}`)
  }, [])

  return (
    <div>
      {repo.name}
    </div>
  )
}

export default RepoDetails