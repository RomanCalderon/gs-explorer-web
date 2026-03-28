import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Home from './pages/Home/Home'
import Layout from './pages/Layout'
import Signin from './pages/Signin/Signin'
import Signup from './pages/Signup'
import UpdatePassword from './pages/UpdatePassword/UpdatePassword'

export const router = createBrowserRouter([
  {
    path: '/', element: <App />, children: [
      {
        path: '/', element: <Layout />, children: [
          { index: true, element: <Home /> },
        ]
      },
      { path: 'signin', element: <Signin /> },
      { path: 'signup', element: <Signup /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'update-password', element: <UpdatePassword /> },
    ]
  },
])
