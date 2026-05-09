"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function RegisterSuccessPage() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white shadow p-8 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          {lang === "zh" ? "注册成功" : "Registration Successful"}
        </h1>

        <p className="text-gray-600 mb-6">
          {lang === "zh"
            ? "您的邮箱已验证成功，现在可以登录。"
            : "Your email has been verified successfully. You can now log in."}
        </p>

        <Link
          href="/login"
          className="inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
        >
          {lang === "zh" ? "去登录" : "Go to Login"}
        </Link>
      </div>
    </main>
  );
}
