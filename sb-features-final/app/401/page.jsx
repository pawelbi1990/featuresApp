'use client'
import Layout from "@/components/Layout"

const page = () => {
    const handleTryAgain = async () => {
        const data = {userId: parseInt(sessionStorage.getItem("user"))}
        await fetch("/api/logout", {
          method: "POST",
          body: JSON.stringify(data)
  
        })
        sessionStorage.clear()
        window.location.replace("/")
    }
  return (
    <>
    <div className="wrapper-full-column bg-main">
      
    <h2>You are not authorized to view this page</h2>
    <button className="btn" onClick={handleTryAgain}>Log in again</button>
    <button className="btn" onClick={() => window.location.replace('/features')}>Or go back to homepage</button>
    
    </div>
    </>
  )
}

export default page