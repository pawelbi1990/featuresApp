'use client'
import {useState, useEffect, Suspense} from 'react'
import Layout from '@/components/Layout'
import ImageAndText from '@/components/ImageAndText'
import Loading from '@/components/Loading'
import Link from 'next/link'
import Login from '@/components/Login'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import DetailedFeature from '@/components/DetailedFeature'

import Image from 'next/image'


const AllFeatures = (props) => {
    const [loggedIn, setLoggedin] = useState(null); 
    const [itemsPerPage, setItemPerPage] = useState(); //this variable determines number of slides shown on single page, undefined, by default, updates on screen resizes and first render, depending on width state
    const [index, setIndex] = useState(0); //index of first shown slide, 0 by default
    const [width, setWidth] = useState(); //state used to manage screen width, undefined by default
    const [sessionLoaded, setSessionLoaded] = useState(null)
    const [focus, setFocus] = useState(index+1)
    const [details, setDetails] = useState(false)
    const [id, setId] = useState(null)
    const [imagePath, setImagePath] = useState(null)
    const [guest, setGuest] = useState(null)
    const [processing, setProcessing] = useState(false)
    
    const text = "Create task"
    const blocked =[]
    const [blockedTask, setBlockedTask] = useState({
      blockedId: [],
      blockedTaskId: []
    })
  
    
    
    
    
    const handleResize = () => {
      //func used for screen width state management on resizes
      setWidth(window.innerWidth)
      if (width >= 1500) {
        setItemPerPage(3)
      } if (width <1500 && width >= 1000) {
        setItemPerPage(2)
      } if (width <1000 ) {
        setItemPerPage(1)
      }
      console.log(width)
    }

    useEffect(() => {
      //updating width state on resizes      
      window.addEventListener('resize', handleResize)     

    }, [width])

    useEffect(() => {
      //updating itemperpage state on rerenders, dependind on user's device
      setWidth(window.innerWidth)
      if (window.innerWidth >= 1500) {
        setItemPerPage(3)
      } if (window.innerWidth <1500 && window.innerWidth >= 1000) {
        setItemPerPage(2)
      } if (window.innerWidth <1000 ) {
        setItemPerPage(1)
      }
    })

    

    const nextItems = () => {
      //function responsible for navigation between slide groups shown on page, attached to `next` arrow
      if (index + itemsPerPage < filteredData.length) {
        setIndex(index+1)
        setFocus(index+2)
        
      
    }
  }

    const prevItems = () => {
      //function responsible for navigation between slide groups shown on page, attached to `prev` arrow
      if (index > 0) {
        setIndex(index-1)
        setFocus(index-2)
      
      }
    }

  useEffect(() => {
    getData()
  }, [])
    
  useEffect(() => {
    //gets user session from localstorage on renders
    setLoggedin(sessionStorage.getItem("session"))
    if (sessionStorage.getItem("session")) {
      //gets last item from session to determine which client is loggedIn
      
      setSessionLoaded(true)
      
    }
    // switch (clientId) {
      //sets current data depending on which client is loggedIn
      //2 - superuser - all data shown
      //3 - forbet - project id 119
      //
    //   case 3:
    //     setCurrentData(forbetData)
    //     setCurrentProject(119)
    //     setButtonActive(true)
    //     break
    //   case 2:
    //     setCurrentData(allData)
    //      break
    //   case 5:
    //     setCurrentData(crocoData)
    //     setCurrentProject(121)
    //     setButtonActive(true)
    //     break
    //   case 6:
    //     setCurrentData(ebData)
    //     setCurrentProject(106)
    //     setButtonActive(true)
    //     break
    //   default:
    //     setCurrentData(publicData)
    //     break
    // }
    
  })

    
    
    const [data, setData] = useState([])
    const [allData, setAllData] = useState([])
    const [forbetData, setForbetData] = useState([])
    const [crocoData, setCrocoData] = useState([])
    const [ebData, setEbData] = useState([])
    const [publicData, setPublicData] = useState([])
    const [search, setSearch] = useState('')
    const [clientId, setClientId] = useState(0)
    const [currentData, setCurrentData] = useState(publicData)
    const [currentProject, setCurrentProject] = useState(null)
    const [buttonActive, setButtonActive] = useState(false)
    let featuresInPosession = [{
      featureId: null,
      taskId: null,
    }]
    const [featureItem, setFeatureItem] = useState({
      blocked: [],
    })
   
    
    
    
    const getData = async () => {
        //fetching data from api and saving it do dbData state
        let data = ({session: sessionStorage.getItem("session") || null,
                    userId: sessionStorage.getItem("user") || null})
        
        const response = await fetch('/api', {
          method: "POST",
          body: JSON.stringify(data),
        })
        // alert(response.status)
        if (response.ok) {
        const dbData = await response.json()
        
        // const forbetTemp = await dbData.filter(item => item.client === 3)
        // const crocoTemp = await dbData.filter(item => item.client === 5)
        // const ebTemp = await dbData.filter(item => item.client === 6)
        // const publicTemp = await dbData.filter(item => item.client === 0)
        
        // setCrocoData(crocoTemp)
        // setEbData(ebTemp)
        // setForbetData(forbetTemp)
        // setPublicData(publicTemp)
        // setAllData(dbData)
        setData(dbData)
        if ((dbData[0].client !== 119) && (dbData[0].client !== 106) && (dbData[0].client !== 121)) {
          setGuest(true)
        }
        } else {
          
          window.location.replace("/401")
        }
        
        
        

    }

    const handleDetailsClick = (id, image) => {
        setDetails(true)
        setId(id)
        setImagePath(image)

    }

    const goBack = (state) => {
        setDetails(state)
    }

    const handleLogout = async () => {
      const data = {userId: parseInt(sessionStorage.getItem("user"))}
      await fetch("/api/logout", {
        method: "POST",
        body: JSON.stringify(data)

      })
      sessionStorage.clear()
      window.location.replace("/")
      

      
    }

   
    
    

    
    
    const createTask = async (taskName, desc, assigned, userId) => {
      setProcessing(true)
      const requestData = {
        taskName: taskName,
        desc: desc,
        assigned: assigned,
        userId, userId
      }
      const response = await fetch("/api/createTask", {
        method: "POST",
        body: JSON.stringify(requestData)
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log("task created")
        setProcessing(false)
        window.location.replace("/taskCreated")
        sessionStorage.setItem("taskId", responseData.taskId)
        sessionStorage.setItem("taskTitle", responseData.taskTitle)
      } else {
        console.log("error creating task")
        setProcessing(false)
        window.location.replace("/taskCreationFailed")
      }
      }

      
    
    
    // useEffect(() => {
      
        
    //      getData()
         
       
        
    // }, [])

    let lastitem = data.length

    
    
    const filteredData = data.filter(item => item.name.toLowerCase().includes(search)) //filtering data depending on search state that's beeing updated by search bar
    
    if (sessionLoaded) {
    if (loggedIn && !processing) {

      //checking if user is loggedin (session stored in localStorage), if not - returns login screen
      
      if (!details) {
  return (
     //checking if data exists

    <Layout lastitem={lastitem} title='' navbar="" setNav={props.setNav} nav={props.nav} screen={width}>
        <div>
            <div className="search-container">
                <label>
                    
            <       input type="text" className="searchbar" placeholder='Search' onChange={(event) => {setSearch(event.target.value.toLowerCase())}}/>
                </label>
            </div>
    
    <div className="products-item-container">
    
    {filteredData.slice(index, index+itemsPerPage).map((item, subIndex) => (
        //slicing data to show only wanted number of items
        data.length >= 1? (
        <div className={subIndex % 2 !== 0 ? "products-item focused" : "products-item"} key={subIndex}>
        
        <Image onClick={() => handleDetailsClick(item.id, item.image_path)} src={item.image_path} width={500} height={500} alt={item.name} className="products-image" key={item.id} placeholder="empty" blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=='/>
        
        <div className="products-image-separator" ></div>
        <p>{item.name}</p>
        <div className="products-item-buttons">
        {!guest? (
          <button className='btn' onClick={() => createTask(item.name, item.long_desc, item.assigned, sessionStorage.getItem("user"))}>
            Create task
            
          </button> 
          
          ) : (
       
           <button className='btn' onClick={handleLogout}>Login as client to create task</button>)}
              

        <button className="btn" onClick={() => handleDetailsClick(item.id, item.image_path)}>Details</button>
        
        
        </div>
        </div>
        ): <Loading key={index}/>
        ))}
        <button className="swiper-nav-button-prev" onClick={prevItems}><BsFillArrowLeftCircleFill/></button>
        <button className="swiper-nav-button-next" onClick={nextItems}><BsFillArrowRightCircleFill/></button>
        
        </div>
        
        </div>
        </Layout>
    
       
  )} if (details) {
    return <DetailedFeature id={id} goBack={goBack} image={imagePath} />
  }
  else {
    return <Login nav={props.nav} setNav={props.setNav}/>
  }
} else { return <Loading/>}

}
}


export default AllFeatures