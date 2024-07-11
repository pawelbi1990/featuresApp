"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ImageAndText from "@/components/ImageAndText";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import Menuv2 from "./Menuv2";
import Image from "next/image";
import {createTask} from "../utils/functions"

const Page = (props) => {
  // const guest = props.guest;
  const screen = props.screen;
  const clientId = props.clientId
  const [processing, setProcessing] = useState(false)
  const [data, setData] = useState([]);
  const [slide, setSlide] = useState(null);
  const [loggedIn, setLoggedin] = useState();
  useEffect(() => {
    setLoggedin(sessionStorage.getItem("session"));
  });

  const processTaskCreation = async (taskName, desc, assigned, userId, id) => {
    setProcessing(true)
    await createTask(taskName, desc, assigned, userId, id)
    setProcessing(false)

  }
  const getData = async () => {
    const formData = new FormData();
    formData.append("clientId", clientId);
    const response = await fetch(`/api/${props.id}`, {
      method: "POST",
      body: formData,
    });
    const dbData = await response.json();
    setData(dbData);
    console.log(dbData)
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

  const goBack=()=>{
    window.location.href = "/features"
  }
  if (data.length > 0) {
    return  (
      processing ? <Loading text="Creating a task"/> :
      <Layout
        screen={screen}
        key={props.id}
        title={props.name}
        setNav={props.setNav}
      >
        {/* <Menuv2/> */}

        <div className="imageandtext-container">
          <div className="image-container"><Image src={data[0].image_path} width={400} height={400} style={{objectFit: "contain"}} className="preview-image"/></div>
          <div className="text-container" dangerouslySetInnerHTML={{ __html: data[0].long_desc }}>
          
          </div>
          </div>




        <div className="products-item-buttons margin-left-16">
          <button className="btn" onClick={goBack}>
            Go back
          </button>
          {clientId != 2 ? (
            data[0].task_id === null ?
            <button
              className="btn"
              onClick={() =>
                processTaskCreation(
                  data[0].name,
                  data[0].short_desc,
                  data[0].assigned,
                  sessionStorage.getItem("user"),
                  data[0].id
                )
              }
            >
              Create task
            </button>
            : <button
            className="btn btn-green"
          >
            {"Task "+data[0].task_id}
          </button>
          ) : (
            <button className="btn" onClick={goBack}>
              Login as a client to create the task
            </button>
          )}
        </div>
      </Layout>
    );
  } else {
    return <Loading text="Getting feature details..."/>;
  }
};

export default Page;
