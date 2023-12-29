'use client'


import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Menu from '@/components/Menu'
import { useRouter } from 'next/navigation';
import Loading from './Loading';
import Welcome from './Welcome';



import page from '../app/page'
import AllFeatures from './AllFeatures';
import WrongCredentials from './WrongCredentials';


export default function Login(props) {

  
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sessionLoaded, setSessionLoaded] = useState(null)
  const { setNav, nav } = props
  const [verifying, setVerifying] = useState(false)
  const [wrongCredentials, setWrongCredentials] = useState(false)

  // useEffect(() => {
  //   window.addEventListener("keypress", (e) => {
  //     if (e.key === "Enter" && username !== '' && password !== '') {
  //       handleLogin(username, password)

  //     ;
  //     return () => {
  //       window.removeEventListener("keypress")
  //     }
  //   }



  //   })

  // }
    

  

  
  
 
  const registerRedirect = () => {
    window.location.replace("/register")
  }
  const handleLogin = async (user, pass) => {
    sessionStorage.clear()
    setVerifying(true)
    const data = {
        "username": user,
        "password": pass
    }
    try {
      

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        const sessionId = responseData.session.toString() + responseData.clientId.toString()
        setVerifying(false)
        sessionStorage.setItem("session", sessionId)
        sessionStorage.setItem("mode", "dark")
        setNav("allfeatures")
        
      
        if (responseData.admin === true) {
          sessionStorage.setItem("superUser", responseData.admin)
        }
        
        
        
        
      } if (sessionStorage.getItem('session')) {
          setSessionLoaded(true)
          // window.location.replace('/products')
      } else {
        setVerifying(false)
        setWrongCredentials(true)
      }
      
      
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  if (sessionLoaded === null) {
    if (!verifying) {
      if (!wrongCredentials) {
  return (
    
    <Layout logOutButtonDisabled="true" setNav={setNav} nav={nav}>
    <div className="login">
      <h1>Login</h1>
      <input className="input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      
      <button className="btn" onClick={() => handleLogin(username, password)}>Login</button>
      <button className="btn" onClick={registerRedirect}>Register</button>
    </div>
    </Layout>
  )} else return <WrongCredentials wrongCredentials={wrongCredentials} setWrongCredentials={setWrongCredentials}/>
} else return <Loading/>
} if (sessionLoaded === false) {
    return <Loading/>
  }  if (sessionLoaded === true) {
    return <AllFeatures setNav={setNav} nav={nav}/>
  }

}

export { Login }