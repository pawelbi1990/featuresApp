import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");
import {Pool} from "pg";
let pool;
if (!pool) {
    pool = new Pool()
}

const POST = async (req, res) => {

    try {
    const user = await req.json();
    const userName = await user.userName;
    const password = await user.userSecret;
    const sqlQuery = `SELECT * FROM public.users where username = $1`;
    const values = [userName];

    const dbData = await pool.query(sqlQuery, values);
    const dbDataRows = dbData.rows;
    if (dbDataRows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const userHash = dbDataRows[0].hash;
    const userRole = dbDataRows[0].admin;
    const clientId = dbDataRows[0].id;
    const login = await new Promise((resolve, reject) => {
      bcrypt.compare(password, userHash, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    const key = process.env.JWT_KEY;
    const token = jwt.sign(user, key, { expiresIn: "1h" });
    if (login) {
      try {

        const sessionUpdateQuery = `UPDATE public.users SET session = $1 WHERE id = $2`;

        const sessionValues = [token, clientId];

        const sessionUpdateResult = await pool.query(
          sessionUpdateQuery,
          sessionValues
        ) ;


        // console.log(sessionUpdateResult)
      } catch (err) {

        console.log(err);
      }
    }

    if (login) {

      return NextResponse.json({
        login: token,
        admin: userRole,
        clientId: clientId,
      });
    } else {

      return NextResponse.json(
        { message: "Wrong credentials" },
        { status: 401 }
      );
    }
} catch (err) {
    console.log(err)
    }
};

export { POST };
