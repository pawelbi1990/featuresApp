import React from "react";

import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { FaSkype } from "react-icons/fa";
import Link from "next/link";

const Header = (props) => {
  const icon = props.icon;
  const screen = props.screen;
  const headerDisabled = props.headerDisabled;
  if (headerDisabled !== 1) {
    return (
      <div className="header">
        {screen > 600 ? (
          <div className="logo">
            <Link href="/features">
              <Image src="/logo3.png" width={300} height={300} style={{backgroundColor: "white"}}></Image>
            </Link>
          </div>
        ) : (
          <div className="logo-small">
            <Image src="/logo3.png" width={80} height={80} style={{backgroundColor: "white"}}></Image>
          </div>
        )}

        <ul className="menu-cta">
          <Link
            href="https://mt.linkedin.com/"
            target="blank"
          >
            <li>
              <FaLinkedin />
            </li>
          </Link>
          <Link
            href=""
            target="blank"
          >
            <li>
              <TbWorldWww />
            </li>
          </Link>
          <Link
            href=""
            target="blank"
          >
            <li>
              <FaSkype />
            </li>
          </Link>
        </ul>
        {/* <h1>
              
              
           
                {props.title}
            </h1> */}
      </div>
    );
  }
};

export default Header;
