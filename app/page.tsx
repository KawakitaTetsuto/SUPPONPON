import Image from "next/image";
import { Dammy_table } from "./_components/Dammy_table";
import Form from "./_components/form";
import SearchForm from "./_components/searchForm";

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
        <p className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          「授業に出席があるか知りたいな...」<br />
          筑波大学開講の講座に関して、授業の出席が必要か教えてくれるサービスです。<br />
          過去に履修した先輩の情報をもとに授業の出席についての情報を確認することができます。<br />
        </p>
        <p className="italic"> 「家でスッポンポンでも大丈夫！出席ないからね！」</p>
        <SearchForm />
        <Form />
        <Dammy_table />
      </main>
    </div>
  );
}
