import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest,) {
    const searchParams = request.nextUrl.searchParams;
    const name = "%" + searchParams.get('name') + "%";
    console.log('%o', searchParams);
    
    const { rows } = await sql`SELECT id FROM class WHERE class.name LIKE ${name};`;
    
    let all_review: object[] = [];
    
    for (let i = 0; i < rows.length; i++) {
        let class_data;
        const id = rows[i].id;
        const review_tempo = await sql`SELECT * FROM review WHERE class_id = ${id}`;
        
        for (let j = 0; j < review_tempo.rows.length; j++) {
            class_data = await sql`SELECT name FROM class WHERE id = ${id};`;
            if (class_data.rows[0]) {
                review_tempo.rows[j].class_name = class_data.rows[0].name;
            } else {
                review_tempo.rows[j].class_name = "該当科目なし";
            }
        }
        
        all_review = [...all_review, ...review_tempo.rows];  
    }
    
    console.log('%o', all_review);
    console.log('%o',typeof(all_review))
    
    return NextResponse.json(all_review)
}