import { Navigate, Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import { UserAuth } from "../context/AuthContext";

const Layout = () => {
  const auth = UserAuth()!;
  const { session, isAuthLoading, isPasswordRecovery } = auth;

  if (isAuthLoading) {
    return (
      <main style={{ marginTop: '70px', padding: '1rem' }}>
        Checking authentication...
      </main>
    );
  }

  if (session && isPasswordRecovery) {
    return <Navigate to="/update-password" replace />;
  }

  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <>
      <Navbar />
      <main style={{ marginTop: '70px', padding: '1rem' }}>
        <Outlet />
      </main>
    </>
  )
};

export default Layout;
