import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Signin from './pages/Signin/Signin'
import Signup from './pages/Signup'
import Layout from './pages/Layout'
import Home from './pages/Home/Home'

export const router = createBrowserRouter([
  {
    path: '/', element: <App />, children: [
      {
        path: '/', element: <Layout />, children: [
          { path: '/', element: <Home /> },
        ]
      },
      { path: '/signin', element: <Signin /> },
      { path: '/signup', element: <Signup /> },
    ]
  },
])
