'use client'

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
      <ShowClass 
        inputResult={inputState}
        inputSeason={inputSeason}
        inputTerm={inputTerm}
      />
    </>
  );
}