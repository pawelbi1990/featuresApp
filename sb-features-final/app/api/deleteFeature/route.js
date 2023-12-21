import { Pool } from 'pg';
import { NextResponse } from 'next/server';
import { host, user, database, password, port } from '../../__credentials/credentials.json';

const pool = new Pool({
    host: host,
    user: user,
    database: database,
    password: password,
    port: port
});



export async function POST(request) {

    
   
    const data = await request.json();
    

    const client = await pool.connect();

    const sqlQuery = `
        DELETE FROM public.features WHERE id = $1
    `;
    
    const values = [data];

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
