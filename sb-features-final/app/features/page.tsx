"use client"
import { redirect } from 'next/dist/server/api-utils'
import {useEffect, useState} from 'react'

interface UserData {
    session: any,
    userId: any,
}

const page = () => {
    const [data, setData] = useState<UserData>({session: sessionStorage.getItem("session"),
                                                userId: sessionStorage.getItem("user")})
    useEffect(() => {
        checkSession(data)
    },[])
    
    const checkSession = async (data: UserData) => {
        
        
        console.log(data)
        
       
            const response = await fetch('api/sessionCheck', {
                method: 'POST',
                body: JSON.stringify(data),
              })
            
              
        
        
        
        
       
       
        
        
      }
    
  return (
    <div>Features</div>
  )
}

export default page