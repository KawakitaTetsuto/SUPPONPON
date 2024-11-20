'use client'

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
      <ShowClass 
        inputResult={inputState}
      />
    </>
  );
}