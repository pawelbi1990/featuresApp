"use client";
import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";
import AllFeatures from "@/components/AllFeatures";

interface UserData {
  session: any;
  userId: any;
}

const page = () => {
  // useEffect(() => {

  //     checkSession();
  //     const intervalId = setInterval(checkSession, 60000);
  //     return () => clearInterval(intervalId);
  // },[sessionStorage.getItem("session")])

  const checkSession = async () => {
    let data = {
      session: sessionStorage.getItem("session") || null,
      userId: sessionStorage.getItem("user") || null,
    };

    console.log(data);

    const response = await fetch("api/sessionCheck", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  return <AllFeatures />;
};

export default page;
