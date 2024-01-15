import { NextResponse } from "next/server"
const PUT = async (req, res) => {
const taskData = {
  issue: {
    project_id: 121, //id projektu
    subject: "Update z poziomu API - testy", //tytuł taska
    notes: "The task have been modified with api call", //dodanie komentarza
    private_notes: true, //true - prywatny, false - publiczny komentarz
    status_id: 2, //zmiana statusu
    tracker_id: 0, //zmiana trackera
    assigned_to_id: 238,
    custom_fields: [
      {
      id: 150,
      // field_format: 'enumeration',
      value: 238,

    },
  ]
    
    
  }
}

const taskDataUpdated = {
  issue: {

  }
}
const json = {
    "issue": {      
      "project_id": 116,
           
    }
  };
  
  const jsonString = JSON.stringify(taskData, null, 2);
  
  const apiKey = process.env.API_KEY

const response = await fetch("https://sb-betting.easyredmine.com/issues/109750.json", {
method: "PUT",
headers: {
  "Content-Type": "application/json",
  "X-Redmine-API-Key": apiKey,
},
body: jsonString,
});
if (response.ok) {
console.log(response.status)
return NextResponse.json({responseData: "ok"}, {status: 200})
} else {
  return NextResponse.json({responseData: "notok"}, {status: 400})
}
}





export {PUT}