import React from 'react';

export type ModalProps = {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  classid: string;
};

const Modal = (props: ModalProps) => {
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
          <h1 className="text-xl font-bold mb-5">あてはまるタグがあれば選択してください</h1>
          <form action="">
          <ul className="grid w-full gap-4 grid-cols-1 text-sm mb-6">
                    {["option1", "option2", "option3", "option4", "option5"].map((option) => (
                        <li key={option}>
                            <input
                                type="checkbox"
                                id={option}
                                name={option}
                                value="1"
                                className="hidden peer"
                            />
                            <label
                                htmlFor={option}
                                className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-yellow-500 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-white peer-checked:bg-yellow-500 dark:text-gray-400 peer-checked:font-medium"
                            >
                                <div className="block">
                                    {option === "option1" && "responあり"}
                                    {option === "option2" && "点呼あり"}
                                    {option === "option3" && "小テスト（対面）"}
                                    {option === "option4" && "小テスト（manaba）"}
                                    {option === "option5" && "穴うめの授業資料"}
                                </div>
                            </label>
                        </li>
                    ))}
                </ul>
            </form>
          <div className="flex mt-auto w-full">
            <button
              className="bg-slate-900 hover:bg-slate-700 text-white px-8 py-2 mx-auto"
              onClick={() => props.onOk()}
            >
              送信
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
