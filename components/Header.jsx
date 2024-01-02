import React from 'react'
import Logo from '../public/logo.png'
import Image from 'next/image'
import { FaLinkedin } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { FaSkype } from "react-icons/fa";
import Link from 'next/link';




const Header = (props) => {
  const icon = props.icon
  const screen = props.screen
  return (
    <div className="header">
           {screen > 600?
            <div className="logo">
            
             <Image src="/logo.png" width={300} height={300}></Image>
             
            </div>
            :
            <div className="logo-small">
              <Image src="/sb-logo-small.png" width={80} height={80}></Image>
            </div>}
            
            <ul className="menu-cta">

    
<Link href="https://mt.linkedin.com/company/sb-betting-software"><li><FaLinkedin/></li></Link>
<Link href="https://www.sb-betting.com/pl/dostawca-platform-bukmacherskich-i-gamblingowych/"><li><TbWorldWww/></li></Link>
<Link href="https://join.skype.com/invite/Jrd3rAA4SZgD"><li><FaSkype/></li></Link>
</ul>
            {/* <h1>
              
              
           
                {props.title}
            </h1> */}
            
            
            
        </div>
        
  )
}

export default Header