import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/images/icon_suppon.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]" > SUPPONPON </h1>
        <p className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        「授業に出席があるか知りたいな...」
        そんな引きこもりがちな筑波大生に向けて...
        筑波大学開講の講座に関して、授業の出席が必要か教えてくれるサービスです。
        過去に履修した先輩の情報をもとに授業の出席についての情報を確認することができます。
        A+つくばやシラバスとは違って出席に特化し、ポイント制など情報を登録したくなる機能が備わっています。
        </p>
        <p> 「家でスッポンポンでも大丈夫！出席ないからね！」</p>

        <table className="table-auto border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-500 px-4 py-2">科目番号</th>
              <th className="border border-gray-500 px-4 py-2">科目名</th>
              <th className="border border-gray-500 px-4 py-2">出席</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-500 px-4 py-2">GC54301</td>
              <td className="border border-gray-500 px-4 py-2">情報可視化</td>
              <td className="border border-gray-500 px-4 py-2">なし</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-4 py-2">2234273</td>
              <td className="border border-gray-500 px-4 py-2">応用体育　バスケットボール</td>
              <td className="border border-gray-500 px-4 py-2">あり</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-4 py-2">GC51901</td>
              <td className="border border-gray-500 px-4 py-2">マークアップ言語</td>
              <td className="border border-gray-500 px-4 py-2">なし</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-4 py-2">GC52901</td>
              <td className="border border-gray-500 px-4 py-2">インタラクションデザイン</td>
              <td className="border border-gray-500 px-4 py-2">あり</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-4 py-2">GC22201</td>
              <td className="border border-gray-500 px-4 py-2">プログラム言語論</td>
              <td className="border border-gray-500 px-4 py-2">なし</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-4 py-2">GB40301</td>
              <td className="border border-gray-500 px-4 py-2">ヒューマンインタフェース</td>
              <td className="border border-gray-500 px-4 py-2">あり</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-4 py-2">GE70601</td>
              <td className="border border-gray-500 px-4 py-2">Webプログラミング</td>
              <td className="border border-gray-500 px-4 py-2">なし</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-4 py-2">GE70801</td>
              <td className="border border-gray-500 px-4 py-2">データ表現と処理</td>
              <td className="border border-gray-500 px-4 py-2">なし</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-4 py-2">GE70501</td>
              <td className="border border-gray-500 px-4 py-2">情報検索システム</td>
              <td className="border border-gray-500 px-4 py-2">あり</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-4 py-2">GE71001</td>
              <td className="border border-gray-500 px-4 py-2">情報デザインとインタフェース</td>
              <td className="border border-gray-500 px-4 py-2">あり</td>
            </tr>
          </tbody>
        </table>

      </main>
    </div>
  );
}
