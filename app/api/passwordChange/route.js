import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Pool } from "pg";
import { pool } from "../route";
import { adminSessionChecker } from "../sessionCheck/route";
// const pool = new Pool({
//     host: process.env.DATABASE_HOST_NAME,
//     user: process.env.DATABASE_USER_NAME,
//     database: process.env.DATABASE_NAME,
//     password: process.env.DATABASE_PASSWORD,
//     port: process.env.DATABASE_PORT

// })

export async function POST(request, res) {
  const saltRounds = 10;
  const data = await request.formData();
  const user = await data.get("username");
  const password = await data.get("password");
  const id = await data.get("id");
  const checkData = {
        session: await data.get("session"),
        user: parseInt(await data.get("userId")),
        admin: parseInt(await data.get("admin"))

    }
    const auth = await adminSessionChecker(checkData, res)
  const client = await pool.connect()
  if (auth === false) {
    return NextResponse.json({message: "unauthorized"}, {status: 401})
} else {
  bcrypt.hash(password, saltRounds, (err, hash) => {
    const sqlQuery = `
        UPDATE public.users
        SET username = $1, hash =$2
        WHERE id = $3
    `;
    const values = [user, hash, id];
    try {
      client.query(sqlQuery, values);
      client.release()
      return NextResponse.json({ status: "success" });
    } catch (error) {
      console.error("Error executing query:", error);
      client.release()
      return NextResponse.json({ status: "error" });
    }
  })};

  // console.log(data)

  return NextResponse.json({ status: "ok" });
}
