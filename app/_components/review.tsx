'use client'

import { useState} from "react";
import { Dammy_table } from "./Dammy_table";
import Form from "./form";
import SearchForm from "./searchForm";

export default function Reivew(){
  const [inputState, setInputState] = useState("");

  return (
    <>
      <SearchForm 
        inputState={setInputState}
      />
      <Form />
      <Dammy_table 
        inputResult={inputState}
      />
    </>
  );
}