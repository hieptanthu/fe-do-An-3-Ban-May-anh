import { Outlet, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import authUtils from "../../utils/authUtils";
import { accState } from "../../constant/recoil";
import { useRecoilState } from "recoil";
import Loading from "../common/Loading";
import Header from "./sections/admin/Header";
import Footer from "./sections/admin/Footer";

export default function AppLayout() {
  const navigate = useNavigate();
  const [, setAcc] = useRecoilState(accState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      setAcc(user.user);
      if (user === false) {
        // Use strict equality
        navigate("/login");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, setAcc]); // Include setAcc in the dependency array

  return loading ? (
    <Loading />
  ) : (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
