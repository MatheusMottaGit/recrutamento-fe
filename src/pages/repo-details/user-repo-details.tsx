import React from 'react'
import { useParams } from 'react-router-dom'

const RepoDetails = () => {
  const { id } = useParams()

  return (
    <div>RepoDetails: {id}</div>
  )
}

export default RepoDetails