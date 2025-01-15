import Image from "next/image";
import Review from './_components/review'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start md:w-3/5">
        <Image
            src="/images/icon_suppon_transparent.png"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
        />
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg dark:text-white dark:bg-gray-800">
          <p className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] mb-4">
            「授業に出席があるか知りたいな...」<br />
            筑波大学開講の講座に関して、授業の出席が必要か教えてくれるサービスです。<br />
          </p>
          <p className="italic text-lg mb-6"> 
            「家でスッポンポンでも大丈夫！出席ないからね！」 
          </p>
          <div className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <span className="font-bold text-lg text-yellow-500">＜使い方＞</span><br />
            <ul className="list-decimal list-inside ml-4 mt-2 space-y-2">
              <li>検索バーで授業を検索し、授業の出席情報を確認することができます。</li>
              <li>授業のアイテムを押すことでその授業の詳細ページに移ることができます。</li>
              <li>出席情報の投稿は右上の「投稿はこちら」のボタン、もしくは「出席あった！」のボタンからお願いします。</li>
              <li>Google Chrome拡張機能を用いることでmanaba上からアクセスできるようになります。<br />（リンクのファイルをダウンロードして解凍し、「パッケージ化されていない拡張機能を読み込む」から読み込んでください。）</li>
              <a href="https://drive.google.com/drive/folders/1JwBDV8Bib0Idq5OPODv_3vAgBAdfG7BV?usp=sharing" target="_blank" className="text-blue-500">拡張機能のリンクはこちら</a>
            </ul>
          </div>
        </div>
        <Review />
      </main>
      <aside>
        <Image
          src="/images/pr1.png"
          alt="Sample image 1"
          width={200}
          height={200}
        />
        <Image
          src="/images/pr2.png"
          alt="Sample image 2"
          width={200}
          height={200}
        />
        <Image
          src="/images/pr3.png"
          alt="Sample image 3"
          width={200}
          height={200}
        />
      </aside>
    </div>
  );
}
