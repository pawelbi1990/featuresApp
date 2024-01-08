import { Pool } from 'pg';
import { NextResponse } from 'next/server';


import {adminSessionChecker} from '../sessionCheck/route'

const pool = new Pool({
    host: process.env.DATABASE_HOST_NAME,
    user: process.env.DATABASE_USER_NAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT

})



export async function POST(request, res) {

    const data = await request.formData();
   
    const checkData = {
        session: await data.get("session"),
        user: parseInt(await data.get("userId")),
        admin: parseInt(await data.get("admin"))

    }

    const deleteMe = await data.get("deleteId")
    const auth = await adminSessionChecker(checkData, res)

    if (auth === false) {
        return NextResponse.json({message: "unauthorized"}, {status: 401})
    } else if (auth === true) {
    

    // const client = await pool.connect();

    const sqlQuery = `
        DELETE FROM public.features WHERE id = $1
    `;
    
    const values = [deleteMe];

    try {
        await pool.query(sqlQuery, values);
        // client.release();
        return NextResponse.json({message: "Feature deleted"}, {status: 200});
    } catch (error) {
        console.error('Error executing query:', error);
        // client.release();
        return NextResponse.json({message: "something went wrong"}, { status: 400 });
    }
}
};
