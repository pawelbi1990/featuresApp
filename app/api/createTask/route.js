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
  const userId = await data.userId;
  const assigned = await data.assigned;
  const featureId = await data.id;

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
        "https://easy-redmine-tools-api.sb-betting.com/issues/create?apiKey=7b18a7458a71f97279d0af0a365557ec4b231200",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonString,
        }
      );
      if (response.ok) {
        const responseBody = await response.json();

        taskId = responseBody.issue.id;
        taskTitle = responseBody.issue.subject;
        const id = async (userId) => {
          switch (userId) {
            case 119:
              return "UPDATE public.forbet SET task_id = $1 WHERE id = $2";
              break;
          }
          const sqlQuery =
            "UPDATE public.forbet SET task_id = $1 WHERE id = $2";
          const values = [taskId, featureId];
          await pool.query(sqlQuery, values);
          pool.end();
        };
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
