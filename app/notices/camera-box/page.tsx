import Link from "next/link";
import Image from "next/image";
import NoticeTabs from "@/components/NoticeTabs";

export default function CameraBoxPage() {
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
              Campus Exchange Box Notice
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              This page introduces the usage of the on-campus exchange boxes,
              indicator light rules, and storage locations.
            </p>
          </div>

          <div className="space-y-6 leading-8 text-gray-700">
            <section>
              <p>
                After adding contact information and communicating with each
                other, users may choose face-to-face exchange or use the
                on-campus exchange boxes to store items for borrowing or trading.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800">
                Usage Rules
              </h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  If the blue light is off, it means there is no item inside the
                  box and it is available for use.
                </li>
                <li>
                  If the blue light is on, it means another user has already
                  stored an item inside, and you need to find another exchange
                  box.
                </li>
                <li>
                  After placing an item into the box, please manually press the
                  button to turn on the blue indicator light and remind others
                  that an item has been stored at this exchange point.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800">
                How to Use the Box
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border p-4">
                  <ol className="list-decimal space-y-2 pl-6">
                    <li>Check the blue indicator light before using the exchange box.</li>
                    <li>If the blue light is off, the box is empty and available for storage.</li>
                    <li>Place your item into the exchange box carefully.</li>
                    <li>After storing the item, press the button shown below to turn on the blue light.</li>
                    <li>Inform the other person that the item has been placed in the exchange box.</li>
                    <li>If the blue light is already on, do not use that box and choose another one instead.</li>
                  </ol>
                </div>

                <div className="rounded-xl border p-3">
                  <Image
                    src="/images/notices/照片7.png"
                    alt="Exchange box button instruction"
                    width={1200}
                    height={800}
                    className="h-auto w-full rounded-lg object-cover"
                  />
                  <p className="mt-3 text-sm text-gray-500">
                    Press this button after storing an item to turn on the blue
                    indicator light.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800">Images</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border p-3">
                  <Image
                    src="/images/notices/图片1.png"
                    alt="Campus exchange box"
                    width={1200}
                    height={800}
                    className="h-auto w-full rounded-lg object-cover"
                  />
                  <p className="mt-3 text-sm text-gray-500">
                    Campus exchange box
                  </p>
                </div>

                <div className="rounded-xl border p-3">
                  <Image
                    src="/images/notices/图片2.png"
                    alt="Exchange box button"
                    width={1200}
                    height={800}
                    className="h-auto w-full rounded-lg object-cover"
                  />
                  <p className="mt-3 text-sm text-gray-500">
                    Press the button after storing an item to turn on the blue
                    light.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800">
                Exchange Box Locations on Campus
              </h3>
              <p>
                There are currently four on-campus exchange box locations, all
                located in the Student Common Room of Entrepreneur College
                Taicang.
              </p>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border p-4">
                  <Image
                    src="/images/notices/图片3.png"
                    alt="E 3006"
                    width={1200}
                    height={800}
                    className="h-auto w-full rounded-lg object-cover"
                  />
                  <p className="mt-3 font-semibold">E 3006</p>
                </div>

                <div className="rounded-xl border p-4">
                  <Image
                    src="/images/notices/图片4.png"
                    alt="2003F"
                    width={1200}
                    height={800}
                    className="h-auto w-full rounded-lg object-cover"
                  />
                  <p className="mt-3 font-semibold">2003F</p>
                </div>

                <div className="rounded-xl border p-4">
                  <Image
                    src="/images/notices/图片5.png"
                    alt="2009F"
                    width={1200}
                    height={800}
                    className="h-auto w-full rounded-lg object-cover"
                  />
                  <p className="mt-3 font-semibold">2009F</p>
                </div>

                <div className="rounded-xl border p-4">
                  <Image
                    src="/images/notices/图片6.png"
                    alt="3013"
                    width={1200}
                    height={800}
                    className="h-auto w-full rounded-lg object-cover"
                  />
                  <p className="mt-3 font-semibold">3013</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
