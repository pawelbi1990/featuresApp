import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { pool } from "../route";
import { adminSessionChecker } from "../sessionCheck/route";

import util from "util";
const hashAsync = util.promisify(bcrypt.hash);

export async function POST(request, res) {
  const saltRounds = 10;
  const data = await request.formData();
  const user = await data.get("username");
  const password = await data.get("password");
  const id = await data.get("id");
  const checkData = {
    session: await data.get("session"),
    user: parseInt(await data.get("userId")),
    admin: parseInt(await data.get("admin")),
  };
  const auth = await adminSessionChecker(checkData, res);
  const client = await pool.connect();

  if (auth === false) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  } else {
    try {
      const hash = await hashAsync(password, saltRounds);
      const sqlQuery = `
                UPDATE public.users
                SET username = $1, hash =$2
                WHERE id = $3
            `;
      const values = [user, hash, id];
      await client.query(sqlQuery, values);
      client.release();
      return NextResponse.json(
        { status: 200 },
        { message: "Password changed successfully" }
      );
    } catch (error) {
      console.error("Error executing query:", error);
      client.release();
      return NextResponse.json(
        { status: 400 },
        { message: "Something went wrong" }
      );
    }
  }
}
