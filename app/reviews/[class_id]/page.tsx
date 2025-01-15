import { headers } from 'next/headers';
import { config } from '@/next.config.mjs';
import { Show_reviews } from './_components/search-review';
import { Barchart } from './_components/barchart';
import { Doughnutchart } from './_components/doughnutChart';
import Image from 'next/image';

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
	const response = await fetch(`${config.apiPrefix}${host}/api-db/search-class?keyword=${id}`);
	const class_data: Class[] = await response.json();
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-left sm:items-start">
				<div>
					<p className='text-sm mb-0 pb-0'>{class_data[0].id}</p>
					<h1 className='text-3xl mt-0 pt-0'>{class_data[0].name}</h1>
				</div>
				<div className='flex flex-row'>
					<div>
						<Image
							src="/images/file_2.png"
							alt="開講時限"
							width={40}
							height={40}
							priority
							style={{ marginRight: '15px' }} // 右側に10pxの余白を追加
						/>
					</div>
					<div>
						<p className='text-xs mb-0 pb-0'>開講時限</p>
						<p className='text-lg mt-0 pt-0'>{class_data[0].season} {class_data[0].date}</p>
					</div>
				</div>
				<div className='flex flex-row'>
					<div>
						<Image
							src="/images/file_3.png"
							alt="単位数"
							width={40}
							height={40}
							priority
							style={{ marginRight: '15px' }} // 右側に10pxの余白を追加
						/>
					</div>
					<div>
						<p className='text-xs mb-0 pb-0'>単位数</p>
						<p className='text-lg mt-0 pt-0'>{class_data[0].credit}</p>
					</div>
				</div>
				<div className='flex flex-row'>
					<div>
						<Image
							src="/images/file_5.png"
							alt="標準履修年次"
							width={40}
							height={40}
							priority
							style={{ marginRight: '15px' }} // 右側に10pxの余白を追加
						/>
					</div>
					<div>
						<p className='text-xs mb-0 pb-0'>標準履修年次</p>
						<p className='text-lg mt-0 pt-0'>{class_data[0].grade}</p>
					</div>
				</div>
				<div className='flex flex-row'>
					<div>
						<Image
							src="/images/file_4.png"
							alt="リンク"
							width={40}
							height={40}
							priority
							style={{ marginRight: '15px' }} // 右側に10pxの余白を追加
						/>
					</div>
					<div>
						<p className='text-xs mb-0 pb-0'>リンク</p>
						<p className='text-lg mt-0 pt-0'><a href={"https://kdb.tsukuba.ac.jp/syllabi/2024/" + class_data[0].id + "/jpn/0"} target="_blank" className='text-blue-600 dark:text-blue-400 underline'>シラバスはこちら</a></p>
					</div>
				</div>
				
				<div className='m-auto'>
				<div className='inline-block m-0 w-full md:w-[300px]'>
					<Doughnutchart
						inputResult={id}
					/>
				</div>
        		<div className='inline-block m-0 w-full md:w-[600px]'>
					<Barchart
						inputResult={id}
					/>
				</div>
				
				</div>
				<Show_reviews
					inputResult={id}
				/>
			</main>
		</div>);
}