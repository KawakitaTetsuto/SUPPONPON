import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const class_id = body.class_id;
    const comment = body.comment;
    const attend = body.attend;

    // option1～option5の値を格納する配列
    const options: string[] = [];

    // option1からoption5を取得し、配列に格納
    for (let i = 0; i < 5; i++) {
        const optionValue = body.options[i] as string; // option1, option2, ...
        options.push(optionValue); 
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
        return NextResponse.json({ error}, { status: 500 });
    }
    return redirect(`/`);
}

