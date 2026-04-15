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
  created_at?: string;
};

export default function HomePage() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // 搜索关键词

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
        console.log("✅ 从数据库加载了数据", dbItems);
        setItems(dbItems);
      } else {
        console.log("❌ 加载失败", error);
        setItems([]);
      }
    } catch (err) {
      console.log("❌ 数据库连接错误", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // 过滤搜索结果
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (!window.confirm("确定要删除吗？")) return;

    try {
      const { error } = await supabase
        .from("items")
        .delete()
        .eq("id", id);

      if (!error) {
        alert("✅ 删除成功");
        // 重新加载数据
        loadItems();
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
    <main className="min-h-screen bg-gray-100">
      <section className="bg-green-600 px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 text-4xl font-bold">校园二手交易平台</h1>
          <p className="mb-6 text-lg text-green-50">
            在校园里轻松发布、查找和交易闲置物品
          </p>
          <div className="flex gap-4">
            <Link
              href="/sell"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-green-600 shadow hover:bg-gray-100"
            >
              发布物品
            </Link>
            <Link
              href="/my-items"
              className="rounded-xl border border-white px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              我的发布
            </Link>
          </div>
        </div>
      </section>

      {/* 搜索框 */}
      <section className="mx-auto max-w-6xl px-6 py-6">
        <input
          type="text"
          placeholder="搜索物品名称..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          {searchQuery ? `搜索结果 (${filteredItems.length})` : "最新物品"}
        </h2>

        {filteredItems.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <p className="text-gray-500">
              {searchQuery ? "没有找到匹配的物品" : "暂无物品"}
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

                  <p className="mb-4 line-clamp-2 text-sm text-gray-500">
                    {item.description || "暂无描述"}
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
