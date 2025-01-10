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
  const [selectedOptions, setSelectedOptions] = useState<number[]>([0, 0, 0, 0, 0]); // 初期値はすべて 0

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const clickId = event.currentTarget as HTMLButtonElement;
    setClick2(clickId);
  };

  const handleOptionChange = (index: number) => {
    setSelectedOptions((prev) =>
      prev.map((value, i) => (i === index ? (value === 0 ? 1 : 0) : value)) // 該当インデックスのみトグル
    );
  };

  useEffect(() => {
    const Create_json = async () => {
      if (click2 != null) {
        const data = {
          'class_id': props.classid,
          'comment': "one click attend!",
          'attend': 1,
          'options': selectedOptions,
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
          <h1 className="text-xl font-bold mb-5">thank you!!<br />詳細もわかれば押してください!</h1>
          <form action="">
          <ul className="grid w-full gap-4 grid-cols-1 text-sm mb-6">
                    {[props.classid+"option1", props.classid+"option2", props.classid+"option3", props.classid+"option4", props.classid+"option5"].map((option,index) => (
                        <li key={option}>
                            <input
                              type="checkbox"
                              id={option}
                              name={option}
                              className="hidden peer"
                              checked={selectedOptions[index] === 1} // 配列の値に基づいて選択状態を設定
                              onChange={() => handleOptionChange(index)} // 状態を更新
                            />
                            <label
                                htmlFor={option}
                                className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-yellow-500 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-white peer-checked:bg-yellow-500 dark:text-gray-400 peer-checked:font-medium"
                            >
                                <div className="block">
                                    {option === props.classid+"option1" && "responあり"}
                                    {option === props.classid+"option2" && "点呼あり"}
                                    {option === props.classid+"option3" && "小テスト（対面）"}
                                    {option === props.classid+"option4" && "小テスト（manaba）"}
                                    {option === props.classid+"option5" && "穴うめの授業資料"}
                                </div>
                            </label>
                        </li>
                    ))}
                </ul>
            </form>
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
