import { NextResponse } from "next/server"
const jwt = require('jsonwebtoken')

const POST = async (req, res) => {
    const user = await req.json()
    const key = "klucz"
    const token = jwt.sign(user, key, {expiresIn: '1h'})

    return NextResponse.json({token})
}

export {POST}