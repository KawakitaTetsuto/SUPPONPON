import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type inputs = {
    inputState: Dispatch<SetStateAction<string>>,
    inputSeason: Dispatch<SetStateAction<string>>,
    inputTerm: Dispatch<SetStateAction<string>>
}

export default function SearchForm({inputState, inputSeason, inputTerm}: inputs) {
    const [form, setForm] = useState("");
    const [season, setSeason] = useState("0");
    const [term, setTerm] = useState("0");

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        inputState(form);
        inputSeason(season);
        inputTerm(term);
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(e.currentTarget.value);
    }

    const handleSeasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeason(e.target.value);
    };

    const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
    };

    return (
        <div>
            <h1>検索する</h1>
            <form onSubmit={(e) => {submit(e)}}>
            <div
                className="relative flex"
                data-twe-input-wrapper-init
                data-twe-input-group-ref
                id="form-div">
                <input
                    type="search"
                    className="peer block min-h-[auto] w-full rounded border border-gray-300 text-gray-900 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                    placeholder="授業名か科目番号を入力"
                    aria-label="Search"
                    id="exampleFormControlInput"
                    name="class_name"
                    aria-describedby="basic-addon1"
                    onChange={handleSearchChange}
                     />
                <button
                    className="relative z-[2] -ms-0.5 flex items-center rounded-e bg-primary px-5  text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong bg-yellow-500 hover:bg-yellow-700"
                    type="submit"
                    id="button-addon1"
                    data-twe-ripple-init
                    data-twe-ripple-color="light">
                    <span className="[&>svg]:h-5 [&>svg]:w-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </span>
                </button>
            </div>
                <div className="flex flex-row space-x-3 pt-3">
                    <div className="">
                        学期を選択
                    </div>
                    <label className="block pl-5">
                        <input
                        type="radio"
                        value="0"
                        checked={season[0] === "0"}
                        onChange={handleSeasonChange}
                        />
                        指定なし
                    </label>
                    <label className="block">
                        <input
                        type="radio"
                        value="1"
                        checked={season[0] === "1"}
                        onChange={handleSeasonChange}
                        />
                        春
                    </label>
                    <label className="block">
                        <input
                        type="radio"
                        value="2"
                        checked={season[0] === "2"}
                        onChange={handleSeasonChange}
                        />
                        秋
                    </label>
                    <div className="">
                        /
                    </div>
                    <label className="block">
                        <input
                        type="radio"
                        value="0"
                        checked={term[0] === "0"}
                        onChange={handleTermChange}
                        />
                        指定なし
                    </label>
                    <label className="block">
                        <input
                        type="radio"
                        value="1"
                        checked={term[0] === "1"}
                        onChange={handleTermChange}
                        />
                        A
                    </label>
                    <label className="block">
                        <input
                        type="radio"
                        value="2"
                        checked={term[0] === "2"}
                        onChange={handleTermChange}
                        />
                        B
                    </label>
                    <label className="block">
                        <input
                        type="radio"
                        value="3"
                        checked={term[0] === "3"}
                        onChange={handleTermChange}
                        />
                        C
                    </label>
                </div>
            </form>


        </div>
    )
}