import { useEffect, useState } from 'react';
import Link from 'next/link'

// データベースから取得する情報の型を明示
interface Class {
	id: string;
	name: string;
	credit: string;
	grade: string;
	season: string;
	date: string;
	attend_metrics: number;
}

// Propsの型を明示
type ShowClassProps = {
	inputResult: string
};

export function ShowClass({ inputResult }: ShowClassProps) {
	// 授業情報を保存するためのStateを宣言
	// Stateに格納することで更新するたび再レンダリングされる
	const [reviews, setReviews] = useState<Class[]>([]);

	// 検索内容を依存配列に持つUseEffectの宣言
	useEffect(() => {
		// コールバック内でfetchを呼び出して授業情報を取得
		const fetchReviewData = async () => {
			try {
				let response
				if (inputResult === "") {
					response = await fetch('/api-db/search-class?keyword=')
				} else {
					response = await fetch(`/api-db/search-class?keyword=${inputResult}`)
				}
				const data = await response.json();
				setReviews(data);
			} catch (error) {
				console.error("Failed to fetch user data:", error);
			}
		};

		fetchReviewData();
	}, [inputResult]);

	return (
		<div className='w-full'>
			<h1>授業</h1>
			<div className='flex flex-wrap'>
					{
						(function () {
							const list = []
							for (let i = 0; i < reviews.length; i++) {
								list.push(Object.values(reviews[i]));	// Object型の投稿をそれぞれ配列に格納
							}
							return (list.map((row, index) => {
								const url= `/reviews/${row[0]}`;
								// 配列それぞれの要素を出力
								return <div className='basis-full md:basis-1/2 p-2' key={index}>
								<Link href={url}>
										<div className='border-2 rounded-md p-2 border-gray-400'>
											<span className='text-gray-500 font-xs mb-0 pb-0 dark:text-gray-400'>{row[0]}</span>
											<h2 className='font-medium text-xl mt-0 pt-0'>{row[1]}</h2>
											<div className='text-gray-600 font-sm pl-3 dark:text-gray-400'>
												<span className='mr-3'>
													{row[2]}単位
												</span>
												<span className='mr-3'>
													{row[3]}年次
												</span>
												<span className='mr-3'>
													{row[4]} {row[5]}
												</span>
											</div>
											<div className='pl-3 pt-1'>
												<span className='bg-yellow-300 p-1 mr-2  dark:text-black'>出席</span>
												<span>{ row[6] === 1 ? "あり" : "なし"}</span>
											</div>
										</div>
								</Link>
							</div>;
							})
							);
						}())
					}
			</div>
		</div>
	)
}