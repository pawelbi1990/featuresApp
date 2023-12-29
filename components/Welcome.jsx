import Layout from "./Layout"
import { useState, useEffect} from 'react'

const Welcome = (props) => {
  const { setNav } = props

    const [client, setClient] = useState("Guest")
    useEffect(() => {
        switch(Number((sessionStorage.getItem("session")).slice(-1))) {
            case 2: setClient("SbAdmin")
            break
            case 3: setClient("ForBet")
            break
        }
    },[])
  return (
    <Layout title='' setNav={setNav}>
        <h1 className="welcome-text">Hello {client} please use top menu to navigate.</h1>
    </Layout>
  )
}

export default Welcome