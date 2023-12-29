import Layout from "./Layout"

const WrongCredentials = (props) => {
    const {wrongCredentials, setWrongCredentials} = props
    const goBack = () => {
        setWrongCredentials(false)
    }
  return (
    <Layout logOutButtonDisabled="true">
    <div>WrongCredentials</div>
    <button onClick={goBack}>Go back to login screen</button>
    </Layout>
  )
}

export default WrongCredentials