import { GET } from '../(api)/api-db/route';

interface Review {
  class_id: string;
  comment: string;
  attend: number;
  class_name: string;
}

export async function Dammy_table() {
	const response = await GET();
  const reviews: Review[] = await response.json();

	//console.log('%o', reviews);
  //console.log('%o', typeof(reviews));

    return (
      <div>
        <h1>ダミーテーブル</h1>
        <table className="table-auto border-collapse border border-gray-500">
        <thead>
          <tr>
            <th className="border border-gray-500 px-4 py-2">科目番号</th>
            <th className="border border-gray-500 px-4 py-2">科目名</th>
            <th className="border border-gray-500 px-4 py-2">出席</th>
            <th className="border border-gray-500 px-4 py-2">コメント</th>
          </tr>
        </thead>
        <tbody>
          {
            (function () {
              const list=[]
              for (let i = 0; i < reviews.length; i++) {
                list.push(Object.values(reviews[i]));
              }
              console.log('%o', list)
              return list.map((row, index) => {
                return <tr key={index}>
                        <td className="border border-gray-500 px-4 py-2">{row[0]}</td>
                        <td className="border border-gray-500 px-4 py-2">{row[3]}</td>
                        <td className="border border-gray-500 px-4 py-2">{row[2]}</td>
                        <td className="border border-gray-500 px-4 py-2">{row[1]}</td>
                      </tr>;
              })
            }())
          }
        </tbody>
      </table>
    </div>
    )
}