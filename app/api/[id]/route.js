import { Pool } from 'pg';
import { NextResponse } from 'next/server';


const pool = new Pool({
    host: process.env.DATABASE_HOST_NAME,
    user: process.env.DATABASE_USER_NAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT

})

export async function GET(req, {params}) {
    const postID = params.id;
    
    let client;
    try {
        
        client = await pool.connect();
    
        
        const sqlQuery = `SELECT * FROM public.features WHERE id = ${postID}`;
        
        
        
        const res = await client.query(sqlQuery);
        const data = res.rows;
        
       
        return NextResponse.json(data);
    } catch (error) {
        
        console.error('Error executing SQL query:', error);
        return NextResponse.error(error);
    } finally {
        
        if (client) {
            client.release();
        }
    }
}
