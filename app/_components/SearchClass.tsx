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
												<div className='relative'>
												<div className='border-2 rounded-md p-2 border-gray-400 shadow-md duration-200 ease-linear hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700'>
													<div className='relative'>
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
														<span className={review.attend_metrics === 0 ? 'bg-yellow-300 p-1 mr-2 dark:text-black' : review.attend_metrics === 1 ? 'bg-red-300 p-1 mr-2 dark:text-black' : 'bg-gray-300 p-1 mr-2 dark:text-black'}>出席</span>
														<span>{review.attend_metrics === 1 ? "あり" : review.attend_metrics === 0 ? "なし": "投稿なし"}</span>
													</div>
													<div className='absolute top-1/2 right-0'>
														<svg className="icon stroke-black dark:stroke-white dark:fill-white" viewBox="0 0 24 24">
                											
															<polygon points="8,4 16,12 8,20" />
              											</svg>
													</div>
												</div>
												</div>
												</div>
											</Link>
											<div className="pl-3 pt-1 flex justify-end">
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
