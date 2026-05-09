"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";
import { texts } from "@/lib/i18n";

const emailReg = /^[^@\s]+@student\.xjtlu\.edu\.cn$/;

export default function RegisterPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = texts[lang];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setOkMsg(null);

    if (!emailReg.test(email)) {
      setErrorMsg(t.emailFormatError);
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "http://localhost:3000/register-success",
        },
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      setOkMsg(
        lang === "zh"
          ? "注册成功，请前往邮箱点击验证链接。"
          : "Registration successful. Please check your email and click the verification link."
      );
    } catch (err: any) {
      setErrorMsg(err?.message || t.registerFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-2xl bg-white shadow p-6"
      >
        <h1 className="text-2xl font-bold mb-4">{t.register}</h1>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          {t.email}
        </label>
        <input
          className="w-full rounded-xl border border-gray-300 px-3 py-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="xxxxxx@student.xjtlu.edu.cn"
          type="email"
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          {t.password}
        </label>
        <input
          className="w-full rounded-xl border border-gray-300 px-3 py-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t.passwordPlaceholder}
          type="password"
          required
        />

        {errorMsg && (
          <p className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMsg}
          </p>
        )}
        {okMsg && (
          <p className="mb-4 rounded-xl bg-green-50 px-3 py-2 text-sm text-green-700">
            {okMsg}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? t.registering : t.register}
        </button>

        <div className="mt-4 text-sm text-gray-600">
          {t.hasAccount}{" "}
          <a className="text-green-700 font-semibold" href="/login">
            {t.goLogin}
          </a>
        </div>
      </form>
    </main>
  );
}
