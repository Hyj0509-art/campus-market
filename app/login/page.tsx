"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";
import { texts } from "@/lib/i18n";

export default function LoginPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = texts[lang];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err?.message || t.loginFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl bg-white shadow p-6"
      >
        <h1 className="text-2xl font-bold mb-4">{t.login}</h1>

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

        <button
          disabled={loading}
          className="w-full rounded-xl bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? t.loggingIn : t.login}
        </button>

        <div className="mt-4 text-sm text-gray-600">
          {t.noAccount}{" "}
          <a className="text-green-700 font-semibold" href="/register">
            {t.goRegister}
          </a>
        </div>
      </form>
    </main>
  );
}
