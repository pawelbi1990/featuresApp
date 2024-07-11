"use client";

import Navbar from "./Navbar";
import Header from "./Header";
import Content from "./Content";
import Loading from "./Loading";
import Login from "./Login";
import { Suspense, useState, useEffect } from "react";
import UseBiggerScreen from "./UseBiggerScreen";
import { useGlobalState } from "../context/GlobalState";
import Menuv2 from "./Menuv2";

const Layout = (props) => {
  const { state, setState } = useGlobalState();

  const handleLogout = async () => {
    setState((prevState) => ({ ...prevState, loggingOut: true }));
    const data = { userId: parseInt(sessionStorage.getItem("user")) };
    await fetch("/api/logout", {
      method: "POST",
      body: JSON.stringify(data),
    });
    setState((prevState) => ({ ...prevState, loggingOut: false }));

    sessionStorage.clear();
    window.location.replace("/");
  };

  const clearCache = () => {
    sessionStorage.removeItem("cachedAllData");
    window.location.reload();
  };

  const screen = props.screen;
  const title = props.title;
  const next = props.next;
  const previous = props.previous;
  const icon = props.icon;
  const headerDisabled = props.headerDisabled;
  const logOutButtonDisabled = props.logOutButtonDisabled;
  const lastitem = props.lastitem;
  const navbar = props.navbar;
  const [mode, setMode] = useState();

  useEffect(() => {
    setState((prevState) => ({ ...prevState, screenSize: window.innerWidth }));
  }, [window.innerWidth]);

  return (
    <>
      <div className="layout">
        <div
          className={
            headerDisabled != 1
              ? "headerMenuContainer"
              : "headerMenuContainer disabled"
          }
        >
          <Header
            title={title}
            icon={icon}
            screen={screen}
            headerDisabled={headerDisabled}
          />

          {!logOutButtonDisabled ? (
            <Menuv2 setNav={props.setNav} nav={props.nav} />
          ) : null}
        </div>

        <div className="content">
          {props.children}
          <div
            className="topup-menu"
            style={
              state.hamburgerOn ? { display: "flex" } : { display: "none" }
            }
          >
            <button className="btn" onClick={() => handleLogout()}>
              Log Out
            </button>
            <button className="btn" onClick={() => clearCache()}>
              Clear Cache
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
