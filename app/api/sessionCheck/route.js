import { NextResponse } from "next/server"

import bcrypt from 'bcrypt'
import {Pool} from "pg";
let pool;
if (!pool) {
    pool = new Pool()
}


const adminSessionChecker = async (reqData, res)=> {

    const data = await reqData
    console.log(data)
    const sessionId = await data.session
    const userId = await data.user
    const admin = await data.admin



    try {
    const sqlQuery = `SELECT * FROM public.users WHERE id = $1`
    const values = [userId]
    const dbData = await pool.query(sqlQuery, values)
    const dbDataRows = await dbData.rows[0]
    const dbSession = await dbDataRows.session
    const dbAdmin = await dbDataRows.admin

    if ((sessionId == dbSession)&&(admin == dbAdmin)) {
        console.log("Admin session approved")
        return true
    } else {
        return false
    }
} catch (err) {
    console.log(err)
}
}
const sessionChecker = async (reqData, res) => {

    const data = await reqData
    const sessionId = await data.session
    const userId = await data.userId
try {
    const sqlQuery = `SELECT * FROM public.users WHERE id = $1`
    const values = [userId]
    const dbData = await pool.query(sqlQuery, values)
    const dbDataRows = await dbData.rows[0]
    const dbSession = await dbDataRows.session
    if (sessionId == dbSession) {
    console.log("Session approved")
    return true
} else {

    return false
}
} catch (err) {
    console.log(err)
}
}

const POST = async (req, res) => {

    const auth = await sessionChecker(req, res)
    if (auth === true) {

        return NextResponse.json({message: "Session valid"}, {status: 200})
    } else {

        return NextResponse.json({message: "Invalid session"}, {status: 401})
    }
}


export {POST, sessionChecker, adminSessionChecker}