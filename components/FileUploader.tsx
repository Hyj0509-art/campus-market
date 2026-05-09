"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

type FileUploaderProps = {
  bucket: string;
  accept?: string;
  onUploaded: (url: string) => void;
};

export default function FileUploader({
  bucket,
  accept = "*/*",
  onUploaded,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const uploadFile = async (file: File) => {
    if (!file) return;

    setUploading(true);
    setFileName(file.name);

    try {
      const ext = file.name.split(".").pop();
      const filePath = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${ext}`;

      const { error } = await supabase.storage.from(bucket).upload(filePath, file);

      if (error) {
        alert("上传失败");
        console.log(error);
        return;
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

      if (data?.publicUrl) {
        onUploaded(data.publicUrl);
      }
    } catch (error) {
      alert("上传出错");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadFile(file);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await uploadFile(file);
    }
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;

    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          await uploadFile(file);
          break;
        }
      }
    }
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      <div
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onPaste={handlePaste}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center outline-none transition ${
          dragging
            ? "border-green-500 bg-green-50"
            : "border-gray-300 bg-gray-50 hover:border-green-400 hover:bg-green-50"
        }`}
      >
        <p className="text-base font-semibold text-gray-800">
          {uploading ? "图片上传中..." : "点击上传 / 拖拽图片到这里"}
        </p>
        <p className="mt-2 text-sm text-gray-500">也支持直接粘贴截图 Ctrl+V</p>
      </div>

      <div className="text-sm text-gray-600">
        {fileName ? `已选择: ${fileName}` : "暂未选择文件"}
      </div>
    </div>
  );
}
