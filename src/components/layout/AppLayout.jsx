import { Outlet, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import authUtils from "../../utils/authUtils";
import { accState, ItemsCartState } from "../../constant/recoil";
import { useRecoilState } from "recoil";
import Loading from "../common/Loading";
import Header from "./sections/user/Header";
import Footer from "./sections/user/Footer";
import { Container, ThemeProvider } from "react-bootstrap";
import GlobalStyles from "../GlobalStyles/index";

import { socket } from "../../context/socket";

export default function AppLayout() {
  const [, setIsConnected] = useState(socket.connected);
  const [, setAcc] = useRecoilState(accState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    const checkAuth = async () => {
      try {
        const user = await authUtils.isAuthenticated();

        if (user) {
          const data = user.user.user;
          setAcc(data);
          localStorage.setItem("_idUser", data._id);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
        
      }
    };

    checkAuth();

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <GlobalStyles>
        <ThemeProvider
          breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
          minBreakpoint="xxs"
        >
          <Header />
          <Container>
            <Outlet />
          </Container>

          <Footer />
        </ThemeProvider>
      </GlobalStyles>
    </>
  );
}
