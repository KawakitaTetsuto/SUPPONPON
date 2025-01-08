import { useEffect, useState } from 'react';
import Link from 'next/link';
import OneClickAttendButton from './oneClickAttendButton';

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
	inputResult: string;
};

export function ShowClass({ inputResult }: ShowClassProps) {
	// 授業情報を保存するためのStateを宣言
	const [reviews, setReviews] = useState<Class[]>([]);
	const [click, setClick] = useState<HTMLButtonElement | null>(null);
	const [isDataLoaded, setIsDataLoaded] = useState(false); // データ取得完了フラグ

	// 検索内容を依存配列に持つUseEffectの宣言
	useEffect(() => {
		// データ取得前にローディング表示
		setIsDataLoaded(false);
		setReviews([]); // 既存の結果をリセット

		// コールバック内でfetchを呼び出して授業情報を取得
		const fetchReviewData = async () => {
			try {
				let response;
				if (inputResult === "") {
					response = await fetch('/api-db/search-class?keyword=');
				} else {
					response = await fetch(`/api-db/search-class?keyword=${inputResult}`);
				}
				const data = await response.json();
				setReviews(data);
				setIsDataLoaded(true); // データ取得完了フラグをtrueに設定
			} catch (error) {
				console.error("Failed to fetch user data:", error);
				setIsDataLoaded(true); // エラー発生時も完了フラグをtrueに設定
			}
		};

		fetchReviewData();
	}, [inputResult]);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const clickId = event.currentTarget as HTMLButtonElement;
		event.currentTarget.innerText = 'thank you!';
		setClick(clickId);
	};

	useEffect(() => {
		const Create_json = async () => {
			if (click != null) {
				const class_id = click.id;
				const data = {
					'class_id': class_id,
					'comment': "one click attend!",
					'attend': 1,
					'options': [0, 0, 0, 0, 0],
					'created_at': Date(),
					'user_id': 0,
				};
				await fetch('/api-db/json_post', {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				});
			}
		};

		Create_json();
	}, [click]);

	return (
		<>
			{/* ローディング表示 */}
			{!isDataLoaded ? (
				<div className="mt-4 flex items-center justify-center">
					<div className="animate-spin h-5 w-5 border-4 border-yellow-500 border-t-transparent rounded-full"></div>
					<span className="ml-2 text-yellow-700">Loading...</span>
				</div>
			) : (
				<div className='w-full'>
					<h1>授業</h1>
					<div className='flex flex-wrap'>
						{reviews.length === 0 ? (
							<p className="text-center w-full">該当する授業はありませんでした。</p>
						) : (
							reviews.map((review, index) => {
								const url = `/reviews/${review.id}`;
								return (
									<>
										<div className='basis-full md:basis-1/2 p-2' key={index}>
											<Link href={url} target='_blank'>
												<div className='border-2 rounded-md p-2 border-gray-400'>
													<span className='text-gray-500 font-xs mb-0 pb-0 dark:text-gray-400'>{review.id}</span>
													<h2 className='font-medium text-xl mt-0 pt-0'>{review.name}</h2>
													<div className='text-gray-600 font-sm pl-3 dark:text-gray-400'>
														<span className='mr-3'>
															{review.credit}単位
														</span>
														<span className='mr-3'>
															{review.grade}年次
														</span>
														<span className='mr-3'>
															{review.season} {review.date}
														</span>
													</div>
													<div className='pl-3 pt-1'>
														<span className={review.attend_metrics === 0 ? 'bg-yellow-300 p-1 mr-2 dark:text-black' : 'bg-red-300 p-1 mr-2 dark:text-black'}>出席</span>
														<span>{review.attend_metrics === 1 ? "あり" : "なし"}</span>
													</div>
												</div>
											</Link>
											<div className="pl-3 pt-1 flex justify-end">
												<button
													id={review.id}
													className="px-3 py-1 text-black bg-amber-300 rounded-md hover:bg-amber-400 active:bg-amber-500 transition-transform transform hover:scale-105 active:scale-95"
													onClick={handleClick}
												>
													出席あった！
												</button>
												<OneClickAttendButton
													classid={review.id}
												/>
											</div>
										</div>
									</>
								)
							})
						)}
					</div>
				</div>
			)}
		</>
	);
}
