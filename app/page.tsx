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
        <p className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          「授業に出席があるか知りたいな...」<br />
          筑波大学開講の講座に関して、授業の出席が必要か教えてくれるサービスです。<br />
          過去に履修した先輩の情報をもとに授業の出席についての情報を確認することができます。<br />
        </p>
        <p className="italic"> 「家でスッポンポンでも大丈夫！出席ないからね！」</p>
        <Review />
        <Image
                src="/images/pr2.png"
                className="md:hidden"
                alt="広告 2"
                width={200}
                height={200}
              />
        <Image
                src="/images/pr3.png"
                className="md:hidden"
                alt="広告 3"
                width={200}
                height={200}
              />
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
