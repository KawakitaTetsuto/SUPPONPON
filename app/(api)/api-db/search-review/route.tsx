import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest,) {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    console.log('%o', searchParams)

    const { rows } = await sql`SELECT * FROM review WHERE class_id = ${id};`;

    let class_data
    for (let i=0; i < rows.length; i++){
        class_data = await sql`SELECT name FROM class WHERE id= ${rows[i].class_id};`;
        if (class_data.rows[0]) {
            rows[i].class_name = class_data.rows[0].name
        } else {
            rows[i].class_name = "該当科目なし"
        }
    }

    console.log('%o', rows)
    return NextResponse.json(rows)
}