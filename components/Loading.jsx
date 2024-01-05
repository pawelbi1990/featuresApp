import Layout from "./Layout"

const Loading = () => {
  return (
    <Layout logOutButtonDisabled="true"><div className="loading-wrapper"><div className="loading">Loading...</div></div></Layout>
  )
}

export default Loading