"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";
import { texts } from "@/lib/i18n";

type ItemType = {
  id: number;
  title: string;
  description?: string;
  price: string;
  type: string;
  image: string;
  seller?: string;
  contact?: string;
  created_at?: string;
};

export default function HomePage() {
  const router = useRouter();
  const { lang, toggleLang } = useLanguage();
  const t = texts[lang];

  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [cameraOpen, setCameraOpen] = useState(false);
  const cameraUrl = "http://192.168.243.156";

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    const initUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserEmail(data.user?.email ?? null);
    };
    initUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserEmail(session?.user?.email ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const loadItems = async () => {
    try {
      const { data: dbItems, error } = await supabase
        .from("items")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && dbItems) {
        setItems(dbItems);
      } else {
        setItems([]);
      }
    } catch (err) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-500">{t.loading}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="fixed right-6 top-6 z-40 flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          onClick={toggleLang}
          className="rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-gray-200 hover:bg-white"
        >
          {lang === "zh" ? "EN" : "中文"}
        </button>

        {userEmail ? (
          <>
            <div className="rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-gray-200">
              {userEmail}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-gray-200 hover:bg-white"
            >
              {t.logout}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-gray-200 hover:bg-white"
            >
              {t.login}
            </button>
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-gray-200 hover:bg-white"
            >
              {t.register}
            </button>
          </>
        )}
      </div>

      {cameraOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setCameraOpen(false)}
        >
          <div
            className="relative h-screen w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setCameraOpen(false)}
              className="absolute left-3 top-3 z-10 rounded-lg bg-white/90 px-3 py-1 text-sm font-medium text-gray-700 ring-1 ring-gray-200 hover:bg-white"
            >
              {t.close}
            </button>

            <iframe
              title={t.camera}
              src={cameraUrl}
              className="h-full w-full"
              style={{ border: "none" }}
            />
          </div>
        </div>
      )}

      <section className="bg-green-600 px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 text-4xl font-bold">{t.title}</h1>
          <p className="mb-6 text-lg text-green-50">{t.subtitle}</p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/sell"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-green-600 shadow hover:bg-gray-100"
            >
              {t.sell}
            </Link>

            <Link
              href="/my-items"
              className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white shadow hover:bg-green-800"
            >
              {t.myItems}
            </Link>

            <button
              type="button"
              onClick={() => setCameraOpen(true)}
              className="rounded-xl border border-white px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              {t.camera}
            </button>

            <Link
              href="/notices/camera-box"
              className="rounded-xl border border-white px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              notices
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-6">
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          {searchQuery
            ? `${t.searchResults} (${filteredItems.length})`
            : t.latestItems}
        </h2>

        {filteredItems.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <p className="text-gray-500">
              {searchQuery ? t.noMatch : t.noItems}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Link href={`/items/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-48 w-full object-cover"
                  />
                </Link>

                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.type === "出售"
                          ? "bg-orange-100 text-orange-600"
                          : item.type === "借用"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.type === "出售"
                        ? t.sellType
                        : item.type === "借用"
                        ? t.borrowType
                        : item.type}
                    </span>
                  </div>

                  <Link href={`/items/${item.id}`}>
                    <h3 className="mb-2 text-lg font-semibold text-gray-800 hover:text-green-600">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="mb-4 line-clamp-2 text-sm text-gray-500">
                    {item.description || t.noDescription}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}