'use client'
import Link from 'next/link'
import {useState, useEffect} from 'react'

const Page = () => {
  const [taskId, setTaskId] = useState()
  const [taskTitle, setTaskTitle] = useState()
  useEffect(()=>{
    setTaskId(sessionStorage.getItem("taskId"))
    setTaskTitle(sessionStorage.getItem("taskTitle"))

  },[])

  const handleGoBack = () => {
    sessionStorage.removeItem("taskId")
    sessionStorage.removeItem("taskTitle")
    window.location.replace('/features')
    
  }
  
  return (
    <div className="wrapper-full-column bg-main">
      <div className="login">
      
    <h2>Congratulations, you have created a task</h2>
    <Link href={`https://sb-betting.easyredmine.com/issues/${taskId}` } target="blank"><h2 className="task-link">#{taskId} {taskTitle}</h2></Link>
    <button className="btn" onClick={() => handleGoBack()}>Go back</button>
    </div>
    
    </div>
  )
}

export default Page