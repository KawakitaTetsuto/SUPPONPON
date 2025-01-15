'use client';
import { useEffect, useState } from 'react';
import React from 'react';

export type ModalProps = {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  classid: string;
};

const Modal = (props: ModalProps) => {

  const [click2, setClick2] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const clickId = event.currentTarget as HTMLButtonElement;
    setClick2(clickId);
  };

  useEffect(() => {
    const Create_json = async () => {
      if (click2 != null) {
        const data = {
          'class_id': props.classid,
          'comment': "one click No attend!",
          'attend': 0,
          'options': [0,0,0,0,0],
          'created_at': Date(),
          'user_id': 0,
        };
        await fetch('/api-db/json_post', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }
    };

    Create_json();
  }, [click2]);


  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-10 ${
          props.open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => props.onCancel()}
      ></div>

      <div
        className={`fixed inset-0 flex items-center justify-center transition-transform duration-300 z-20 ${
          props.open ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h1 className="text-xl font-bold mb-5">thank you!!</h1>
          <div className="flex mt-auto w-full">
            <button
              className="bg-slate-900 hover:bg-slate-700 text-white px-8 py-2 mx-auto"
              onClick={(event) => {
                handleClick(event);
                props.onOk();
              }}
            >
              送信
            </button>
            <button
              className="bg-slate-900 hover:bg-slate-700 text-white px-8 py-2 mx-auto"
              onClick={() => {
                props.onOk();
              }}
            >
              取り消し
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
