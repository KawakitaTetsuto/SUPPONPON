import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    const { rows } = await sql`SELECT * FROM review LIMIT = 5;`;
    let class_data
    for (let i=0; i < 5; i++){
        class_data = await sql`SELECT name FROM class WHICH id= ${rows[i].class_id};`;
        rows[i].class_name = class_data.rows[0].name
    }

    return NextResponse.json(rows)
}

export async function POST(request: Request) {
    const body = await request.formData();
    console.log(body)
    const class_id = body.get('class_id') as string
    const comment = body.get('comment') as string
    const attend = body.get('attend') as string

    try {
        if (!class_id || !attend) throw new Error('Class id and Attend required');
        await sql`INSERT INTO review (class_id, comment, attend) VALUES(${class_id}, ${comment}, ${attend});`;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.redirect(`/`)
}
