import { NextResponse } from "next/server";
import { sessionChecker } from "./sessionCheck/route";
import { Pool } from "pg";
let pool;
if (!pool) {
  pool = new Pool();
}

async function POST(req, res) {
  const data = await req.json();
  const userId = parseInt(data.userId);
  // console.log(userId)
  const auth = await sessionChecker(data, res);

  if (auth === true) {
    

    const sqlAdminQuery = `SELECT * FROM public.features ORDER BY id ASC`;
    const sqlQuery = 'SELECT * FROM public.features ORDER BY id ASC ';

    const values = [userId];
    try {
      const result = await pool.query(sqlQuery);

      const dbData = await result.rows;
      return NextResponse.json(dbData, { status: 200 });
    } catch (err) {
      console.log(err);
    }
  } else {
    return NextResponse.json({ message: "Session invalid" }, { status: 401 });
  }
}

export { POST, pool };
