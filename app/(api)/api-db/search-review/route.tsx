import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest,) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id') + "%" ;


    const { rows } = await sql`SELECT * FROM review WHERE class_id like ${id} limit 20;`;

    let class_data
    let statistics
    let count
    const save_options =[]

    for (let i=0; i < rows.length; i++){
        class_data = await sql`SELECT name FROM class WHERE id= ${rows[i].class_id};`;
        if (class_data.rows[0]) {
            rows[i].class_name = class_data.rows[0].name
        } else {
            rows[i].class_name = "該当科目なし"
        }

        if (i === 0){
            statistics = await sql`SELECT COUNT(*),SUM(attend) AS attend,SUM(option1) AS OP1, SUM(option2) AS OP2, SUM(option3) AS OP3, SUM(option4) AS OP4, SUM(option5) AS OP5 FROM review WHERE class_id LIKE ${rows[0].class_id};`;
            count = Number(statistics.rows[0].count);
            const attend = Number(statistics.rows[0].attend);
        
            for (let k = 0; k < 5; k++) {
                const count_option = `count_option${k + 1}`;
                const pull_option = `op${k + 1}`;
                rows[0][count_option] = Number(statistics.rows[0][pull_option]); 
                //console.log('%o',Number(statistics.rows[0][pull_option]))
                save_options[k] = Number(statistics.rows[0][pull_option]);
            }
            rows[0].attend = attend;
            rows[0].count_reviews = count;
        } else {
            rows[i].count_reviews = 0;
            rows[i].attend = 0;
        
            for (let k = 0; k < 5; k++) {
                const count_option = `count_option${k + 1}`;
                rows[i][count_option] = save_options[k]; 
            }
        }

    }
    //console.log('%o', rows[0])
    return NextResponse.json(rows)
}