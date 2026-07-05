import { listGalleryImages } from "@/lib/actions/gallery-admin";
import { GalleryManager } from "@/components/dashboard/gallery-manager";

export default async function GalleryAdminPage() {
  const images = await listGalleryImages();
  return <GalleryManager initialImages={images} />;
}
