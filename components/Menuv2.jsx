'use client'
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const Menuv2 = (props) => {
    
    const [admin, setAdmin] = useState(0)
    
    
    useEffect(() => {
      if(sessionStorage.getItem("superUser") == 1) {
      setAdmin(1)
    } else {
      setAdmin(0)
    }
    },[sessionStorage.getItem("superUser")])
    
    const handleLogout = async () => {
      
      
      const data = {userId: parseInt(sessionStorage.getItem("user"))}
      await fetch("/api/logout", {
        method: "POST",
        body: JSON.stringify(data)

      })
      sessionStorage.clear()
      window.location.replace("/")
      
      
      

      
    }
    const handleDarkmodeSwitch = () => {
        if (sessionStorage.getItem("mode") === "light") {
            sessionStorage.setItem("mode", "dark")
        } else if (sessionStorage.getItem("mode") === "dark") {
            sessionStorage.setItem("mode", "light")
        }
    }
 
    
      
  if (admin == 1) { return (
    <ul className="navbuttons">
        <button className={'btn'} onClick={() => window.location.replace("/features")}>All Features</button>
        <button className={'btn'} onClick={() => window.location.replace("/createFeature")}>Add Feature</button>
        <button className={'btn'} onClick={() => window.location.replace("/deleteFeature")}>Delete Feature</button>
        <button className='btn' onClick={handleLogout}>Log Out</button>
    </ul>
  )
} else if (admin == 0) {
    return (
        <ul className="navbuttons">
        <button className={'btn'} onClick={() => window.location.replace("/features")}>All features</button>
        <button className='btn' onClick={handleLogout}>Log Out</button>
        
    </ul>
    )
}
}

export default Menuv2