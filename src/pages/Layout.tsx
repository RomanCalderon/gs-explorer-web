import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import SignOutButton from "../components/Authentication/SignOutButton";
import SignInButton from "../components/Authentication/SignInButton";

const Layout = () => {
  const auth = UserAuth()!;
  const { session } = auth;
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/');
    }
  }, [session, navigate]);

  return (
    <>
      {session ? (
        <div>
          <h1>Welcome, {session.user.email}</h1>
          <SignOutButton />
        </div>
      ) : (
        <SignInButton />
      )}
      <Outlet />
    </>
  )
};

export default Layout;
