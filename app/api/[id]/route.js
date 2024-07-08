import { Pool } from 'pg';
import { NextResponse } from 'next/server';
import { pool } from '../route'


// const pool = new Pool({
//     host: process.env.DATABASE_HOST_NAME,
//     user: process.env.DATABASE_USER_NAME,
//     database: process.env.DATABASE_NAME,
//     password: process.env.DATABASE_PASSWORD,
//     port: process.env.DATABASE_PORT

// })

export async function POST(req, {params}) {
    const data = await req.formData();
    const postID = params.id;
    const clientIdString = await data.get("clientId")
    const clientId = parseInt(clientIdString)
    const sqlQueryCheck = async (id, postId) => {
        switch (id) {
          case 1:
            return "SELECT * from public.admin_view";
            break;
          case 2:
            return `SELECT * from public.admin_view WHERE id = ${postId}`;
            break;
          case 106:
            return `SELECT * FROM public.eb`;
            break;
          case 119:
            return `SELECT * FROM public.forbet`;
            break;
          case 123:
            return `SELECT * FROM public.betfan`;
            break;
          case 143:
            return `SELECT * FROM public.etoto`;
            break;
          case 133:
            return `SELECT * FROM public.fuksiarz`;
            break;
          case 98:
            return `SELECT * FROM public.merrybet`;
            break;
          case 165:
            return `SELECT * FROM public.premierlotto`;
            break;
          case 112:
            return `SELECT * FROM public.premierbetzone`;
            break;
          case 116:
            return `SELECT * FROM public.totalbet`;
            break;
          case 121:
            return `SELECT * FROM public.croco`;
            break;
          case 126: 
            return `SELECT * FROM public.testclient`;
            break;
  
          default:
            return null;
            break;
        }
      };
      
    
    
    let client;
    try {
        
        client = await pool.connect();
    
        
        // const sqlQuery = `SELECT * FROM public.admin_view WHERE id = ${postID}`;
        const sqlQuery = await sqlQueryCheck(clientId, postID)
        console.log(sqlQuery)
        
        
        
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
