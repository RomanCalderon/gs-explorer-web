import { UserAuth } from '../../context/AuthContext';

const SignOutButton = () => {
  const auth = UserAuth()!;
  const { signOut } = auth;

  const handleSignOut = async () => {
    await signOut();
  }

  return (
    <div>
      <button onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  )
}

export default SignOutButton