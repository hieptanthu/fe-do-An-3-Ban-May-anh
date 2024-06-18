import { Outlet, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import authUtils from "../../utils/authUtils";
import { accState } from "../../constant/recoil";
import { useRecoilState } from "recoil";
import Loading from "../common/Loading";
import Header from "./sections/admin/Header";
import Sidebar from "./sections/admin/Sidebar";
import classNames from "classnames/bind"
import style from './sections/admin/asset/style.scss'
import { ToastContainer } from "react-toastify";
const cx = classNames.bind(style)
export default function AppLayout() {
  const navigate = useNavigate();
  const [acc, setAcc] = useRecoilState(accState);
  const [loading, setLoading] = useState(true);

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try{
        const user = await authUtils.isAuthenticatedAdmin();
      console.log("useradmin",user)
      setAcc(user.user);
      if (user === false) {
        // Use strict equality
        navigate("/login");
      } else {
        setLoading(false);
      }

      }catch{
        navigate("/login");
      }
      
    };

    checkAuth();
  }, [navigate, setAcc]); // Include setAcc in the dependency array

  return loading ? (
    <Loading />
  ) : (
    <>  
      <ToastContainer/>
        <div className={cx("grid-container")}>
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
          />
          <Outlet />
        </div>
    </>
  );
}
