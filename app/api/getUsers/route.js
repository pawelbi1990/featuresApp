import { NextResponse } from 'next/server'
import {Pool} from "pg";
let pool;
if (!pool) {
    pool = new Pool()
}


const GET = async (req,res) => {
  const sqlQuery = `SELECT username, id, image FROM public.users WHERE id NOT IN(1,2) ORDER BY id ASC`
  const result = await pool.query(sqlQuery)
  const clientList = await result.rows



  return NextResponse.json({users: clientList})
}

export {GET}
