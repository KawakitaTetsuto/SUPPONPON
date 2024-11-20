import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest,) {
    const searchParams = request.nextUrl.searchParams;
    const keyword = "%" + searchParams.get('keyword') + "%" ;
    const { rows } = await sql`SELECT * FROM class WHERE id like ${keyword} OR name like ${keyword} limit 20;`;

    return NextResponse.json(rows)
}