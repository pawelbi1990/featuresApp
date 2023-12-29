import { Pool } from 'pg';
import { NextResponse } from 'next/server';


const pool = new Pool({
    host: process.env.DATABASE_HOST_NAME,
    user: process.env.DATABASE_USER_NAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT

})



export async function POST(request) {
    const data = await request.json();
    
    

    const client = await pool.connect();

    const sqlQuery = `
        SELECT * FROM created_check WHERE owner = $1
    `;
    const values = [data.owner]
    
    

    try {
        const result = await client.query(sqlQuery, values);
        client.release();
        return NextResponse.json({ status: result.rows });
    } catch (error) {
        console.error('Error executing query:', error);
        client.release();
        return NextResponse.json({ error: 'error' });
    }

};

