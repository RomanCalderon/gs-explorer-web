import { useNavigate } from 'react-router-dom'

const SignInButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/signin')}>Sign in</button>
  )
}

export default SignInButton