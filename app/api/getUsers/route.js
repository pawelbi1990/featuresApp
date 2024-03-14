import { NextResponse } from 'next/server'
import { pool } from '../route'


const GET = async (req,res) => {
  const sqlQuery = `SELECT username, id FROM public.users`
  const client = await pool.connect()
  const result = await client.query(sqlQuery)
  const clientList = await result.rows

  client.release()
  
  
  return NextResponse.json({users: clientList})
}

export {GET}
