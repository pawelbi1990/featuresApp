import { NextResponse } from 'next/server'
import { pool } from '../route'


const GET = async (req,res) => {
  const sqlQuery = `SELECT username, id, image FROM public.users WHERE id NOT IN(1,2) ORDER BY id ASC`
  const client = await pool.connect()
  const result = await client.query(sqlQuery)
  const clientList = await result.rows

  client.release()
  
  
  return NextResponse.json({users: clientList})
}

export {GET}
