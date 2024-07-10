import { Pool } from "pg";
import { NextResponse } from "next/server";
let pool;
if (!pool) {
    pool = new Pool()
}

const POST = async (req, res) => {
  const data = await req.json();
  const userId = await data.userId;
  const sessionUpdateQuery = `UPDATE public.users SET session = $1 WHERE id = $2`;
  const sessionValues = [null, userId];
  const sessionUpdateResult = await pool.query(
    sessionUpdateQuery,
    sessionValues
  );
  console.log("user "+userId+" logged out succesfully");
  return NextResponse.json(
    { message: "logged out succesfully" },
    { status: 200 }
  );
};

export { POST };
