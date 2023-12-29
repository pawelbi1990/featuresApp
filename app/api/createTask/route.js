import { NextResponse } from "next/server"
import { sessionChecker } from "../sessionCheck/route"




  
  
  const POST = async (req, res) => {

    
    const data = await req.json()
    const taskName = await data.taskName
    const desc = await data.desc
    const userId = await data.userId
    const assigned = await data.assigned

    const auth = sessionChecker(data, res)
    if (auth) {
    const json = {
        "issue": {
          "subject": taskName + " test - do zamknięcia",
          "description": desc + " test - do zamknięcia",
          "project_id": userId,
          "tracker_id": 11,
          "status_id": 17,
          "assigned_to_id": assigned, //6 -alpha, 13 - Omega
          "custom_fields": [
            {
              "id": 52,
              "value": assigned, //6 - alpha, 13 - Omega
            }
          ]
        }
      };
      
      const jsonString = JSON.stringify(json, null, 2);
  
      try {
  const response = await fetch("https://tools-api.internal.sb-betting.com/easy-redmine-tools/public/issues/create?apiKey=7b18a7458a71f97279d0af0a365557ec4b231200", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonString,
  });
  if (response.ok) {
    const responseBody = await response.json()     
    const taskStatus = ({
      taskid: responseBody.issue.id,
      owner: responseBody.issue.project.name,
      featureid: id
    }) 
    console.log("Task created")
                 
  }
    
  
} catch (err) { console.log(err) }
return NextResponse.json({status: "task created"}, {status: 200})
} else {
    return NextResponse.json({message: "Session invalid"}, {status: 401})
}     
  }


export {POST}

