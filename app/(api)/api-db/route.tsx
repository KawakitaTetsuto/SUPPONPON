import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server';

export async function GET() {
    const { rows } = await sql`SELECT * FROM review limit 20;`;
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
    const class_id = body.get('class_id') as string;
    const comment = body.get('comment') as string;
    const attend = body.get('attend') as string;

    // option1～option5の値を格納する配列
    let options: string[] = [];

    // option1からoption5を取得し、配列に格納
    for (let i = 1; i <= 5; i++) {
        const optionValue = body.get(`option${i}`) as string; // option1, option2, ...
        options.push(optionValue ? optionValue : '0'); // 値が存在しない場合は '0' を設定
    }

    try {
        if (!class_id || !attend) throw new Error('Class id and Attend required');

        // SQLに挿入
        await sql`
            INSERT INTO review (
                class_id, comment, attend, 
                option1, option2, option3, option4, option5, 
                created_at, user_id
            ) 
            VALUES (
                ${class_id}, ${comment}, ${attend}, 
                ${options[0]}, ${options[1]}, ${options[2]}, ${options[3]}, ${options[4]}, 
                NOW(), 0
            );
        `;
    } catch (error) {

    }

    return redirect(`/`);
}

