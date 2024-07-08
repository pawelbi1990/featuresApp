import { NextResponse } from "next/server";
import { sessionChecker } from "../sessionCheck/route";
import { pool } from "../route";
let sqlQuery = "";

const POST = async (req, res) => {
  let success = null;
  let taskId;
  let taskTitle;
  let result;
  const data = await req.json();
  const taskName = await data.taskName;
  const desc = await data.desc;
  const userId = await parseInt(data.userId);
  const assigned = await data.assigned;
  const featureId = await data.id;
  const id = async (user) => {
    switch (user) {
      case 119:
        return "UPDATE public.forbet SET task_id = $1 WHERE id = $2";
        break;
      case 123:
        return "UPDATE public.betfan SET task_id = $1 WHERE id = $2"
        break;
      case 121:
        return "UPDATE public.croco SET task_id = $1 WHERE id = $2"
        break;
      case 106:
        return "UPDATE public.eb SET task_id = $1 WHERE id = $2"
        break;
      case 143:
        return "UPDATE public.etoto SET task_id = $1 WHERE id = $2"
        break;
      case 133:
        return "UPDATE public.fuksiarz SET task_id = $1 WHERE id = $2"
        break;
      case 98:
        return "UPDATE public.merrybet SET task_id = $1 WHERE id = $2"
        break;
      case 112:
        return "UPDATE public.premierbetzone SET task_id = $1 WHERE id = $2"
        break;
      case 165:
        return "UPDATE public.premierlotto SET task_id = $1 WHERE id = $2"
        break;
      case 116:
        return "UPDATE public.totalbet SET task_id = $1 WHERE id = $2"
        break;
      case 126:
      return "UPDATE public.testclient SET task_id = $1 WHERE id = $2"
      break;
    }
  
    
  }

  const booleaner = (tf) => {
    return tf;
  };

  const auth = sessionChecker(data, res);
  if (auth) {
    const json = {
      issue: {
        subject: taskName + " {TASK z aplikacji - do weryfikacji}",
        description: desc,
        project_id: userId,
        tracker_id: 11,
        status_id: 17,
        assigned_to_id: assigned, //6 -alpha, 13 - Omega
        custom_fields: [
          {
            id: 52,
            value: assigned, //6 - alpha, 13 - Omega
          },
        ],
      },
    };

    const jsonString = JSON.stringify(json, null, 2);

    try {
      const response = await fetch(
        "https://sb-betting.easyredmine.com/issues.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-REDMINE-API-KEY": process.env.API_KEY,
          },
          body: jsonString,
        }
      );
      if (response.ok) {
        const responseBody = await response.json();
        const client = await pool.connect()
        taskId = responseBody.issue.id;
        taskTitle = responseBody.issue.subject;
        
        
        const sqlQuery = await id(userId)
          
          const values = [taskId, featureId];
          console.log(sqlQuery)
          await client.query(sqlQuery, values);
          client.release();
        // const taskStatus = ({
        //   taskid: responseBody.issue.id,
        //   owner: responseBody.issue.project.name,
        //   featureid: id
        // })
        console.log("Task created");
        result = await booleaner(true);
      } else {
        console.log("Api not responding");
        result = await booleaner(false);
      }
    } catch (err) {
      console.log(err);
    }

    if (result) {
      return NextResponse.json(
        { message: "Task created", taskId: taskId, taskTitle: taskTitle },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json({ message: "Session invalid" }, { status: 401 });
  }
};

export { POST };
