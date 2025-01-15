'use client';
import React from 'react';
import { useState } from 'react';
import Modal from './modal_Noattend';

type OCAProps = {
	classid: string
};

export function OCA(props: OCAProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
    <>
        <div>

        {
        //出席なかったボタン
        }
        <button
          className="px-3 py-1 text-black bg-amber-300 rounded-md hover:bg-amber-400 active:bg-amber-500 transition-transform transform hover:scale-105 active:scale-95 block z-0"
          onClick={() => setIsOpen(true)}
        >
            出席なかった
        </button>

        {
            //Modalコンポーネントを呼び出してポップアップを表示
        }
        <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={() => setIsOpen(false)}
        classid = {props.classid}
      />

    </div>
    </>
  );
};

export default OCA;
