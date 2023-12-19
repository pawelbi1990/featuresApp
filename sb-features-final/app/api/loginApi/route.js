import { NextResponse } from "next/server"
import { Pool } from 'pg'
import bcrypt from 'bcrypt'
const jwt = require('jsonwebtoken')

const pool = new Pool({
    host: process.env.DATABASE_HOST_NAME,
    user: process.env.DATABASE_USER_NAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT

})

const POST = async (req, res) => {
    const user = await req.json()
    const userName = await user.userName
    const password = await user.userSecret
    const client = await pool.connect()
    const sqlQuery = `SELECT * FROM public.users where username = $1`;
    const values = [userName]
    const dbData = await client.query(sqlQuery, values)
    const dbDataRows = dbData.rows
    const userHash = dbDataRows[0].hash
    const userRole = dbDataRows[0].admin
    const clientId = dbDataRows[0].id
    
    // console.log(clientId)
    const login = await new Promise((resolve, reject) => {
        bcrypt.compare(password, userHash, (err, result) => {
        
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
    console.log(login)
    
    const key = process.env.JWT_KEY
    const token = jwt.sign(user, key, {expiresIn: '1h'})
    if (login) {
        const sessionUpdateQuery = `UPDATE public.users SET session = $1 WHERE id = $2`
        const sessionValues = [token, clientId]
        const sessionUpdateResult = await client.query(sessionUpdateQuery, sessionValues)
        console.log(sessionUpdateResult)
    }
    client.release()
     if (login) {return NextResponse.json({login: token, admin: userRole, clientId: clientId })}
     else {return NextResponse.json({login: "Wrong credentials"})}
}

export {POST}