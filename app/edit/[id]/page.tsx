"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
};

export default function EditItemPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params?.id);

  const { lang } = useLanguage();
  const t = texts[lang];

  const [form, setForm] = useState<ItemType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const { data, error } = await supabase
          .from("items")
          .select("*")
          .eq("id", id)
          .single();

        if (!error && data) {
          console.log("✅ 找到物品:", data);
          setForm(data);
        } else {
          console.log("❌ 物品不存在");
          alert(t.itemNotFoundAlert);
          router.push("/my-items");
        }
      } catch (err) {
        console.log("❌ 查询错误:", err);
        alert(t.loadItemFailed);
        router.push("/my-items");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadItem();
    }
  }, [id, router, t.itemNotFoundAlert, t.loadItemFailed]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!form) return;
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    setSaving(true);

    try {
      const { error } = await supabase
        .from("items")
        .update({
          title: form.title,
          description: form.description,
          price: form.price,
          type: form.type,
          image: form.image,
          seller: form.seller,
          contact: form.contact,
        })
        .eq("id", id);

      if (!error) {
        alert(t.updateSuccess);
        router.push("/my-items");
      } else {
        alert(t.updateFailed);
        console.log(error);
      }
    } catch (err) {
      alert(t.updateError);
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
          <p className="text-gray-500">{t.loading}</p>
        </div>
      </main>
    );
  }

  if (!form) {
    return (
      <main className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
          <p className="text-gray-500">{t.itemNotExist}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">{t.editItem}</h1>
        <p className="mb-8 text-gray-500">{t.editItemDesc}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t.productTitle}
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t.productDescription}
            </label>
            <textarea
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t.priceLabel}
              </label>
              <input
                type="text"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t.typeLabel}
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
              >
                <option value="出售">{t.sellType}</option>
                <option value="借用">{t.borrowType}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t.imageLink}
            </label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
              required
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t.sellerNickname}
              </label>
              <input
                type="text"
                name="seller"
                value={form.seller || ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t.contactLabel}
              </label>
              <input
                type="text"
                name="contact"
                value={form.contact || ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700 disabled:opacity-50"
            >
              {saving ? t.saving : t.saveChanges}
            </button>

            <button
              type="button"
              onClick={() => router.push("/my-items")}
              className="rounded-xl bg-gray-200 px-6 py-3 font-medium text-gray-700 hover:bg-gray-300"
            >
              {t.cancel}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
