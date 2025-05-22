import { useNavigate } from 'react-router-dom'
import './SignInButton.css'

const SignInButton = () => {
  const navigate = useNavigate();

  return (
    <button className='signin-button' onClick={() => navigate('/signin')}>Sign In</button>
  )
}

export default SignInButton