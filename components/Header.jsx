import React from 'react'
import Logo from '../public/logo.png'
import Image from 'next/image'




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
            
             
            <h1>
              
              
           
                {props.title}
            </h1>
            
            
            
        </div>
        
  )
}

export default Header