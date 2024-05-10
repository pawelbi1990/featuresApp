'use client'
import React from 'react'
import DetailedFeature from "@/components/DetailedFeature";
import { useState, useEffect } from 'react';

const page = ({params}) => {
  const [clientId, setClientId] = useState(sessionStorage.getItem("user"));
  useEffect(() => {
    
    setClientId(sessionStorage.getItem("user"));

  }, []);
  return (
    <div><DetailedFeature clientId={clientId} id={params.id}/></div>
  )
}

export default page