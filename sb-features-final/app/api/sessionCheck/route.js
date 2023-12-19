import { NextResponse } from "next/server"
import { Pool } from 'pg'
import bcrypt from 'bcrypt'


const pool = new Pool({
    host: process.env.DATABASE_HOST_NAME,
    user: process.env.DATABASE_USER_NAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT

})

const POST = async (req, res) => {
    
    const data = await req.json()
    console.log(data)
    if (data.rows[0].session !== "no-session") {
    
    const sessionId = await data.session
    
    const userId = await data.userId
    const client = await pool.connect()
    
    
    const sqlQuery = `SELECT * FROM public.users WHERE id = $1`
    const values = [userId]
    const dbData = await client.query(sqlQuery, values)
    const dbDataRows = await dbData.rows[0]
    const dbSession = await dbDataRows.session
    
    console.log(sessionId)
    console.log(dbDataRows)
}
    

    if ((sessionId === dbSession) && (sessionId !== undefined) && (sessionId !== null)) {
    return NextResponse.json({message: "Session valid"}, {status: 200})
} else {
    return NextResponse.json({message: "Invalid session"}, {status: 401})
}
} 


export {POST}