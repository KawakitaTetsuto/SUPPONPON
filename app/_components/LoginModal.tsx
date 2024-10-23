"use client"; // クライアントコンポーネント

import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null; // モーダルが閉じている場合は何も表示しない

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">ログイン</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">ユーザー名</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none"
              placeholder="ユーザー名を入力"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">パスワード</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded focus:outline-none"
              placeholder="パスワードを入力"
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            ログイン
          </button>
        </form>
        <button
          className="mt-4 text-red-500"
          onClick={onClose} // 閉じるボタン
        >
          閉じる
        </button>
      </div>
    </div>
  );
}
