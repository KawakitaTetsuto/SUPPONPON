'use client';
import { useEffect, useState } from 'react';

interface Review {
  id: number;
  class_id: string;
  comment: string;
  attend: number;
  created_at: string;
  user_id: number;
  class_name: string;
}

type Show_reviewsProps = {
  inputResult: string
};

export function Show_reviews({ inputResult }: Show_reviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        let response
        if (inputResult === "") {
          response = await fetch('/api-db')
        } else {
          response = await fetch(`/api-db/search-review?id=${inputResult}`)
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchReviewData();
    console.log('%o', inputResult)
  }, [inputResult]);
  //console.log('%o', typeof(reviews));

  // 日付を yyyy/mm/dd 形式にフォーマットする関数
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0から始まるので+1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
      <div>
        <h1>コメント</h1>
            {
              (function () {
                const list=[]
                for (let i = 0; i < reviews.length; i++) {
                  list.push(Object.values(reviews[i]));
                }
                //console.log('%o', list)
                return list.map((row, index) => {
                  if (row[2] != ""){
                  return <>
                  <div key={index} className='bg-gray-100 p-3 m-3 rounded-lg dark:text-black'>
                  <span className='inline-block text-gray-500'>{formatDate(row[9])}</span><br/>
                  {row[2]}
                  <div>
                  { row[4] === 1 && <span className='text-blue-600 ml-8 inline-block'>#responあり</span>}
                  { row[5] === 1 && <span className='text-blue-600 ml-8 inline-block'>#点呼あり</span>}
                  { row[6] === 1 && <span className='text-blue-600 ml-8 inline-block'>#小テスト(対面)あり</span>}
                  { row[7] === 1 && <span className='text-blue-600 ml-8 inline-block'>#小テスト(manaba)あり</span>}
                  { row[8] === 1 && <span className='text-blue-600 ml-8 inline-block'>#穴埋めの授業資料あり</span>}
                  </div>
                </div>
                </>;
                  }
                })
              }())
            }
      </div>
    )
}