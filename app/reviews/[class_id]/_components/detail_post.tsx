import Link from "next/link"
import { config } from '@/next.config.mjs';
import { headers } from 'next/headers';

export default function Detail_Post(){

    const host = headers().get('host');	// URLのホストを取得
    const root_url = `${config.apiPrefix}${host}/`;
    const form_url = `${root_url}/form`;

    return(
        <div>
            <Link href={form_url}>
            <button className="post-button">
            出席情報投稿はこちら
            <svg className="icon" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
            </button>
            </Link>
        </div>
    )
}