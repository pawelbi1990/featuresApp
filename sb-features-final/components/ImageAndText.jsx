import Content from "./Content"
import Image from "next/image"
import img from '../public/image.png'

const ImageAndText = (props) => {
  return (
    <div className="imageandtext-container">
        <div className="image-container"><Image src={props.image} width={500} height={500} alt="SB Betting"/></div>
        <div className="text-container">
            
            
                {props.text}
               
        </div>
    </div>
  )
}

export default ImageAndText