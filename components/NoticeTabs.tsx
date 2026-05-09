"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NoticeTabs() {
  const pathname = usePathname();

  const isCampusExchangeBox = pathname === "/notices/camera-box";
  const isDeliveryLocker = pathname === "/notices/delivery-locker";

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <Link
        href="/notices/camera-box"
        className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
          isCampusExchangeBox
            ? "bg-green-600 text-white shadow"
            : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        Campus Exchange Box
      </Link>

      <Link
        href="/notices/delivery-locker"
        className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
          isDeliveryLocker
            ? "bg-green-600 text-white shadow"
            : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        Dorm Delivery Locker
      </Link>
    </div>
  );
}
