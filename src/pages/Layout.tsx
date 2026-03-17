import { Navigate, Outlet } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar";

const Layout = () => {
  const auth = UserAuth()!;
  const { session, isAuthLoading } = auth;

  if (isAuthLoading) {
    return (
      <main style={{ marginTop: '70px', padding: '1rem' }}>
        Checking authentication...
      </main>
    );
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
