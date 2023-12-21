'use client'
import {useState, useEffect} from 'react'
import Image from "next/image"
import img from '../public/image.png'
import Loading from './Loading'
import Login from './Login'
import Menuv2 from './Menuv2'

const Newfeature = (props) => {
    const { nav, setNav } = props
    
    const [loggedIn, setLoggedin] = useState(false)
  useEffect(() => {
    setLoggedin(sessionStorage.getItem("session"))
    if (sessionStorage.getItem("session")) {
        setSessionLoaded(true)
    }
    if (sessionStorage.getItem("superUser")) {
        setAdminRights(true)
    }
  })
    
    
    const [name, setName] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [longDesc, setLongDesc] = useState('');
    const [image, setImage] = useState()
    const [imagePreviewURL, setImagePreviewURL] = useState(null); // State for the image preview URL
    const [page, setPage] = useState(1)
    const [team, setTeam] = useState(null)
    const [client, setClient] = useState(null)
    const [sessionLoaded, setSessionLoaded] = useState(null)
    const [adminRights, setAdminRights] = useState(false)


    useEffect(() => {
        if (image) {
            setImagePreviewURL(URL.createObjectURL(image)); // Set the image preview URL

    }   
    }, [image])
    
    

    

    
    
    const nextPage = () => {
        setPage(2)   

    }

    const prevPage = () => {
        setPage(1)
    }
        
    

    const handleData = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('long_desc', longDesc);
        formData.append('image', image);
        formData.append('short_desc', shortDesc)
        formData.append('client', client)
        formData.append('assignee', team)
        
        
    
        try {
            const response = await fetch('/api/addFeature', {
                method: 'POST',
                body: formData,
                
            });
    
            if (response.ok) {
                console.log('Data submitted successfully.');
                console.log(response.body)
                window.location.replace('/products')
            } else {
                console.error('Failed to submit data:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    useEffect(() => {
        console.log(team)
        

    }, [team])

    useEffect(() => {
        console.log(client)
        

    }, [client])

    if (sessionLoaded) {
    if (adminRights) {
    if (page === 1) {
  return (
    <>
    <div className="layout">
        <div className="header">      
            <div className="logo"/> 
            <input type="text" placeholder="title" name="\" id="" className="preview-header-title" onChange={(e) => setName(e.target.value)} required/>      
        </div>
    <Menuv2 setNav={setNav} nav={nav}/>
    <div className="content">
        <div className="image-container-preview" style={{ backgroundImage: `url(${imagePreviewURL})` }}><input type="file" name="" id="" onChange={(e) => setImage(e.target.files[0])} /></div>
        <div className='text-container-preview'>
        <textarea rows="18" name="" id="" placeholder="description" className='text-container-preview-input' onChange={(e) => setLongDesc(e.target.value)} required />
        </div>
       
    </div>
     <button className="btn" onClick={nextPage}>Continue</button>
    
    
    </div>
    </>
    
  )
} if (page === 2) {
    return (
    <>
    <div className="layout">
    <div className="header">      
            <div className="logo"/> 
                  
        </div>
    <div className="content">
        <div>
        <legend>Select team</legend>        
            <button onClick={(e) => setTeam(6)}style={
                team === 6 ? {
                backgroundColor: "green",
            } : {
                backgroundColor: "white"
            } 
            }>Alpha</button>
            
        

    
        <button onClick={(e) => setTeam(13)} style={
                team === 13 ? {
                backgroundColor: "green",
            } : {
                backgroundColor: "white"
            } 
            }>Omega</button>
        
    

    
    </div>
        <div>
        <legend>Select client</legend>        
            <button onClick={(e) => setClient(3)} style={
                client === 3 ? {
                backgroundColor: "green",
            } : {
                backgroundColor: "white"
            } 
            }>ForBet</button>       
            <button onClick={(e) => setClient(5)}style={
                client === 5 ? {
                backgroundColor: "green",
            } : {
                backgroundColor: "white"
            } 
            }>CrocoBet</button>
            <button onClick={(e) => setClient(6)}style={
                client === 6 ? {
                backgroundColor: "green",
            } : {
                backgroundColor: "white"
            } 
            }>EuropeBet</button>      
        </div>

    
    
        <div className='text-container-preview'>
        <textarea rows="18" name="" id="" placeholder="easy redmine task desciption" className='text-container-preview-input' onChange={(e) => setShortDesc(e.target.value)} required />
        </div>
       
    </div>
    <button className="btn" onClick={prevPage}>Go back</button>
    <button className="btn" onClick={handleData}>Submit task</button>
    </div>
    </>
    )
}
} else return <Login/>
} else return <Loading/>
}

export default Newfeature