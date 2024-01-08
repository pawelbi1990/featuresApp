

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

async function POST(req, res) {
    const data = await req.json()
    const userId = parseInt(data.userId)
    console.log(userId)
    const auth = await sessionChecker(data, res)
    
    
      if (auth === true) {
      const sqlQueryCheck = async (id) => {
        switch (id) {
          case 2:
            return 'SELECT * from public.admin_view';
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
            return `SELECT * FROM public.croco`
            break;
        
          default:
            return null
            break;
        }
      

      }

      
        
      const sqlAdminQuery = `SELECT * FROM public.features`;
      const sqlQuery = await sqlQueryCheck(userId)
        
      const values = [userId]
      let result = null
      
      result = await pool.query(sqlQuery)
      
      const dbData = await result.rows
  
      
      return NextResponse.json(dbData, {status: 200});
    } else {
        return NextResponse.json({message: "Session invalid"}, {status: 401})
    }
};

export {POST, pool}
  


