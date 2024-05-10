'use client'

import Navbar from "./Navbar"
import Header from "./Header"
import Content from "./Content"
import Loading from "./Loading"
import Login from "./Login"
import { Suspense, useState, useEffect } from "react"
import UseBiggerScreen from "./UseBiggerScreen"
import Menuv2 from './Menuv2'



const Layout = (props) => {









    const screen = props.screen
    const title = props.title
    const next = props.next
    const previous = props.previous
    const icon= props.icon
    const headerDisabled = props.headerDisabled
    const logOutButtonDisabled = props.logOutButtonDisabled
    const lastitem = props.lastitem
    const navbar = props.navbar
    const [mode, setMode] = useState()




    return (
    <>
    <div className="layout">


    <div className={headerDisabled != 1 ? "headerMenuContainer" : "headerMenuContainer disabled"}>

    <Header title={title} icon={icon} screen={screen} headerDisabled={headerDisabled}/>

    {!logOutButtonDisabled ? <Menuv2 setNav={props.setNav} nav={props.nav}/> : null}
    </div>


    <div className="content">
                            {props.children}
        </div>
    </div>


    </>)
  }







export default Layout