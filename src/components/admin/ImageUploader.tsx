import { useRef, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { SmartImage } from "@/components/common/SmartImage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  value: string | null;
  onChange: (url: string | null) => void;
  className?: string;
};

export function ImageUploader({ value, onChange, className }: Props) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadToCloudinary(file);
      onChange(result.secure_url);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "ছবি আপলোড ব্যর্থ হয়েছে");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {value ? (
        <div className="relative w-fit">
          <SmartImage src={value} alt="" className="size-28 rounded-xl border" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-destructive text-destructive-foreground shadow"
            aria-label="ছবি সরান"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          {uploading ? "আপলোড হচ্ছে…" : "ছবি আপলোড করুন"}
        </Button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}

export function MultiImageUploader({ value, onChange }: { value: string[]; onChange: (urls: string[]) => void }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const uploaded = await Promise.all(Array.from(files).map((f) => uploadToCloudinary(f)));
      onChange([...value, ...uploaded.map((u) => u.secure_url)]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "ছবি আপলোড ব্যর্থ হয়েছে");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {value.map((url, i) => (
          <div key={url + i} className="relative">
            <SmartImage src={url} alt="" className="size-20 rounded-xl border" />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, idx) => idx !== i))}
              className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-destructive text-destructive-foreground shadow"
              aria-label="ছবি সরান"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" disabled={uploading} onClick={() => inputRef.current?.click()}>
        {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
        {uploading ? "আপলোড হচ্ছে…" : "গ্যালারি ছবি যোগ করুন"}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
