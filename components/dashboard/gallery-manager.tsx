"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { UploadCloud, Trash2, Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { uploadGalleryImage, deleteGalleryImage } from "@/lib/actions/gallery-admin";
import type { GalleryImage, GalleryCategory } from "@prisma/client";

const CATEGORIES: { value: GalleryCategory; label: string }[] = [
  { value: "CABINET", label: "Cabinet" },
  { value: "EQUIPEMENT", label: "Équipements" },
  { value: "PERSONNEL", label: "Personnel" },
  { value: "PATIENTS", label: "Patients" },
];

export function GalleryManager({ initialImages }: { initialImages: GalleryImage[] }) {
  const [images, setImages] = useState(initialImages);
  const [category, setCategory] = useState<GalleryCategory>("CABINET");
  const [uploading, setUploading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const result = await uploadGalleryImage({
        base64,
        title: file.name.split(".")[0],
        category,
      });
      setUploading(false);

      if (result.success) {
        toast.success(result.message);
        window.location.reload();
      } else {
        toast.error(result.message);
      }
    };
    reader.readAsDataURL(file);
  }

  function handleDelete(id: string, imageUrl: string) {
    if (!confirm("Supprimer cette image de la galerie ?")) return;
    startTransition(async () => {
      const result = await deleteGalleryImage(id, imageUrl);
      if (result.success) {
        setImages((prev) => prev.filter((img) => img.id !== id));
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary-950 dark:text-white">
            Galerie
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Photos du cabinet, des équipements et de l'équipe.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={category} onValueChange={(v) => setCategory(v as GalleryCategory)}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-heading font-medium text-white shadow-premium transition-transform hover:scale-[1.03] disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <UploadCloud className="h-4 w-4" />
            )}
            {uploading ? "Envoi..." : "Ajouter une image"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-border shadow-premium"
          >
            <Image
              src={img.image}
              alt={img.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="truncate text-xs font-medium text-white">{img.title}</span>
              <button
                onClick={() => handleDelete(img.id, img.image)}
                disabled={isPending}
                className="rounded-full bg-white/20 p-1.5 backdrop-blur-sm hover:bg-destructive"
              >
                <Trash2 className="h-3.5 w-3.5 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Aucune image pour le moment. Ajoutez la première photo du cabinet !
        </p>
      )}
    </div>
  );
}
