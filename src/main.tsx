import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AllRepos from './pages/repos/every-user-repos.tsx'
import RepoDetails from './pages/repo-details/user-repo-details.tsx'
import { GithubProvider } from './context/github-context.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/repos',
    element: <AllRepos />
  },
  {
    path: '/repos/:full_name',
    element: <RepoDetails />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GithubProvider>
      <RouterProvider router={router} />
    </GithubProvider>
  </React.StrictMode>,
)
