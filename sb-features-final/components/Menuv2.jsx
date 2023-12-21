'use client'
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const Menuv2 = (props) => {
    
    const [admin, setAdmin] = useState(sessionStorage.getItem("superUser"))
    const { nav, setNav } = props
    
    
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
 
    const handleNav = (where) => {
      setNav(where)
    }
      
  if (admin == true) { return (
    <ul className="navbuttons">
        <button className={nav ==="allfeatures" ? 'btn active' : 'btn'} onClick={() => handleNav("allfeatures")}>All Features</button>
        <button className={nav ==="newfeature" ? 'btn active' : 'btn'} onClick={() => handleNav("newfeature")}>Add Feature</button>
        <button className={nav ==="deletefeature" ? 'btn active' : 'btn'} onClick={() => handleNav("deletefeature")}>Delete Feature</button>
        <button className='btn' onClick={handleDarkmodeSwitch}>Switch color mode</button>
        <button className='btn' onClick={handleLogout}>Log Out</button>
    </ul>
  )
} else  {
    return (
        <ul className="navbuttons">
        <button className={nav ==="allfeatures" ? 'btn active' : 'btn'} onClick={() => handleNav("allfeatures")}>All features</button>
        <button className='btn' onClick={handleLogout}>Log Out</button>
        <button>{admin}</button>
    </ul>
    )
}
}

export default Menuv2