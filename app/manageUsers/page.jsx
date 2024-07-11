"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Image from "next/image";
import Loading from "@/components/Loading";

const Page = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(0);
  const [admin, setAdmin] = useState();
  const [session, setSession] = useState();
  const [user, setUser] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modal, setModal] = useState({
    toggled: false,
    id: null,
    username: null,
  });
  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    setAdmin(sessionStorage.getItem("superUser"));
    setSession(sessionStorage.getItem("session"));
    setUser(sessionStorage.getItem("user"));
  }, []);
  const updatePassword = async (id, username) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("admin", admin);
    formData.append("session", session);
    formData.append("userId", user);

    if (password === confirmPassword && formData) {
      setLoading(true);
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      const response = await fetch("api/passwordChange", {
        method: "POST",
        body: formData,
      });
      if (response.status === 200) {
        const data = await response.json();
        alert(data.status);
        setLoading(false);
        setSuccess(2);
      } else if (response.status === 400) {
        const data = await response.json();
        alert(data.status);
        setLoading(false);
        setSuccess(1);
      }
    } else {
      console.error("Passwords dont match");
    }
  };
  const getUsers = async () => {
    const response = await fetch("api/getUsers", {
      method: "GET",
    });
    if (response) {
      const responseData = await response.json();
      const userData = await responseData.users;
      setData(userData);
      console.log(userData);
    }
  };

  const passwordChangeModalToggle = (id, username) => {
    setModal((prevModal) => ({
      ...prevModal,
      toggled: !prevModal.toggled,
      id: id,
      username: username,
    }));
    console.log(modal.toggled);
  };

  if (data.length > 0 && !modal.toggled) {
    return (
      <Layout
        title=""
        navbar=""
        headerDisabled="0"
        setNav={props.setNav}
        nav={props.nav}
        screen="1024"
      >
        <div className="products-item-container">
          {data.map((item) => (
            <div key={item.id} className="products-item">
              <div className="products-image">
                <Image
                  src={item.image}
                  width={500}
                  height={500}
                  alt={item.username}
                  className="client-image"
                  key={item.id}
                  placeholder="empty"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                />
              </div>
              <div className="card-button-container">
                <button
                  className="btn"
                  onClick={() =>
                    passwordChangeModalToggle(item.id, item.username)
                  }
                >
                  Change password
                </button>
              </div>
            </div>
          ))}
          {/* <button onClick={getUsers}>Get users</button> */}
        </div>
      </Layout>
    );
  } else if (data.length && modal.toggled) {
    return !loading ? (
      <Layout
        title=""
        navbar=""
        headerDisabled="0"
        setNav={props.setNav}
        nav={props.nav}
        screen="1024"
      >
        {success === 0 ? (
          <div className="wrapper">
            <div className="modal-form">
              <div>{modal.username}</div>
              <div>New password</div>
              <input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>Confirm new password</div>
              <input
                type="text"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div>
                <button
                  className="btn"
                  onClick={() => updatePassword(modal.id, modal.username)}
                >
                  Change password
                </button>
              </div>
              <div>
                <button
                  className="btn"
                  onClick={() => passwordChangeModalToggle(null, null)}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        ) : success === 2 ? (
          <div className="modal-form">
            Password changed
            <button className="btn" onClick={() => setSuccess(0)}>
              OK
            </button>
          </div>
        ) : success === 1 ? (
          <div className="modal-form">
            Password change failed
            <button className="btn" onClick={() => setSuccess(0)}>
              Try again
            </button>
          </div>
        ) : null}
      </Layout>
    ) : (
      <Loading />
    );
  } else {
    return <Loading />;
  }
};

export default Page;
