import { NextResponse } from "next/server"
import { Pool } from 'pg'
import bcrypt from 'bcrypt'
import {adminSessionChecker} from '../sessionCheck/route'


const pool = new Pool({
    host: process.env.DATABASE_HOST_NAME,
    user: process.env.DATABASE_USER_NAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT

})
const adminLiveSessionChecker = async (reqData, res)=> {
    const data = await reqData.json()
    console.log(data) 
    
    
    
    const sessionId = await data.session
    
    
    const userId = await data.user
    const admin = await data.admin
    
    // const client = await pool.connect()
    
    
    const sqlQuery = `SELECT * FROM public.users WHERE id = $1`
    const values = [userId]
    const dbData = await pool.query(sqlQuery, values)
    const dbDataRows = await dbData.rows[0]
    
    const dbSession = await dbDataRows.session
    const dbAdmin = await dbDataRows.admin
    console.log(dbDataRows)
    console.log(sessionId == dbSession)
    console.log(admin)
    console.log(admin==dbAdmin)
    
    // await client.release()
    

    if ((sessionId == dbSession)&&(admin == dbAdmin)) {
    return true
} else {
    return false
}
}

const POST = async (req, res) => {
    
    const auth = await adminLiveSessionChecker(req, res)
    if (auth === true) {
        return NextResponse.json({message: "Session valid"}, {status: 200})
    } else {
        return NextResponse.json({message: "Invalid session"}, {status: 401})
    }
}


export {POST}