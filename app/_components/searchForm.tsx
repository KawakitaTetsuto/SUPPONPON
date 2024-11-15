import { Dispatch, FormEvent, SetStateAction, useRef } from "react";

export default function SearchForm(props: { inputState: Dispatch<SetStateAction<string>>}) {
    const { inputState } = props;
    const inputRef = useRef<HTMLInputElement>(null!);

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        inputState(inputRef.current!.value);
    }

    return (
        <div>
            <h1>検索する</h1>
            <form onSubmit={(e) => {submit(e)}}>
            <div
                className="relative flex"
                data-twe-input-wrapper-init
                data-twe-input-group-ref>
                <input
                    type="search"
                    className="peer block min-h-[auto] w-full rounded border border-gray-300 text-gray-900 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                    placeholder="授業名を入力"
                    aria-label="Search"
                    id="exampleFormControlInput"
                    name="class_name"
                    aria-describedby="basic-addon1"
                    ref={inputRef}
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
            </form>


        </div>
    )
}