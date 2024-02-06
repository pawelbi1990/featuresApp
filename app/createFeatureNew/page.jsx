"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import img from "../../public/image.png";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import Menuv2 from "@/components/Menuv2";
import Header from "@/components/Header";

const Newfeature = (props) => {
  useEffect(() => {
    if (sessionStorage.getItem("session")) {
      setSessionLoaded(true);
    }
    if (sessionStorage.getItem("superUser")) {
      setAdminRights(true);
    }
  });

  const [name, setName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [image, setImage] = useState();
  const [imagePreviewURL, setImagePreviewURL] = useState(null); // State for the image preview URL
  const [page, setPage] = useState(1);
  const [team, setTeam] = useState(null);
  const [client, setClient] = useState(null);
  const [sessionLoaded, setSessionLoaded] = useState(null);
  const [adminRights, setAdminRights] = useState(false);
  const [admin, setAdmin] = useState();
  const [session, setSession] = useState();
  const [user, setUser] = useState();
  const [clientId, setClientId] = useState([])
  const [assigneeId, setAssigneeId] = useState()
  const [frontDesc, setFrontDesc] = useState()
  const [templateId, setTemplateId] = useState()
  const [templateData, setTemplateData] = useState({
    title: null,
    desc: null,
    titlePreview: null,
    descPreview: null
  })
  
  const color = "white"
  const [buttonStates, setButtonStates] = useState({
    button1: false,
    button2: false,
    button3: false,
    button4: false,
    button5: false,
    button6: false,
    button7: false,
    button8: false,
    button9: false,
    button10: false,
    button11: false,
    button12: false,
    button13: false,
    button14: false,
    // Add more buttons as needed
  });

  useEffect(() => {
    setAdmin(sessionStorage.getItem("superUser"));
    setSession(sessionStorage.getItem("session"));
    setUser(sessionStorage.getItem("user"));
    adminCheck();
  }, []);

  useEffect(() => {
    console.log(templateData)
  }, [templateData]);
  useEffect(() => {
    if (image) {
      setImagePreviewURL(URL.createObjectURL(image)); // Set the image preview URL
    }
  }, [image]);

  

  const handleClientIdChange = (e, buttonName) => {
    if (clientId.includes(e)) {
      let index = clientId.indexOf(e)
      if (index !== -1) {
      clientId.splice(index)
      setButtonStates((prevButtonStates) => ({
      ...prevButtonStates,
      [buttonName]: false,
    }));
      }
    } else {
    clientId.push(e);
    setButtonStates((prevButtonStates) => ({
      ...prevButtonStates,
      [buttonName]: true,
    }));
  }
    
    
  };

  const handleAssigneeChange = (e) => {
    if (assigneeId === e) {
      setAssigneeId(null)
      
      } else {
    setAssigneeId(e);
   
  }
    
    
  };

  

  const handle = (e) => {
    setUser({ ...user, userSecret: e.target.value });
  };

  const adminCheck = async () => {
    const dataCheck = {
      user: sessionStorage.getItem("user"),
      session: sessionStorage.getItem("session"),
      admin: sessionStorage.getItem("superUser"),
    };

    const response = await fetch("/api/adminSessionCheck", {
      method: "POST",
      body: JSON.stringify(dataCheck),
    });

    if (response.status === 401) {
      window.location.replace("/401");
    }
  };

  const nextPage = () => {
    setPage(2);
  };

  const prevPage = () => {
    setPage(1);
  };
  const getTemplate = async () => {
    const formData = new FormData()
    // formData.append("admin", admin);
    // formData.append("session", session);
    // formData.append("userId", user);
    formData.append("templateId", templateId)
    

    try {
      const response = await fetch("/api/getTaskTemplate", {
        method: "POST",
        body: formData
      })
      if (response.status === 200) {
        const responseData = await response.json()
        setTemplateData({
          title: await responseData.title,
          desc: await responseData.desc,
          titlePreview: await responseData.title.replace(/<\/p>/g, '<br>').replace(/DLA PO[\s\S]*/g, '').replace(/<(?!br\s*\/?>)[^>]*>/g, ''),
          descPreview: await responseData.desc.replace(/<\/p>/g, '<br>').replace(/DLA PO[\s\S]*/g, '').replace(/<(?!br\s*\/?>)[^>]*>/g, '')
        })
      }
    } catch (err) {
      console.log(err)
    }

     
  }
  const handleData = async () => {
    const formData = new FormData();
    formData.append("clientId", clientId);
    formData.append("image", image)
    formData.append("name", templateData.title)
    formData.append("short_desc", templateData.desc)
    formData.append("long_desc", frontDesc)
    formData.append("assigned", assigneeId)
    formData.append("admin", admin);
    formData.append("session", session);
    formData.append("userId", user);
    

    try {
      const response = await fetch("/api/addFeatureNew", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        let responseData = await response.json();
        console.log("Data submitted successfully.");
        console.log(responseData);
        // window.location.replace("/features");
      } else if (response.status === 400) {
        let responseData = await response.json();
        alert(responseData.message);
      } else if (response.status === 401) {
        let responseData = await response.json();
        alert(responseData.message);
        window.location.replace("/401");
      } else {
        console.error("Failed to submit data:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    sessionStorage.removeItem("cachedAllData")
    location.reload()
  };

  useEffect(() => {
    console.log(team);
  }, [team]);

  useEffect(() => {
    console.log(client);
  }, [client]);

  if (sessionLoaded) {
    
      
        return (
            
            <div className="layout-new-feature">
              <Header/>
              <Menuv2 />

                <h3 className="add-feature-buttons-header centered">Wybierz grafikę do featura</h3>
                <div
                  className="image-container-preview centered"
                  style={{ backgroundImage: `url(${imagePreviewURL})`, backgroundRepeat: 'no-repeat', backgroundSize: "contain", backgroundPosition: "center" }}
                >
                  <input
                    type="file"
                    name=""
                    id=""
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <h3 className="add-feature-buttons-header centered">Podaj id taska-templatki, żeby go pobrać</h3>
                <div>
                  <div className="centered">
                <input type="text" onChange={(e) => setTemplateId(e.target.value)}></input>
                <button className="btn" onClick={() => getTemplate()}>Pobierz dane taska-templatki</button>
                </div>
                <h3 className="add-feature-buttons-header centered">Podgląd treści taska w ERM</h3>
                <div className="text-container-preview">
                  <div className="centered" dangerouslySetInnerHTML={{ __html: templateData.titlePreview }}></div>
                  <div dangerouslySetInnerHTML={{ __html: templateData.descPreview }}></div>
                </div>
                <h3 className="add-feature-buttons-header centered">Podaj opis taska do wyświetlenia w aplikacji</h3>
                <div className="text-container-preview">
                  <textarea rows="30" className="text-container-preview-input" onChange={(e) => setFrontDesc(e.target.value)}>
                    
                  </textarea>
                  
                </div>
                  
                </div>
                
              
            
          
      
     
        
          
            
                <h3 className="add-feature-buttons-header centered">Wybierz klienta lub klientów dla których chcesz dodać feature (wymagane)</h3>
                    <div className="add-feature-buttons centered">
                    
                    <button
                      
                      onClick={() => handleClientIdChange(123, 'button1')}
                      className={buttonStates.button1 ? "btn-off" : "btn-on"}
                    >
                      BetFan
                    </button>
                    <button
                      
                      onClick={() => handleClientIdChange(121, 'button2')}
                      className={buttonStates.button2 ? "btn-off" : "btn-on"}
                    >
                      CrocoBet
                    </button>
                    <button
                      
                      onClick={() => handleClientIdChange(106, 'button3')}
                      className={buttonStates.button3 ? "btn-off" : "btn-on"}
                    >
                      EuropeBet
                    </button>
                    <button
                      
                      onClick={() => handleClientIdChange(143, 'button4')}
                      className={buttonStates.button4 ? "btn-off" : "btn-on"}
                    >
                      eToto
                    </button>
                    <button
                      
                      onClick={() => handleClientIdChange(119, 'button5')}
                      className={buttonStates.button5 ? "btn-off" : "btn-on"}
                    >
                      forBET
                    </button>
                    <button
                      
                      onClick={() => handleClientIdChange(133, 'button6')}
                      className={buttonStates.button6 ? "btn-off" : "btn-on"}
                    >
                      Fuksiarz
                    </button>
                    <button
                      
                      onClick={() => handleClientIdChange(98, 'button7')}
                      className={buttonStates.button7 ? "btn-off" : "btn-on"}
                    >
                      MerryBet
                    </button>
                    <button
                      
                      onClick={() => handleClientIdChange(112, 'button8')}
                      className={buttonStates.button8 ? "btn-off" : "btn-on"}
                    >
                      PremierBet Zone
                    </button>
                    <button
                      
                      onClick={() => handleClientIdChange(165, 'button9')}
                      className={buttonStates.button9 ? "btn-off" : "btn-on"}
                    >
                      Premier Loto
                    </button>
                    <button
                      
                      onClick={() => handleClientIdChange(116, 'button10')}
                      className={buttonStates.button10 ? "btn-off" : "btn-on"}
                    >
                      TotalBet
                    </button>
                    </div>
                    <h3 className="add-feature-buttons-header centered">{assigneeId}Wybierz team, do którego ma być domyślnie przekazany task (wymagane)</h3>

                    <div className="add-feature-buttons centered">
                    <button
                      
                      onClick={() => handleAssigneeChange(6)}
                      className={assigneeId === 6 ? "btn-off" : "btn-on"}
                    >
                      Alpha
                    </button>
                    <button
                      
                      onClick={() => handleAssigneeChange(13)}
                      className={assigneeId === 13 ? "btn-off" : "btn-on"}
                    >
                      Omega
                    </button>
                    <button
                      
                      onClick={() => handleAssigneeChange(7)}
                      className={assigneeId === 7 ? "btn-off" : "btn-on"}
                    >
                      Admins
                    </button>
                    <button
                      
                      onClick={() => handleAssigneeChange(192)}
                      className={assigneeId === 192 ? "btn-off" : "btn-on"}
                    >
                      Database
                    </button>
                    </div>
                    
                  

                  
                
                <div className="add-feature-buttons">
        
                  <button className="btn" onClick={handleData}>
                    Submit task
                  </button>
                </div>
                </div>
                
              
            
            )
          
        
      
    
  } else return <Loading />;
};

export default Newfeature;
