import { Pool } from 'pg';
import { NextResponse } from 'next/server';


export const pool = new Pool({
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
        INSERT into created_check (taskid, owner, featureid) VALUES ($1, $2, $3)
    `;
    
    const values = [data.taskid, data.owner, data.featureid];

    try {
        await client.query(sqlQuery, values);
        client.release();
        return NextResponse.json({ status: 'success' });
    } catch (error) {
        console.error('Error executing query:', error);
        client.release();
        return NextResponse.json({ status: 'error' });
    }

};



