'use client'
import Image from "next/image";
import { useState} from "react";
import { ShowClass } from "./SearchClass";
import SearchForm from "./searchForm";

export default function Reivew(){
  // 検索内容を格納するためのStateを宣言
  const [inputState, setInputState] = useState("");

  return (
    <>
      <SearchForm 
        inputState={setInputState}
      />

      <Image
        src="/images/pr1.png"
        className="md:hidden"
        alt="広告 1"
        width={200}
        height={200}
      />
      
      <ShowClass 
        inputResult={inputState}
      />
    </>
  );
}