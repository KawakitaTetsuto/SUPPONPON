import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server';

export async function GET() {
    const { rows } = await sql`SELECT * FROM review;`;
    let class_data
    for (let i=0; i < rows.length; i++){
        class_data = await sql`SELECT name FROM class WHERE id= ${rows[i].class_id};`;
        if (class_data.rows[0]) {
            rows[i].class_name = class_data.rows[0].name
        } else {
            rows[i].class_name = "該当科目なし"
        }
    }

    //console.log('%o', rows)
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

    return redirect(`/`)
}
