
'use client'
import {useState} from "react"
export const createTask = async (taskName, desc, assigned, userId, id) => {
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
      console.log(responseData)
      sessionStorage.setItem("taskId", responseData.taskId)
    sessionStorage.setItem("taskTitle", responseData.taskTitle)
      window.location.href = "/taskCreated";
      sessionStorage.removeItem("cachedAllData")
    } else {
      console.log("error creating task");
      window.location.href = "/taskCreationFailed";
    }
  };