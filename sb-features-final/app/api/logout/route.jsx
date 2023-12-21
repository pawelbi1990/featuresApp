import {Pool} from 'pg'
import { NextResponse } from 'next/server'

const pool = new Pool({
    host: process.env.DATABASE_HOST_NAME,
    user: process.env.DATABASE_USER_NAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT

})

const POST = async (req,res) => {
        const data = await req.json()
        const userId = await data.userId
        console.log(data)
        const client = await pool.connect()
        const sessionUpdateQuery = `UPDATE public.users SET session = $1 WHERE id = $2`
        const sessionValues = [null, userId]
        const sessionUpdateResult = await client.query(sessionUpdateQuery, sessionValues)
        client.release()
        return NextResponse.json({message: "logged out succesfully"}, {status: 200})
}

export {POST}