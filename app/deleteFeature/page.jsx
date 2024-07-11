"use client";
import Image from "next/image";

import Layout from "@/components/Layout";
import { useState, useEffect } from "react";

import Login from "@/components/Login";
import DeletePrompt from "@/components/DeletePrompt";
import Loading from "@/components/Loading";
import adminCheck from "../createFeature/page";

const DeleteFeature = (props) => {
  const [loggedIn, setLoggedin] = useState(false);
  const [adminRights, setAdminRights] = useState(false);
  const [sessionLoaded, setSessionLoaded] = useState(null);
  const [admin, setAdmin] = useState();
  const [session, setSession] = useState();
  const [user, setUser] = useState();
  const [width, setWidth] = useState(); //state used to manage screen width, undefined by default
  const [currentClient, setCurrentClient] = useState();
  const [currentClientName, setCurrentClientName] = useState();

  const handleResize = () => {
    //func used for screen width state management on resizes
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    //updating width state on resizes
    window.addEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    //updating itemperpage state on rerenders, dependind on user's device
    setWidth(window.innerWidth);
  }, []);

  const adminCheck = async () => {
    const dataCheck = {
      user: sessionStorage.getItem("user"),
      session: sessionStorage.getItem("session"),
      admin: sessionStorage.getItem("superUser"),
    };

    if (dataCheck) {
      const response = await fetch("/api/adminSessionCheck", {
        method: "POST",
        body: JSON.stringify(dataCheck),
      });

      if (response.status === 401) {
        window.location.replace("/401");
      }
    }
  };

  useEffect(() => {
    adminCheck();
  }, []);

  useEffect(() => {
    setAdmin(sessionStorage.getItem("superUser"));
    setSession(sessionStorage.getItem("session"));
    setUser(sessionStorage.getItem("user"));
  });

  useEffect(() => {
    setLoggedin(sessionStorage.getItem("session"));
    if (sessionStorage.getItem("session")) {
      setSessionLoaded(true);
    }
    if (sessionStorage.getItem("superUser")) {
      setAdminRights(true);
    }
  });

  const [data, setData] = useState([]);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [prompt, setPrompt] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const deleteItem = async (id, client, clientName) => {
    const deleteMe = await id.toString();
    const formData = new FormData();

    formData.append("admin", admin);
    formData.append("session", session);
    formData.append("userId", user);
    formData.append("deleteId", deleteMe);
    formData.append("client", client);
    formData.append("clientName", clientName);

    const response = await fetch("/api/deleteFeature", {
      method: "POST",
      body: formData,
    });
    if (response.status === 200) {
      const responseData = await response.json();
      console.log(responseData.message);
      // sessionStorage.removeItem("cachedDeleteData")
      window.location.replace("/deleteFeature");
    } else if (response.status === 401) {
      const responseData = await response.json();
      console.log(responseData.message);
      window.location.replace("/401");
    }

    setPrompt(false);
  };

  const handlePrompt = (id, client, clientName) => {
    setPrompt(true);
    setCurrentId(id);
    setCurrentClient(client);
    setCurrentClientName(clientName);
  };

  const goBack = () => {
    setPrompt(false);
    setCurrentId(null);
  };

  const getData = async () => {
    try {
      // Check if the data is already in the cache
      const cachedDeleteData = await JSON.parse(
        sessionStorage.getItem("cachedData")
      );

      if (cachedDeleteData) {
        setData(cachedDeleteData);
      } else {
        // Fetch data if not found in the cache
        const requestData = {
          session: sessionStorage.getItem("session") || null,
          userId: sessionStorage.getItem("user") || null,
        };

        const response = await fetch("/api", {
          method: "POST",
          body: JSON.stringify(requestData),
        });

        const dbData = await response.json();

        // Update the state with the fetched data
        setData(dbData);

        // Cache the data for future use
        sessionStorage.setItem("cachedDeleteData", JSON.stringify(dbData));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  if (sessionLoaded && data.length > 0) {
    if (adminRights) {
      if (loggedIn && !prompt) {
        return (
          <Layout
            title="Choose feature to delete"
            setNav={props.setNav}
            nav={props.nav}
            screen={width}
          >
            {
              <div className="products-item-container">
                {data.map((item) => (
                  <div key={item.id} className="products-item">
                    <p>{item.name}</p>
                    <div className="products-image">
                      <Image
                        className="client-image"
                        src={item.image_path}
                        width={500}
                        height={500}
                        alt={item.name}
                        key={item.id}
                        placeholder="empty"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                      />
                    </div>
                    {/* <div className="products-image-separator" ></div> */}
                    <div className="products-item-buttons">
                      <button
                        className="btn"
                        onClick={() =>
                          handlePrompt(item.id, item.client, item.clientname)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            }
          </Layout>
        );
      }
      if (loggedIn && prompt) {
        return (
          <DeletePrompt
            id={currentId}
            client={currentClient}
            clientName={currentClientName}
            deleteItem={deleteItem}
            goBack={goBack}
          />
        );
      } else {
        return <Login />;
      }
    } else return <Login />;
  } else return <Loading />;
};

export default DeleteFeature;
