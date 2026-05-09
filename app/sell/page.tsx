"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";
import { texts } from "@/lib/i18n";
import FileUploader from "@/components/FileUploader";

export default function SellPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = texts[lang];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("出售");
  const [image, setImage] = useState("");
  const [seller, setSeller] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null); // ✅ 新增

  const defaultImage =
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80";

  // ✅ 新增：页面加载时检查登录状态
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("请先登录再发布物品");
        router.push("/login");
      } else {
        setUserId(user.id);
      }
    };
    checkUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      alert("请先登录");
      router.push("/login");
      return;
    }
    setLoading(true);

    try {
      const { error } = await supabase.from("items").insert([
        {
          title,
          description,
          price: type === "借用" ? t.borrowType : `¥${price}`,
          type,
          image: image || defaultImage,
          seller: seller || t.anonymousUser,
          contact: contact || t.noContact,
          user_id: userId, // ✅ 新增：写入当前用户ID
        },
      ]);

      if (error) {
        alert(t.postFailed);
        console.log("错误:", error);
      } else {
        alert(t.postSuccess);
        setTitle("");
        setDescription("");
        setPrice("");
        setType("出售");
        setImage("");
        setSeller("");
        setContact("");
        setTimeout(() => {
          router.push("/");
        }, 500);
      }
    } catch (err) {
      alert(t.postError);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 其余 JSX 完全不变，直接保留你原来的 return (...)
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">{t.postItem}</h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t.itemTitle}
            </label>
            <input
              type="text"
              placeholder={t.itemTitlePlaceholder}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t.itemDescription}
            </label>
            <textarea
              placeholder={t.itemDescriptionPlaceholder}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t.priceLabel}
            </label>
            <input
              type="text"
              placeholder={t.pricePlaceholder}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
              required={type === "出售"}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t.typeLabel}
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="type"
                  checked={type === "出售"}
                  onChange={() => setType("出售")}
                />
                {t.sellType}
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="type"
                  checked={type === "借用"}
                  onChange={() => setType("借用")}
                />
                {t.borrowType}
              </label>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              上传图片
            </label>
            <FileUploader
              bucket="item-media"
              accept="image/*"
              onUploaded={(url) => setImage(url)}
            />
            {image && (
              <div className="mt-3">
                <img
                  src={image}
                  alt="预览图"
                  className="h-40 w-full rounded-lg object-cover border"
                />
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t.sellerLabel}
            </label>
            <input
              type="text"
              placeholder={t.sellerPlaceholder}
              value={seller}
              onChange={(e) => setSeller(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t.contactLabel}
            </label>
            <input
              type="text"
              placeholder={t.contactPlaceholder}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? t.posting : t.sell}
          </button>
        </form>
      </div>
    </main>
  );
}
