import { NextResponse } from "next/server";
import { sessionChecker } from "../sessionCheck/route";
import { Pool } from "pg";
const baseUrl=process.env.BASE_URL
const taskStatus=process.env.STATUS_ID
const taskTracker=process.env.TRACKER_ID
const assignedCustomField=process.env.ASSIGNED_ID
let pool;
if (!pool) {
  pool = new Pool();
}

let dataValid = false;
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
      case 16:
        return "UPDATE public.testclient2 SET task_id = $1 WHERE id = $2";
        break;
      case 17:
        return "UPDATE public.testclient3 SET task_id = $1 WHERE id = $2";
        break;      
      case 126:
        return "UPDATE public.testclient SET task_id = $1 WHERE id = $2";
        break;
    }
  };

  const booleaner = (tf) => {
    return tf;
  };

  const auth = sessionChecker(data, res);
  if (auth) {
    const json = {
      issue: {
        subject: taskName,
        description: desc,
        project_id: userId,
        tracker_id: taskTracker,
        status_id: taskStatus,
        assigned_to_id: assigned, 
        custom_fields: [
          {
            id: assignedCustomField,
            value: assigned, 
          },
        ],
      },
    };

    const jsonString = JSON.stringify(json, null, 2);

    try {
      const response = await fetch(
        `${baseUrl}/issues.json`,
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

        taskId = responseBody.issue.id;
        taskTitle = responseBody.issue.subject;

        const sqlQuery = await id(userId);

        const values = [taskId, featureId];
        console.log(sqlQuery);
        await pool.query(sqlQuery, values);

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
