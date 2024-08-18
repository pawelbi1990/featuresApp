"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";

const Page = () => {
  // declaring states
  const [user, setUser] = useState({
    userName: "",
    userSecret: "",
  });

  const [wrongCred, setWrongCred] = useState(false);
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(); //state used to manage screen width, undefined by default

  const handleResize = () => {
    //func used for screen width state management on resizes
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    //updating width state on resizes
    window.addEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    //updating itemperpage state on rerenders, dependind on user's device
    setWidth(window.innerWidth);
  }, []);

  //declaring functions
  const handleUserNameChange = (e) => {
    setUser({ ...user, userName: e.target.value });
  };

  const handleUserSecretChange = (e) => {
    setUser({ ...user, userSecret: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    const data = user;
    try {
      const response = await fetch("api/loginApi", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const responseData = await response.json();
        const session = await responseData.login;
        const clientId = await responseData.clientId;
        const admin = await responseData.admin;
        sessionStorage.setItem("session", session);
        sessionStorage.setItem("user", clientId);
        sessionStorage.setItem("superUser", admin);
        window.location.replace("/features");
        // setLoading(false);
      } else {
        const responseData = await response.json();
        if (response.status === 401) {
          console.log(responseData.message);
          setWrongCred(true);
          setLoading(false);
        } else if (response.status === 404) {
          console.log(responseData.message);
          setWrongCred(true);
          setLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGuest = async () => {
    setLoading(true);
    const data = {
      userName: "testclient",
      userSecret: "testclient",
    };
    try {
      const response = await fetch("api/loginApi", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const responseData = await response.json();
        const session = await responseData.login;
        const clientId = await responseData.clientId;
        const admin = await responseData.admin;
        sessionStorage.setItem("session", session);
        sessionStorage.setItem("user", clientId);
        sessionStorage.setItem("superUser", admin);
        window.location.replace("/features");
        // setLoading(false);
      } else {
        const responseData = await response.json();
        if (response.status === 401) {
          console.log(responseData.message);
          setWrongCred(true);
          setLoading(false);
        } else if (response.status === 404) {
          console.log(responseData.message);
          setWrongCred(true);
          setLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (loading) {
    return <Loading text="Loading" />;
  } else if (!loading && wrongCred) {
    return (
      <div className="wrapper">
        <div>Wrong Credentials</div>
        <button onClick={() => setWrongCred(false)}>Try again</button>
      </div>
    );
  } else if (!loading && !wrongCred) {
    return (
      <div className="layout">
        <div className="wrapper">
          <div className="login">
            <Image
              className="loginImage"
              src="/logo3.png"
              width={200}
              height={200}
            />
            <h1>Login</h1>
            <input
              className="input"
              type="text"
              placeholder="Username"
              value={user.userName}
              onChange={handleUserNameChange}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={user.userSecret}
              onChange={handleUserSecretChange}
            />
            <button className="btn" onClick={() => handleLogin()}>
              Login
            </button>
            <button className="btn" onClick={() => handleGuest()}>
              Or enter as a TestClient
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Page;
