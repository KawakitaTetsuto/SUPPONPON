"use client"; // クライアントコンポーネント

import { useState } from "react";
import LoginModal from "./LoginModal"; // モーダルをインポート

export default function LoginButton() {
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの開閉状態を管理

  return (
    <>
      <button
        className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
        onClick={() => setIsModalOpen(true)} // ボタンがクリックされたらモーダルを開く
      >
        ログイン

      </button>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> 
      {/* モーダルを表示 */}
    </>
  );
}
