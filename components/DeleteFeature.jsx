// 'use client'

// import Layout from "@/components/Layout"
// import { useState, useEffect } from 'react'

// import Login from "@/components/Login"
// import DeletePrompt from "@/components/DeletePrompt"
// import Loading from "@/components/Loading"

// const DeleteFeature = (props) => {
//     const [loggedIn, setLoggedin] = useState(false)
//     const [sessionLoaded, setSessionLoaded] = useState(null)
//     useEffect(() => {
//       setLoggedin(sessionStorage.getItem("session"))
//       if (sessionStorage.getItem("session")) {
//           setSessionLoaded(true)
//       }

//     })

//     const [data, setData] = useState([])
//     const [dataToDelete, setDataToDelete] = useState(null)
//     const [prompt, setPrompt] = useState(false)
//     const [currentId, setCurrentId] = useState(null)

//     const deleteItem = async (id) => {
//         const deleteMe = id.toString()

//         await fetch('/api/deleteFeature', {
//             method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(deleteMe),

//         } )
//         setPrompt(false)
//     }

//     const handlePrompt = (id) => {
//       setPrompt(true)
//       setCurrentId(id)
//     }

//     const goBack = () => {
//       setPrompt(false)
//       setCurrentId(null)
//     }

//     const getData = async () => {
//       let data = ({session: sessionStorage.getItem("session") || null,
//                     userId: sessionStorage.getItem("user") || null})
//         const response = await fetch('/api', {
//           method: "POST",
//           body: JSON.stringify(data)
//         })
//         const dbData = await response.json()
//         setData(dbData)

//     }

//     useEffect(() => {

//          getData()

//     }, [data])
//     if (sessionLoaded) {
//     if (adminRights) {
//     if (loggedIn && !prompt) {
//   return (
//     <Layout title="Choose feature to delete" setNav={props.setNav} nav={props.nav}>
//        {
//     <div className="products-item-container">

//         {data.map((item) => (

//         <div key={item.id} className="products-item">
//         <div>{item.id}</div>
//         <div>{item.name}</div>
//         <button onClick={() => handlePrompt(item.id)}>Delete</button></div>

//         )
//         )}
//         </div>
//       }

//     </Layout>
//   )} if (loggedIn && prompt) {
//     return <DeletePrompt id={currentId} deleteItem={deleteItem} goBack={goBack}/>
//   }
//   else {
//   return <Login/>
// }
// } else return <Login/>
// } else return <Loading/>
// }

// export default DeleteFeature
