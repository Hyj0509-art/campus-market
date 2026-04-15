"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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
          alert("没有找到这个商品");
          router.push("/my-items");
        }
      } catch (err) {
        console.log("❌ 查询错误:", err);
        alert("加载商品失败");
        router.push("/my-items");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadItem();
    }
  }, [id, router]);

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
        alert("✅ 修改成功");
        router.push("/my-items");
      } else {
        alert("❌ 修改失败");
        console.log(error);
      }
    } catch (err) {
      alert("❌ 修改出错");
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
          <p className="text-gray-500">加载中...</p>
        </div>
      </main>
    );
  }

  if (!form) {
    return (
      <main className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
          <p className="text-gray-500">物品不存在</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">编辑商品</h1>
        <p className="mb-8 text-gray-500">修改你之前发布的内容</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              商品标题
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
              商品描述
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
                价格
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
                类型
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
              >
                <option value="出售">出售</option>
                <option value="借用">借用</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              图片链接
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
                卖家昵称
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
                联系方式
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
              {saving ? "保存中..." : "保存修改"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/my-items")}
              className="rounded-xl bg-gray-200 px-6 py-3 font-medium text-gray-700 hover:bg-gray-300"
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
