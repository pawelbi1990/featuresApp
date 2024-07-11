"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaLinkedin } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { FaSkype } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useGlobalState } from "../context/GlobalState"
import {mapping} from "../utils/functions"

const Menuv2 = (props) => {
  const [admin, setAdmin] = useState(0);
  const [user, setUser] = useState()
  const [username, setUsername] = useState()
  const [expires, setExpires] = useState()
  const [expiresm, setExpiresm] = useState()
  const [expiress, setExpiress] = useState()
  const {state, setState} = useGlobalState()
  

  useEffect(() => {
    if (sessionStorage.getItem("superUser") == 1) {
      setAdmin(1);
    } else {
      setAdmin(0);
    }
  }, [sessionStorage.getItem("superUser")]);

  useEffect(() => {
    setUser(sessionStorage.getItem("user"))
    
  },[sessionStorage.getItem("user")])

  useEffect(() => {
    const client = mapping[parseInt(user)]
    setUsername(client)
    console.log(username)
    
  },[user])

  useEffect(() => {
    setExpires(600)
  },[])

  useEffect(() => {
    const countdown = setInterval(() => {
      setExpires((prevCount) => prevCount - 1); // Reduce count by 1 every second
      
    }, 1000); // Repeat every second (1000ms)

    // Clean up the interval on unmount
    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
      let minutes = Math.floor(expires/60)
      let seconds = expires % 60
      setExpiresm(minutes)
      if (expiress<=10 && expiress > 0) {
      setExpiress("0"+seconds)
      }else{
        setExpiress(seconds)
      }
  },[expires])

  useEffect(() => {
    if (expires === 0) {
      handleLogout()
    }
  },[expires])
  const toggleHamburgerMenu = () => {
    setState((prevState) => ({ hamburgerOn: !prevState.hamburgerOn }))
    console.log(state)

  }
  const handleLogout = async () => {
    setState((prevState) => ({...prevState, loggingOut: true}))
    const data = { userId: parseInt(sessionStorage.getItem("user")) };
    await fetch("/api/logout", {
      method: "POST",
      body: JSON.stringify(data),
    });
    setState((prevState) => ({...prevState, loggingOut: false}))

    sessionStorage.clear();
    window.location.replace("/");
  };
  const handleDarkmodeSwitch = () => {
    if (sessionStorage.getItem("mode") === "light") {
      sessionStorage.setItem("mode", "dark");
    } else if (sessionStorage.getItem("mode") === "dark") {
      sessionStorage.setItem("mode", "light");
    }
  };

  const clearCache = () => {
    sessionStorage.removeItem("cachedAllData")
    window.location.reload()
  }

  if (admin == 1) {
    return (
      <div className="nav-container">
        <ul className="navbuttons">
          <button
            className={"btn"}
            onClick={() => window.location.replace("/features")}
          >
            All Features
          </button>
          <button
            className={"btn"}
            onClick={() => window.location.replace("/createFeature")}
          >
            Add Feature
          </button>
          <button
            className={"btn"}
            onClick={() => window.location.replace("/deleteFeature")}
          >
            Delete Feature
          </button>
          <button
            className={"btn"}
            onClick={() => window.location.replace("/manageUsers")}
          >
            Manage users
          </button>
          <button className="btn" onClick={handleLogout}>
            Log Out
          </button>
          <button className="btn" onClick={clearCache}>
          Clear cache
        </button>
          {/* <h1>asd</h1> */}
        </ul>

        {/* <ul className="menu-cta">


<li><FaLinkedin/></li>
<li><TbWorldWww/></li>
<li><FaSkype/></li>
</ul> */}
      </div>
    );
  } else if (admin == 0) {
    return (
      <>
      {state.screenSize >= 800 ?
      <ul className="navbuttons">
        <button
          className={"btn"}
          onClick={() => window.location.replace("/features")}
        >
          All features
        </button>
        <button className="btn" onClick={handleLogout}>
          Log Out
        </button>
        <button className="btn" onClick={clearCache}>
          Clear cache
        </button>
        <p className="session-counter">Welcome {username}, your session expires in {expiresm}:{expiress}.</p>
      </ul>
      : <div>
        
        <p className="session-counter">Welcome {username}, your session expires in {expiresm}:{expiress}.</p>
        <div className="hamburger-wrapper" >
        <RxHamburgerMenu className="hamburger" onClick={() => toggleHamburgerMenu()}/>
         
        </div>
      </div>
      }
       
      
      </>
    );
  }
};

export default Menuv2;
