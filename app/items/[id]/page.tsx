"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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
  created_at?: string;
};

export default function ItemDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [item, setItem] = useState<ItemType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadItem = async () => {
      try {
        // 从 Supabase 数据库查询
        const { data, error } = await supabase
          .from("items")
          .select("*")
          .eq("id", Number(id))
          .single(); // 只返回一条记录

        if (!error && data) {
          console.log("✅ 找到物品:", data);
          setItem(data);
        } else {
          console.log("❌ 物品不存在");
          setItem(null);
        }
      } catch (err) {
        console.log("❌ 查询错误:", err);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-2xl bg-white px-8 py-6 shadow text-gray-600">
          加载中...
        </div>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-2xl bg-white px-8 py-6 shadow">
          <p className="mb-4 text-gray-600">没有找到这个物品</p>
          <Link
            href="/"
            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            返回首页
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto grid max-w-5xl gap-8 rounded-2xl bg-white p-6 shadow md:grid-cols-2">
        <div>
          <img
            src={item.image}
            alt={item.title}
            className="h-[380px] w-full rounded-2xl object-cover"
          />
        </div>

        <div>
          <div className="mb-3 flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                item.type === "出售"
                  ? "bg-orange-100 text-orange-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {item.type}
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-gray-800">
            {item.title}
          </h1>

          <p className="mb-6 text-3xl font-bold text-green-600">{item.price}</p>

          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              物品描述
            </h2>
            <p className="leading-7 text-gray-600">
              {item.description || "暂无描述"}
            </p>
          </div>

          <div className="mb-6 space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">发布人：</span>
              {item.seller || "匿名用户"}
            </p>
            <p>
              <span className="font-semibold">联系方式：</span>
              {item.contact || "暂无联系方式"}
            </p>
          </div>

          <Link
            href="/"
            className="inline-block rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
          >
            返回首页
          </Link>
        </div>
      </div>
    </main>
  );
}
