'use client'
import { useState } from 'react'
import Layout from '@/components/Layout'

const page = () => {
  // declaring states
  const [user, setUser] = useState({
    userName: "",
    userSecret: ""
  })
  const [wrongCred, setWrongCred] = useState(false)
  

  //declaring functions
  const handleUserNameChange = (e: any) => {
    setUser({ ...user, userName: e.target.value})
  }

  const handleUserSecretChange = (e: any) => {
    setUser({ ...user, userSecret: e.target.value})
  }

  const handleLogin = async () => {
    
    const data = user
    try {
    const response = await fetch('api/loginApi', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    
      if (response.status === 200) {
        const responseData = await response.json()
        const session = await responseData.login
        const clientId = await responseData.clientId
        const admin = await responseData.admin
        sessionStorage.setItem("session", session)
        sessionStorage.setItem("user", clientId)
        sessionStorage.setItem("superUser", admin)   
        window.location.replace("/features")
      } else {
        const responseData = await response.json()
        if (response.status === 401) {
          console.log(responseData.message)
          setWrongCred(true)
        } else if (response.status === 404) {
          console.log(responseData.message)
          setWrongCred(true)
        } 
      }
      
    } 
    
  catch (err) {
    console.log(err)

  }
    
    
  }

  return (
    wrongCred ? (<Layout logOutButtonDisabled="true">
      <div className="wrapper">
      <div>Wrong Credentials</div>
      <button onClick={() => setWrongCred(false)}>Try again</button>
      </div>
    </Layout>) : (
    <Layout logOutButtonDisabled="true">
      <div className='wrapper'>
    <div className="login">
      <h1>Login</h1>
      <input className="input"
        type="text"
        placeholder="Username"
        value={user.userName}
        onChange={handleUserNameChange}
      />
      <input className="input"
        type="password"
        placeholder="Password"
        value={user.userSecret}
        onChange={handleUserSecretChange}
      />
      <button className="btn" onClick={() => handleLogin()}>Login</button>
      
      </div>
      </div>
      </Layout>)
  )
}

export default page