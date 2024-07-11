import { FaArrowCircleLeft, FaArrowCircleRight, FaSkype } from "react-icons/fa";
import Link from "next/link";

export default function Navbar(props = null) {
  const id = props.id;
  const lastitem = props.lastitem;
  const navbar = props.navbar;
  if (navbar) {
    return (
      <div id="ButtonsContainer">
        <div
          className={id > 0 ? "IconContainer" : "none"}
          onClick={id > 1 ? props.previous : null}
        >
          <FaArrowCircleLeft className="Icon" />
          <p className="IconsText">Previous</p>
        </div>

        <a href="https://join.skype.com/invite/Jrd3rAA4SZgD">
          <div className="IconContainer">
            <FaSkype className="Icon" />
            <p className="IconsText">Contact your PO</p>
          </div>
        </a>

        <div
          className={id < lastitem ? "IconContainer" : "IconContainerDisabled"}
          onClick={id < lastitem ? props.next : null}
        >
          <FaArrowCircleRight className="Icon" />
          <p className="IconsText">Next</p>
        </div>
      </div>
    );
  } else return null;
}
