'use client'
import {useState, useEffect} from 'react'
import Layout from '@/components/Layout'
import ImageAndText from '@/components/ImageAndText'
import Loading from '@/components/Loading'
import Login from '@/components/Login'


const Page = (props) => {
    const [data, setData] = useState([])
    const [slide, setSlide] = useState(null)
    const [loggedIn, setLoggedin] = useState()
  useEffect(() => {
    setLoggedin(sessionStorage.getItem("session"))
  })
    
    
    const getData = async () => {
        const response = await fetch(`/api/${props.id}`)
        const dbData = await response.json()
        setData(dbData)
        

    }
    useEffect(() => {
        setSlide(props.id)
    })
    useEffect(() => {
        
         getData()
         
       
        
    }, [])

    
    

    const handlePrevious = () => {
        
        setSlide(slide-1)
       
    }

    const handleNext = () => {
        setSlide(slide+1)
    }
    if (loggedIn) {
  return (
    

    data.map((item) => (
      <Layout key={item.id} title={item.name} setNav={props.setNav} logOutButtonDisabled="true">
      
      <ImageAndText key={item.id} id={item.id} text={item.long_desc} image={props.image}>
       
      </ImageAndText>
      <button className="btn" onClick={() => props.goBack(false)}>Go back</button>
      </Layout>
      )))
    } else {
        return <Login/>
    }
    
       
  
}

export default Page