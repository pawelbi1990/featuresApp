"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ImageAndText from "@/components/ImageAndText";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import Menuv2 from "./Menuv2";

const Page = (props) => {
  const guest = props.guest;
  const screen = props.screen;
  const [data, setData] = useState([]);
  const [slide, setSlide] = useState(null);
  const [loggedIn, setLoggedin] = useState();
  useEffect(() => {
    setLoggedin(sessionStorage.getItem("session"));
  });

  const getData = async () => {
    const response = await fetch(`/api/${props.id}`);
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
    return data.map((item) => (
      <Layout
        screen={screen}
        key={item.id}
        title={item.name}
        setNav={props.setNav}
      >
        {/* <Menuv2/> */}

        <ImageAndText
          key={item.id}
          id={item.id}
          text={item.long_desc}
          image={props.image}
        ></ImageAndText>
        <div className="products-item-buttons margin-left-16">
          <button className="btn" onClick={() => props.goBack(false)}>
            Go back
          </button>
          {!guest ? (
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
              Login as client to create task
            </button>
          )}
        </div>
      </Layout>
    ));
  } else {
    return <Loading />;
  }
};

export default Page;
