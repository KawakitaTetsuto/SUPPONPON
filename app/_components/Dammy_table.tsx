import { GET } from '../(api)/api-db/route';

export async function Dammy_table() {
	const reviews = await GET()
	//console.log('%o', reviews)

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
        {reviews.map((row, index) => {
          return <tr>
                  <td className="border border-gray-500 px-4 py-2" key={row.class_id}>{row.class_id}</td>
                  <td className="border border-gray-500 px-4 py-2"key={row.class_name}>{row.class_name}</td>
                  <td className="border border-gray-500 px-4 py-2"key={row.attend}>{row.attend}</td>
                  <td className="border border-gray-500 px-4 py-2"key={row.comment}>{row.comment}</td>
                </tr>;
        })}
        </tbody>
      </table>
    </div>
    )
}