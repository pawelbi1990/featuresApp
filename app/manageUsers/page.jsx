'use client'
import { useState, useEffect } from "react"

const page = () => {
    const [data, setData] = useState([])
    const [modal, setModal] = useState({
        toggled: false,
        id: null,
        username: null,
    })
    useEffect(() => {
        getUsers()
        
    },[])
    const getUsers = async () => {
        const response = await fetch("api/getUsers", {
            method: "GET",

        })
        if (response) {
            const responseData = await response.json();
            const userData = await responseData.users
            setData(userData)
            console.log(userData)
            
           
            
        }

    }

    const passwordChangeModalToggle = (id, username) => {
        setModal(prevModal =>({
            ...prevModal,
            toggled: !prevModal.toggled,
            id: id,
            username: username

        }))
        console.log(modal.toggled)
    }

   
    
    

    if (data.length > 0 && !modal.toggled) {
  return (
    <div>
        <div>

        </div>
        {data.map((item) => (
            <div key={item.id}>
                <h1 className="h1black">{item.username}</h1>
                <button onClick={() => passwordChangeModalToggle(item.id, item.username)}>Change password</button>
            </div>
        ))}
          {/* <button onClick={getUsers}>Get users</button> */}
    
    </div>

  )
} else if (data.length && modal.toggled) {
    return (
        <div>
            <div>{modal.id}</div>
            <div>{modal.username}</div>
            <div>New password</div>
            <input type="text" />
            <div>Confirm new password</div>
            <input type="text" />
            <div>
            <button>Change password</button>
            </div>
            <div>
                <button onClick={() => passwordChangeModalToggle(null, null)}>Back</button>
            </div>
        </div>
    )
} else {
    return (
        <div>Loading</div>
    )
}
}

export default page