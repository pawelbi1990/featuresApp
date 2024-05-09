"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ImageAndText from "@/components/ImageAndText";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import Menuv2 from "./Menuv2";
import Image from "next/image";

const Page = (props) => {
  // const guest = props.guest;
  const screen = props.screen;
  const clientId = props.clientId
  const [data, setData] = useState([]);
  const [slide, setSlide] = useState(null);
  const [loggedIn, setLoggedin] = useState();
  useEffect(() => {
    setLoggedin(sessionStorage.getItem("session"));
  });

  const getData = async () => {
    const formData = new FormData();
    formData.append("clientId", clientId);
    const response = await fetch(`/api/${props.id}`, {
      method: "POST",
      body: formData,
    });
    const dbData = await response.json();
    setData(dbData);
  };
  useEffect(() => {
    setSlide(props.id);
  });
  useEffect(() => {
    getData();
  }, []);

  const handlePrevious = () => {
    setSlide(slide - 1);
  };

  const handleNext = () => {
    setSlide(slide + 1);
  };
  if (data.length > 0) {
    return  (
      <Layout
        screen={screen}
        key={props.id}
        title={props.name}
        setNav={props.setNav}
      >
        {/* <Menuv2/> */}

        <div className="imageandtext-container">
          <div className="image-container"><Image src={props.image} width={400} height={400}/></div>
          <div className="text-container">
          {props.long_desc}
          </div>
          </div>




        <div className="products-item-buttons margin-left-16">
          <button className="btn" onClick={() => props.goBack(false)}>
            Go back
          </button>
          {clientId != 2 ? (
            <button
              className="btn"
              onClick={() =>
                props.createTask(
                  item.name,
                  item.short_desc,
                  item.assigned,
                  sessionStorage.getItem("user")
                )
              }
            >
              Create task
            </button>
          ) : (
            <button className="btn" onClick={props.handleLogout}>
              Login as a client to create the task
            </button>
          )}
        </div>
      </Layout>
    );
  } else {
    return <Loading />;
  }
};

export default Page;
