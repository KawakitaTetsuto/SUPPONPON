import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest,) {
    // queryの取得
    const searchParams = request.nextUrl.searchParams;
    const keyword = "%" + searchParams.get('keyword') + "%" ;
    const season = searchParams.get('season');
    const term = searchParams.get('term');
    let season_term = "%";

    // パラメータの値から開講時期を決定する
    switch (season) {
        case "1": {
            season_term+="春%";
            break;
        }
        case "2": {
            season_term+="秋%";
            break;
        }
        default: {
            break;
        }
    }

    switch (term) {
        case "1": {
            season_term+="A%";
            break;
        }
        case "2": {
            season_term+="B%";
            break;
        }
        case "3": {
            season_term+="C%";
            break;
        }
        default: {
            break;
        }
    }
    console.log("%o", keyword);
    console.log("%o", season_term);

    // 科目番号か授業名かの部分一致で授業情報を取得
    const { rows } = await sql`SELECT * FROM class WHERE (id like ${keyword} OR name like ${keyword}) AND season like ${season_term} limit 20;`;

    // 出席情報の過半数がはい、いいえのどちらかなのかを取得
    let attend
    let count
    let sum
    for(let i=0; i<rows.length; i++) {
        attend = await sql`SELECT COUNT(*), SUM(attend) FROM review WHERE class_id like ${rows[i].id};`;
        count = Number(attend.rows[0].count)
        sum = Number(attend.rows[0].sum)

        if ( count === 0 || (sum/ count < 0.5)) {
            rows[i].attend_metrics = 0;
        } else {
            rows[i].attend_metrics = 1;
        }
    }
    return NextResponse.json(rows)
}