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

type Dammy_tableProps = {
  inputResult: string
};

export function Dammy_table({ inputResult }: Dammy_tableProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  
  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        let response
        if ( inputResult === ""){
          response = await fetch('/api-db')
        } else{
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
        <h1>投稿</h1>
        <table className="table-auto border-collapse border border-gray-500">
        <thead>
          <tr>
            <th className="border border-gray-500 px-4 py-2">科目番号</th>
            <th className="border border-gray-500 px-4 py-2">科目名</th>
            <th className="border border-gray-500 px-4 py-2">出席</th>
            <th className="border border-gray-500 px-4 py-2">コメント</th>
            <th className="border border-gray-500 px-4 py-2">投稿日</th>
          </tr>
        </thead>
        <tbody>
          {
            (function () {
              const list=[]
              for (let i = 0; i < reviews.length; i++) {
                list.push(Object.values(reviews[i]));
              }
              //console.log('%o', list)
              return list.map((row, index) => {
                return <tr key={index}>
                        <td className="border border-gray-500 px-4 py-2">{row[1]}</td>
                        <td className="border border-gray-500 px-4 py-2">{row[6]}</td>
                        <td className="border border-gray-500 px-4 py-2">{row[3]}</td>
                        <td className="border border-gray-500 px-4 py-2">{row[2]}</td>
                        <td className="border border-gray-500 px-4 py-2">{formatDate(row[4])}</td>
                      </tr>;
              })
            }())
          }
        </tbody>
      </table>
    </div>
    )
}