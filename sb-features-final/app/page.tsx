'use client'
import { useState } from 'react'

const page = () => {
  // declaring states
  const [user, setUser] = useState({
    userName: "",
    userSecret: ""
  })

  //declaring functions
  const handleUserNameChange = (e: any) => {
    setUser({ ...user, userName: e.target.value})
  }

  const handleUserSecretChange = (e: any) => {
    setUser({ ...user, userSecret: e.target.value})
  }

  const handleLogin = async () => {
    
    const data = user
    
    const response = await fetch('api/loginApi', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    const responseData = await response.json()
    const session = await responseData.login
    const clientId = await responseData.clientId
    sessionStorage.setItem("session", session)
    sessionStorage.setItem("user", clientId)
    console.log(session)
    
    
  }

  return (
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
  )
}

export default page