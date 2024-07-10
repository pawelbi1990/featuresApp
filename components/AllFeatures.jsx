"use client";
import { useState, useEffect, Suspense } from "react";
import Layout from "@/components/Layout";
import ImageAndText from "@/components/ImageAndText";
import Loading from "@/components/Loading";
import Link from "next/link";
import Login from "@/components/Login";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import DetailedFeature from "@/components/DetailedFeature";
import { useGlobalState } from "../context/GlobalState"


import Image from "next/image";

const AllFeatures = (props) => {
  const {state, setState} = useGlobalState()
  const [longdesc, setLongdesc] = useState()
  const [loggedIn, setLoggedin] = useState(null);
  const [itemsPerPage, setItemPerPage] = useState(); //this variable determines number of slides shown on single page, undefined, by default, updates on screen resizes and first render, depending on width state
  const [index, setIndex] = useState(0); //index of first shown slide, 0 by default
  const [width, setWidth] = useState(); //state used to manage screen width, undefined by default
  const [sessionLoaded, setSessionLoaded] = useState(null);
  const [focus, setFocus] = useState(index + 1);
  const [details, setDetails] = useState(false);
  const [id, setId] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [guest, setGuest] = useState(null);
  const [processing, setProcessing] = useState(false);
  let dbData = [];

  const text = "Create task";
  const blocked = [];
  const [blockedTask, setBlockedTask] = useState({
    blockedId: [],
    blockedTaskId: [],
  });

  const handleResize = () => {
    //func used for screen width state management on resizes
    setWidth(window.innerWidth);
    if (width >= 1500) {
      setItemPerPage(3);
    }
    if (width < 1500 && width >= 1000) {
      setItemPerPage(2);
    }
    if (width < 1000) {
      setItemPerPage(1);
    }
    console.log(width);
  };

  useEffect(() => {
    //updating width state on resizes
    window.addEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    //updating itemperpage state on rerenders, dependind on user's device
    setWidth(window.innerWidth);
    if (window.innerWidth >= 1500) {
      setItemPerPage(3);
    }
    if (window.innerWidth < 1500 && window.innerWidth >= 1000) {
      setItemPerPage(2);
    }
    if (window.innerWidth < 1000) {
      setItemPerPage(1);
    }
  });

  const nextItems = () => {
    //function responsible for navigation between slide groups shown on page, attached to `next` arrow
    if (index + itemsPerPage < filteredData.length) {
      setIndex(index + 1);
      setFocus(index + 2);
    }
  };

  const prevItems = () => {
    //function responsible for navigation between slide groups shown on page, attached to `prev` arrow
    if (index > 0) {
      setIndex(index - 1);
      setFocus(index - 2);
    }
  };

  useEffect(() => {
    getData();
    setClientId(sessionStorage.getItem("user"));

  }, []);

  useEffect(() => {
    //gets user session from localstorage on renders
    setLoggedin(sessionStorage.getItem("session"));
    if (sessionStorage.getItem("session")) {
      //gets last item from session to determine which client is loggedIn

      setSessionLoaded(true);
    }

  });

  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [forbetData, setForbetData] = useState([]);
  const [crocoData, setCrocoData] = useState([]);
  const [ebData, setEbData] = useState([]);
  const [publicData, setPublicData] = useState([]);
  const [search, setSearch] = useState("");
  const [clientId, setClientId] = useState(0);
  const [currentData, setCurrentData] = useState(publicData);
  const [currentProject, setCurrentProject] = useState(null);
  const [buttonActive, setButtonActive] = useState(false);
  let featuresInPosession = [
    {
      featureId: null,
      taskId: null,
    },
  ];
  const [featureItem, setFeatureItem] = useState({
    blocked: [],
  });

  const getData = async () => {
    //fetching data from api and saving it do dbData state
    let data = {
      session: sessionStorage.getItem("session") || null,
      userId: sessionStorage.getItem("user") || null,
    };

    const cachedAllData = await JSON.parse(
      sessionStorage.getItem("cachedAllData")
    );

    if (cachedAllData) {
      setData(cachedAllData);
    } else {
      const response = await fetch("/api", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        dbData = await response.json();
        console.log(response.status);

        setData(dbData);

        sessionStorage.setItem("cachedAllData", JSON.stringify(dbData));
      } else {
        window.location.href = "/401";
      }
    }
  };

  const handleDetailsClick = (id, image, longdesc) => {
    setDetails(true);
    setId(id);
    setLongdesc(longdesc)
    setImagePath(image);
    window.location.href = `features/${id}`
  };

  const goBack = (state) => {
    setDetails(state);
  };

  const handleLogout = async () => {
    const data = { userId: parseInt(sessionStorage.getItem("user")) };
    await fetch("/api/logout", {
      method: "POST",
      body: JSON.stringify(data),
    });
    sessionStorage.clear();
    window.location.href = "/";
  };

  const createTask = async (taskName, desc, assigned, userId, id) => {
    setProcessing(true);
    const requestData = {
      taskName: taskName,
      desc: desc,
      assigned: assigned,
      userId,
      userId,
      id: id,
    };
    const response = await fetch("/api/createTask", {
      method: "POST",
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("task created");
      setProcessing(false);
      window.location.href = "/taskCreated";
      sessionStorage.removeItem("cachedAllData")
    } else {
      console.log("error creating task");
      setProcessing(false);
      window.location.href = "/taskCreationFailed";
    }
  };



  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search)
  ); //filtering data depending on search state that's beeing updated by search bar
  const data119 = data.filter((item) => item.client === 123);
  if (sessionLoaded) {
    if (loggedIn && !processing && filteredData.length > 0 && !state.loggingOut) {
      //checking if user is loggedin (session stored in localStorage), if not - returns login screen

      if (!details) {
        return (
          //checking if data exists

          <Layout
            title=""
            navbar=""
            setNav={props.setNav}
            nav={props.nav}
            screen={width}
          >
            {/* <div className="search-container">
                <label>

            <       input type="text" className="searchbar" placeholder='Search' onChange={(event) => {setSearch(event.target.value.toLowerCase())}}/>
                </label>
            </div> */}

            <div className="products-item-container">
              {filteredData.map((item, subIndex) => (
                //slicing data to show only wanted number of items

                <div
                  className={
                    subIndex % 2 !== 0 ? "products-item" : "products-item"
                  }
                  key={subIndex}
                >
                  <p>
                    {clientId == 2
                      ? item.clientname + " " + item.name
                      : item.name}{item.id}
                  </p>
                  <div className="products-image">
                  <Image
                    onClick={() => handleDetailsClick(item.id, item.image_path, item.long_desc)}
                    src={item.image_path}
                    width={500}
                    height={500}
                    alt={item.name}
                    className="client-image"

                    key={item.id}
                    placeholder="empty"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                  />
                  </div>
                  <div className="products-item-buttons">
                    {clientId != 2 && clientId !=1 ? (
                      item.task_id === null ? (
                        <button
                          className="btn"
                          onClick={() =>
                            createTask(
                              item.name,
                              item.short_desc,
                              item.assigned,
                              sessionStorage.getItem("user"),
                              item.id
                            )
                          }
                        >
                          Create task
                        </button>
                      ) : (
                        <Link href={`https://sb-betting.easyredmine.com/issues/${item.task_id}`}>
                        <button
                          className="btn"
                        >
                          {"Task "+item.task_id}
                        </button>
                        </Link>
                      )
                    ) : (
                      <button className="btn" onClick={handleLogout}>
                        Login as a client to create the task
                      </button>
                    )}

                    <button
                      className="btn"
                      onClick={() =>
                        handleDetailsClick(item.id, item.image_path, item.long_desc)
                      }
                    >
                      Show details
                    </button>
                  </div>
                  {/* <div className="products-image-separator" ></div> */}
                </div>
              ))}

              {/* <button className="swiper-nav-button-prev" onClick={prevItems}><BsFillArrowLeftCircleFill/></button>
        <button className="swiper-nav-button-next" onClick={nextItems}><BsFillArrowRightCircleFill/></button> */}
            </div>
          </Layout>
        );
      }
      if (details) {
        return (
          <DetailedFeature
            screen={width}
            id={id}
            goBack={goBack}
            image={imagePath}
            handleLogout={handleLogout}
            createTask={createTask}
            long_desc={longdesc}
            // guest={guest}
            clientId={clientId}
          />
        );
      }
      //  else {
      //   return <Login nav={props.nav} setNav={props.setNav} />;
      // }
    } else {
      return (!state.loggingOut ? <Loading text={"Loading"}/> : <Loading text={"Logging Out"}/>);
    }
  }
};

export default AllFeatures;
