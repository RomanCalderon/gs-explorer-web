import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar";

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
      <Navbar />
      <main style={{ marginTop: '70px', padding: '1rem' }}>
        <Outlet />
      </main>
    </>
  )
};

export default Layout;
