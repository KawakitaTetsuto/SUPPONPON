import { headers } from 'next/headers';
import { config } from '@/next.config.mjs';
import { Show_reviews } from './_components/search-review';

// データベースから取得する情報の型を明示
interface Class {
	id: string;
	name: string;
	credit: string;
	grade: string;
	season: string;
	date: string;
}

export default async function detail_page({
	params,
  }: {
	params: Promise<{ class_id: string }>	// Dynamic routeを取得するためのparamsを引数に指定
  }) {
	const host = headers().get('host');	// URLのホストを取得
	const id = (await params).class_id;	// dynamic routeの取得
	// config.apiPrefixでプロトコル部分を環境変数から取得
	const response = await fetch(`${config.apiPrefix}${host}/api-db/search-class?id=${id}`)
	const class_data: Class[] = await response.json();
	return (
	<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
		<h1>{class_data[0].name}</h1>
		<p>科目番号: {class_data[0].id}</p>
		<Show_reviews
		inputResult={id}
		/>
	</div>);
}