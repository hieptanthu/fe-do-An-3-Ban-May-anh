import React, { useState } from "react";
import authApi from "../api/authApi";
import Btn from "../components/common/btn"
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginCheck(e) {
    e.preventDefault();
    const data = await authApi.Login({  email, password });
    if(data.success){

      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
        localStorage.setItem('token', data.token);
        navigate("/");
    }else{
      toast.error(data.message, {
        position:"top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
  }

  async function signupCheck(e) {
    e.preventDefault();
    const data = await authApi.Signup({ firstName, lastName, email, password });
    console.log(data)
    if(data.success){

      toast.success(data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
        localStorage.setItem('token', data.token);
        navigate("/");
    }else{
      toast.error(data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
   

  }

  return (
    <>
    <ToastContainer/>
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="login">
        <form className="form" onSubmit={loginCheck}>
          <label htmlFor="chk" aria-hidden="true">
            Log in
          </label>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            name="pswd"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
            <Btn text="Login" type="BtnPrimary" />
        </form>
      </div>

      <div className="register">
        <form className="form" onSubmit={signupCheck}>
          <label htmlFor="chk" aria-hidden="true">
            Register
          </label>
          <input
            className="input"
            type="text"
            name="txt"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            name="txt"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            name="pswd"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
             <Btn text="Register" type="BtnPrimary" />
        </form>
      </div>
    </div>
    </>
    
  );
}

export default Login;
