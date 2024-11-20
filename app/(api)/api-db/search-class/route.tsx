import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest,) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id') + "%" ;
    const { rows } = await sql`SELECT * FROM class WHERE id like ${id} limit 20;`;

    return NextResponse.json(rows)
}