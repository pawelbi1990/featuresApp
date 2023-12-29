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



