'use client'
import { useEffect } from 'react';

const Page = () => {
    useEffect(() => { fetch('/api/javaTest', {
        method: "GET",
    })
        .then(response => response.text())
        .then(data => {
            console.log(data); // Output the response from Java server
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },[])

  return (
    <div>page</div>
  )
}

export default Page