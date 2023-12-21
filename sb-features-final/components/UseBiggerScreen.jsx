

const UseBiggerScreen = () => {
  return (
    <div className="layout" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }}>
        <div className="text-container" style={{
            width:"fit-content",
            height:"fit-content",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem"
        }}>
            <div style={{
                color: "aliceblue",
            }}>
            Please use device with 1366 pixel or wider screen.
            </div>
        </div>
    </div>
  )
}

export default UseBiggerScreen