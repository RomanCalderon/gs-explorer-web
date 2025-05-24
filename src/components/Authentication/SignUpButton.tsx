import { useNavigate } from 'react-router-dom'
import './SignUpButton.css'

const SignUpButton = () => {
  const navigate = useNavigate();

  return (
    <button className='signup-button' onClick={() => navigate('/signup')}>Sign Up</button>
  )
}

export default SignUpButton