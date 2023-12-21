import React from 'react'
import Logo from '../public/logo.png'
import Image from 'next/image'
import {HiServer} from 'react-icons/hi'
import {FaSearchPlus} from 'react-icons/fa'
import {SiPwa} from 'react-icons/si'
import {PiStack} from 'react-icons/pi'
import {GiFingerPrint} from 'react-icons/gi'
import {BsLightbulb} from 'react-icons/bs'


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