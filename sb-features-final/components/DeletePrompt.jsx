import Layout from "./Layout"

const DeletePrompt = (props) => {
  return (
    <Layout>
        <h1>Are you sure you want to feature {props.id}</h1>
        <button onClick={() => props.deleteItem(props.id)}>Yes</button>
        <button onClick={props.goBack}>No</button>
    </Layout>
  )
}

export default DeletePrompt