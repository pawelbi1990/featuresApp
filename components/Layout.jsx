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
    const logOutButtonDisabled = props.logOutButtonDisabled
    const lastitem = props.lastitem
    const navbar = props.navbar
    const [mode, setMode] = useState()
    
   
    
      
    return (
    <>
    <div className="layout">
    
    
    
    <Header title={title} icon={icon} screen={screen}/>
    {!logOutButtonDisabled ? <Menuv2 setNav={props.setNav} nav={props.nav}/> : null}
    
    <Content>
        
        {props.children}
    </Content>
    
    
    </div>
    </>)
  }

    
    
    
  


export default Layout