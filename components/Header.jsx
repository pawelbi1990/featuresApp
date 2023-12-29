import React from 'react'
import Logo from '../public/logo.png'
import Image from 'next/image'




const Header = (props) => {
  const icon = props.icon
  return (
    <div className="header">
            
            <div className="logo">
              
            
            </div>
            
            
             
            <h1>
              
              
           
                {props.title}
            </h1>
            
            
            
        </div>
        
  )
}

export default Header