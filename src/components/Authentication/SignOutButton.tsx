import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

const SignOutButton = () => {
  const auth = UserAuth()!;
  const { signOut } = auth;

  const handleSignOut = async () => {
    await signOut();
  }

  return (
    <div>
      <Link className='navbar-link' to='/' onClick={handleSignOut}>
        Sign Out
      </Link>
    </div>
  )
}

export default SignOutButton