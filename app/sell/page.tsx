"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SellPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("出售");
  const [image, setImage] = useState("");
  const [seller, setSeller] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 只保存到 Supabase 数据库，不用 localStorage
      const { error } = await supabase.from("items").insert([
        {
          title,
          description,
          price: type === "借用" ? "借用" : `¥${price}`,
          type,
          image:
            image ||
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
          seller: seller || "匿名用户",
          contact: contact || "暂无联系方式",
        },
      ]);

      if (error) {
        alert("❌ 发布失败，请重试");
        console.log("错误:", error);
      } else {
        alert("✅ 发布成功！");

        // 清空表单
        setTitle("");
        setDescription("");
        setPrice("");
        setType("出售");
        setImage("");
        setSeller("");
        setContact("");

        // 延迟跳转
        setTimeout(() => {
          router.push("/");
        }, 500);
      }
    } catch (err) {
      alert("❌ 发布出错");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">发布物品</h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              物品标题
            </label>
            <input
              type="text"
              placeholder="例如：九成新台灯"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              物品描述
            </label>
            <textarea
              placeholder="请输入物品描述..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              价格
            </label>
            <input
              type="text"
              placeholder="例如：50"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
              required={type === "出售"}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              类型
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="type"
                  checked={type === "出售"}
                  onChange={() => setType("出售")}
                />
                出售
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="type"
                  checked={type === "借用"}
                  onChange={() => setType("借用")}
                />
                借用
              </label>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              图片链接
            </label>
            <input
              type="text"
              placeholder="先填图片网址，后面再做上传功能"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              发布人
            </label>
            <input
              type="text"
              placeholder="例如：张同学"
              value={seller}
              onChange={(e) => setSeller(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              联系方式
            </label>
            <input
              type="text"
              placeholder="例如：微信 xxx"
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
            {loading ? "发布中..." : "发布"}
          </button>
        </form>
      </div>
    </main>
  );
}
