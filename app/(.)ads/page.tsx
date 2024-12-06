export default function Adv_form() {

    return (
        <div>
            <h1 className="block mt-20 text-3xl font-medium text-gray-900vdark:text-white"> 広告申請フォーム </h1>
            <form >
                <div>
                    <label htmlFor="img" className="block mt-5 text-m font-medium text-gray-900 dark:text-white">広告画像をアップロード(.png,.jpg,.jpeg,.gifのみ対応)</label>
                    <input id="img" type="file" accept="image/*,.png,.jpg,.jpeg,.gif" className="block w-related h-10 text-sm text-gray-700 bg-gray-200 rounded-lg border border-gray-300 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-white file:bg-yellow-600 hover:file:bg-yellow-700"/>
                </div>
                <label htmlFor="url">画像に埋め込むURLを指定してください</label>
                <input id="url" type="url" className="md:w-1/2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent dark:border-white-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                <input type="button" className="text-white bg-yellow-500 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-40 w-auto px-5 py-2.5 text-center" value="申請"/>
            </form>
        </div>
    )
}