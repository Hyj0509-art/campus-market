import { supabase } from "@/lib/supabase";

export type UploadBucket = "item-media" | "notice-media";

export async function uploadFile(file: File, bucket: UploadBucket) {
  const fileExt = file.name.split(".").pop() || "";
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${fileExt}`;

  const filePath = fileName;

  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return data.publicUrl;
}
