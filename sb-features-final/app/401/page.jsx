'use client'

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
    <div>Session invalid</div>
    <button onClick={handleTryAgain}>Log in again</button>
    </>
  )
}

export default page