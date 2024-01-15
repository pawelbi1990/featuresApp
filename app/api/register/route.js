import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import { Pool } from 'pg';
import { pool } from '../route'
// const pool = new Pool({
//     host: process.env.DATABASE_HOST_NAME,
//     user: process.env.DATABASE_USER_NAME,
//     database: process.env.DATABASE_NAME,
//     password: process.env.DATABASE_PASSWORD,
//     port: process.env.DATABASE_PORT

// })


export async function POST(request){

    
    const saltRounds = 10;
    const data = await request.json();
    const user = data.username;
    const password = data.password
    
    bcrypt.hash(password, saltRounds, (err, hash) => {
        
        const sqlQuery = `
        INSERT INTO public.users (username, hash)
        VALUES ($1,$2)
    `;
        const values = [user, hash]
        try {
            pool.query(sqlQuery, values);
            
            return NextResponse.json({ status: 'success' });
        } catch (error) {
            console.error('Error executing query:', error);
            
            return NextResponse.json({ status: 'error' });
        }
        
        
    })
    
    
    // console.log(data)

  return NextResponse.json({status: "ok"})
    
  
}

