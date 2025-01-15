'use client'
import Image from "next/image";
import { useState} from "react";
import { ShowClass } from "./SearchClass";
import SearchForm from "./searchForm";

export default function Reivew(){
  // 検索内容を格納するためのStateを宣言
  const [inputState, setInputState] = useState("");
  const [inputSeason, setInputSeason] = useState("0");
  const [inputTerm, setInputTerm] = useState("0");

  return (
    <>
      <SearchForm 
        inputState={setInputState}
        inputSeason={setInputSeason}
        inputTerm={setInputTerm}
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
        inputSeason={inputSeason}
        inputTerm={inputTerm}
      />
    </>
  );
}