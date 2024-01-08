

import { Pool } from 'pg';
import { NextResponse } from 'next/server';
import { sessionChecker } from './sessionCheck/route';





const pool = new Pool({
    host: process.env.DATABASE_HOST_NAME,
    user: process.env.DATABASE_USER_NAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT

})

export async function POST(req, res) {
    const data = await req.json()
    const userId = parseInt(data.userId)
    console.log(userId)
    const auth = await sessionChecker(data, res)
    
    
      if (auth === true) {
      // const client = await pool.connect();
        
      const sqlAdminQuery = `SELECT * FROM public.features`;
      const sqlQuery = `SELECT * FROM public.features WHERE client = $1`;
        
      const values = [userId]
      let result = null
      if ((userId === 1) || (userId === 2)) {
        result = await pool.query(sqlAdminQuery);
      } else {
        result = await pool.query(sqlQuery, values)
      }
      const dbData = await result.rows
      console.log(dbData)
      
  
      
      // await client.release();
  
      
      return NextResponse.json(dbData);
    } else {
        return NextResponse.json({message: "Session invalid"}, {status: 401})
    }
};
  


