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
					response = await fetch('/api-db/search-class?id=')
				} else {
					response = await fetch(`/api-db/search-class?id=${inputResult}`)
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
		<div>
			<h1>投稿</h1>
			<table className="table-auto border-collapse border border-gray-500">
				<thead>
					<tr>
						<th className="border border-gray-500 px-4 py-2">科目番号</th>
						<th className="border border-gray-500 px-4 py-2">科目名</th>
						<th className="border border-gray-500 px-4 py-2">単位数</th>
						<th className="border border-gray-500 px-4 py-2">標準年次</th>
						<th className="border border-gray-500 px-4 py-2">学期</th>
						<th className="border border-gray-500 px-4 py-2">時期</th>
					</tr>
				</thead>
				<tbody>
					{
						(function () {
							const list = []
							for (let i = 0; i < reviews.length; i++) {
								list.push(Object.values(reviews[i]));	// Object型の投稿をそれぞれ配列に格納
							}
							return (list.map((row, index) => {
								const url= `/reviews/${row[0]}`
								// 配列それぞれの要素を出力
								return <tr key={index}>
										<td className="border border-gray-500 px-4 py-2">{row[0]}</td>
										<td className="border border-gray-500 px-4 py-2"><Link href={url}>{row[1]}</Link></td>
										<td className="border border-gray-500 px-4 py-2">{row[2]}</td>
										<td className="border border-gray-500 px-4 py-2">{row[3]}</td>
										<td className="border border-gray-500 px-4 py-2">{row[4]}</td>
										<td className="border border-gray-500 px-4 py-2">{row[5]}</td>
									</tr>;
							})
							);
						}())
					}
				</tbody>
			</table>
		</div>
	)
}