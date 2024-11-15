"use client";

import { useState, ChangeEvent } from "react";

export default function Form() {
    // 型注釈を追加して、checkedTagsを文字列の配列とする
    const [isAttendChecked, setIsAttendChecked] = useState(false);
    const [checkedTags, setCheckedTags] = useState<string[]>([]);

    // ChangeEvent型を指定
    const handleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = event.target;
        const newCheckedTags = checked
            ? [...checkedTags, id]
            : checkedTags.filter((tag) => tag !== id);

        setCheckedTags(newCheckedTags);

        // タグが1つ以上選択されている場合、「出席あり」を自動でチェック
        if (newCheckedTags.length > 0) {
            setIsAttendChecked(true);
        }
    };

    return (
        <div>
            <h1>投稿フォーム</h1>

            <form action="/api-db" method="post">
                <div className="mb-6">
                    <label htmlFor="class_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">科目番号</label>
                    <input
                        type="text"
                        id="class_id"
                        className="md:w-1/2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent dark:border-white-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="class_id"
                        required
                    />
                </div>

                <div className="flex gap-10 mb-6">
                    <div className="inline-flex items-center">
                        <label className="relative flex items-center cursor-pointer" htmlFor="attend_yes">
                            <input
                                name="attend"
                                type="radio"
                                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 dark:border-white-600 checked:border-slate-400 dark:checked:border-white-600 transition-all"
                                id="attend_yes"
                                value="1"
                                checked={isAttendChecked}
                                onChange={() => setIsAttendChecked(true)}
                            />
                            <span className="absolute bg-yellow-500 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                        </label>
                        <label className="ml-2 cursor-pointer text-sm" htmlFor="attend_yes">出席あり</label>
                    </div>

                    <div className="inline-flex items-center">
                        <label className="relative flex items-center cursor-pointer" htmlFor="attend_no">
                            <input
                                name="attend"
                                type="radio"
                                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 dark:border-white-600 checked:border-slate-400 dark:checked:border-white-600 transition-all"
                                id="attend_no"
                                value="0"
                                checked={!isAttendChecked}
                                onChange={() => setIsAttendChecked(false)}
                            />
                            <span className="absolute bg-yellow-500 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                        </label>
                        <label className="ml-2 cursor-pointer text-sm" htmlFor="attend_no">出席なし</label>
                    </div>
                </div>

                <h2 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">タグを選択</h2>
                <ul className="grid w-full gap-4 grid-cols-2 md:grid-cols-3 text-sm mb-6">
                    {["option1", "option2", "option3", "option4", "option5"].map((option) => (
                        <li key={option}>
                            <input
                                type="checkbox"
                                id={option}
                                name={option}
                                value="1"
                                className="hidden peer"
                                onChange={handleTagChange}
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

                <div className="mb-6">
                    <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">コメント</label>
                    <textarea
                        id="comment"
                        className="md:w-1/2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent dark:border-white-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="comment"
                    />
                </div>

                <button
                    type="submit"
                    className="text-white bg-yellow-500 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full w-auto px-5 py-2.5 text-center"
                >
                    投稿する
                </button>
            </form>
        </div>
    );
}
