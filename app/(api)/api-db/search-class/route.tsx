import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest,) {
    // queryの取得
    const searchParams = request.nextUrl.searchParams;
    const keyword = "%" + searchParams.get('keyword') + "%" ;

    // 科目番号か授業名かの部分一致で授業情報を取得
    const { rows } = await sql`SELECT * FROM class WHERE id like ${keyword} OR name like ${keyword} limit 20;`;

    // 出席情報の過半数がはい、いいえのどちらかなのかを取得
    let attend
    let count
    let sum
    for(let i=0; i<rows.length; i++) {
        attend = await sql`SELECT COUNT(*), SUM(attend) FROM review WHERE class_id like ${rows[i].id};`;
        count = Number(attend.rows[0].count)
        sum = Number(attend.rows[0].sum)

        if (sum/ count < 0.5) {
            rows[i].attend_metrics = 0;
        } else if( count === 0) {  //投稿が一件もない場合、2を返す
            rows[i].attend_metrics = 2;
        } else {
            rows[i].attend_metrics = 1;
        }
    }
    return NextResponse.json(rows)
}