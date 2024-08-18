import Content from "./Content";
import Image from "next/image";


const ImageAndText = (props) => {
  return (
    <div className="imageandtext-container">
      <div className="image-container">
        {/* <Image src={props.image} width={500} height={500} alt="" /> */}
      </div>
      <div
        className="text-container "
        dangerouslySetInnerHTML={{ __html: props.text }}
      >
        {/* {props.text} */}
      </div>
    </div>
  );
};

export default ImageAndText;
