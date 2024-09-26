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

      </main>
    </div>
  );
}
