"use client";

import Link from "next/link";
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
};

export default function MyItemsPage() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
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
      console.log(err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("确定要删除吗？")) return;

    try {
      const { error } = await supabase
        .from("items")
        .delete()
        .eq("id", id);

      if (!error) {
        alert("✅ 删除成功");
        loadItems(); // 重新加载
      } else {
        alert("❌ 删除失败");
      }
    } catch (err) {
      alert("❌ 删除出错");
      console.log(err);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">加载中...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">我的发布</h1>
            <p className="mt-2 text-gray-500">查看、编辑、删除你发布的物品</p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/"
              className="rounded-xl bg-white px-5 py-3 text-gray-700 shadow hover:bg-gray-50"
            >
              返回首页
            </Link>
            <Link
              href="/sell"
              className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
            >
              继续发布
            </Link>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <h2 className="mb-3 text-xl font-semibold text-gray-700">
              你还没有发布任何物品
            </h2>
            <p className="mb-6 text-gray-500">先去发布一个商品试试吧</p>
            <Link
              href="/sell"
              className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
            >
              去发布
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl bg-white shadow"
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
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>

                  <Link href={`/items/${item.id}`}>
                    <h3 className="mb-2 text-lg font-semibold text-gray-800 hover:text-green-600">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="mb-3 line-clamp-2 text-sm text-gray-500">
                    {item.description || "暂无描述"}
                  </p>

                  <div className="mb-4 text-lg font-bold text-green-600">
                    {item.price}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/edit/${item.id}`}
                      className="flex-1 rounded-lg bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-600"
                    >
                      编辑
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
