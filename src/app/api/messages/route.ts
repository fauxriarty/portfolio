import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(req: NextRequest) {
  try {
    //get IP from headers (x-forwarded-for if behind proxy)
    let ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    // check if that IP is already in DB
    const [existing] = await sql`
      SELECT id
      FROM messages
      WHERE ip = ${ip}
      LIMIT 1
    `;
    const ipPosted = !!existing;

    const rows = await sql`
      SELECT id, name, text, page_index, top, "left", ip
      FROM messages
      ORDER BY id ASC
    `;
    return NextResponse.json({ ipPosted, rows });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    // if IP is already in DB => block further posts
    const [existing] = await sql`
      SELECT id
      FROM messages
      WHERE ip = ${ip}
      LIMIT 1
    `;
    if (existing) {
      return NextResponse.json({ error: "IP already posted" }, { status: 429 });
    }

    const body = await req.json();
    const { name, text, pageIndex, position } = body;

    const [inserted] = await sql`
      INSERT INTO messages (name, text, page_index, top, "left", ip)
      VALUES (
        ${name},
        ${text},
        ${pageIndex},
        ${position.top},
        ${position.left},
        ${ip}
      )
      RETURNING id, name, text, page_index, top, "left"
    `;
    return NextResponse.json(inserted);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
