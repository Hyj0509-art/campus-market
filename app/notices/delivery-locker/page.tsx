import Link from "next/link";
import NoticeTabs from "@/components/NoticeTabs";

export default function DeliveryLockerPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex justify-end">
          <Link
            href="/"
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow hover:bg-green-700"
          >
            Back to Home
          </Link>
        </div>

        <h1 className="mb-6 text-3xl font-bold text-gray-800">
          Notice Center
        </h1>

        <NoticeTabs />

        <div className="rounded-2xl bg-white p-8 shadow">
          <div className="mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Dorm Delivery Locker Notice
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              This page explains how to use a delivery locker for item lending
              or trading.
            </p>
          </div>

          <div className="space-y-6 leading-8 text-gray-700">
            <section>
              <p>
                After adding each other&apos;s contact information and confirming
                the details, users can choose to meet in person or place the
                item in any available delivery locker for lending or trading[^1].
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800">
                How to Use
              </h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>Add the other person&apos;s contact information first.</li>
                <li>Confirm the lending or trading details in advance.</li>
                <li>Choose any available delivery locker as a temporary drop-off point[^1].</li>
                <li>After placing the item, notify the other person to pick it up[^1].</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800">
                Video Tutorial
              </h3>
              <div className="rounded-xl border p-4">
                <video
                  controls
                  className="h-[500px] w-full rounded-lg bg-black object-contain"
                >
                  <source src="/images/notices/1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="mt-3 text-sm text-gray-500">
                  Delivery locker video tutorial
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
