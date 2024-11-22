import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest,) {
    // queryの取得
    const searchParams = request.nextUrl.searchParams;
    const keyword = "%" + searchParams.get('keyword') + "%" ;

    // 現在の年を取得
    const now = new Date();
    const ThisYear = now.getFullYear();

    // 科目番号か授業名かの部分一致で授業情報を取得
    const { rows } = await sql`SELECT * FROM class WHERE id like ${keyword} OR name like ${keyword} limit 20;`;

    // 出席情報の過半数がはい、いいえのどちらかなのかを取得
    let attend
    for(let i=0; i<rows.length; i++) {
        attend = await sql`SELECT COUNT(*), SUM(attend) FROM review WHERE class_id = ${rows[i].class_id};`;
        if (attend.rows[0].sum / attend.rows[0].count < 0.5) {
            rows[i].attend_metrics = 0;
        } else {
            rows[i].attend_metrics = 1;
        }
    }

    console.log('%o', ThisYear);
    console.log('%o', rows);
    return NextResponse.json(rows)
}