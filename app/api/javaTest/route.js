import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
        const response = await fetch('http://localhost:8080/users', {
            method: "GET"
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data); // Output the response from Java server

        return NextResponse.json({ status: 200, data });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ status: 500, error: error.message });
    }
}

