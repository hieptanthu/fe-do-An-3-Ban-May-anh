import { Outlet, useNavigate} from "react-router-dom";
import React, { useState, useEffect } from "react";
import authUtils from "../../utils/authUtils";
import Loading from "../common/Loading";

export default function AuthLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await authUtils.isAuthenticated();
      if (auth === false) {
        setLoading(false);
      } else {
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate]);
  return (
    
      loading ? <Loading /> : <div className="mainLogin" ><Outlet /></div>
  );
}
