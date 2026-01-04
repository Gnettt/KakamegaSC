'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

type GalleryItem = {
  id: number;
  image: string; // STORAGE PATH
  category: string;
};

export default function GalleryAdmin() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchGallery = async () => {
    const { data } = await supabase
      .from('gallery')
      .select('*')
      .order('id', { ascending: false });

    setGallery(data || []);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    const arr = Array.from(list);
    setFiles(arr);
    setPreviews(arr.map(file => URL.createObjectURL(file)));
  };

  const uploadImages = async () => {
    if (!category || files.length === 0) {
      alert('Category and images required');
      return;
    }

    setUploading(true);

    for (const file of files) {
      const ext = file.name.split('.').pop();
      const filePath = `gallery/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);

      if (uploadError) {
        alert(uploadError.message);
        continue;
      }

      await supabase.from('gallery').insert({
        image: filePath, // ✅ PATH ONLY
        category,
      });
    }

    setFiles([]);
    setPreviews([]);
    setCategory('');
    setUploading(false);
    fetchGallery();
  };

  const deleteImage = async (id: number) => {
    if (!confirm('Delete image?')) return;
    await supabase.from('gallery').delete().eq('id', id);
    fetchGallery();
  };

  const getImageUrl = (path: string) =>
    supabase.storage.from('gallery').getPublicUrl(path).data.publicUrl;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-[#1C5739] mb-8">
        Gallery Management
      </h1>

      {/* Upload */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <input
          type="file"
          multiple
          onChange={e => handleFiles(e.target.files)}
        />

        {previews.length > 0 && (
          <div className="grid grid-cols-4 gap-4 mt-4">
            {previews.map((src, i) => (
              <img key={i} src={src} className="h-24 object-cover rounded" />
            ))}
          </div>
        )}

        <button
          onClick={uploadImages}
          disabled={uploading}
          className="mt-4 bg-[#1C5739] text-white px-6 py-2 rounded"
        >
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
      </div>

      {/* Existing */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.map(img => (
          <div key={img.id} className="border rounded overflow-hidden">
            <img
              src={getImageUrl(img.image)}
              className="h-28 w-full object-cover"
            />
            <div className="p-2 flex justify-between text-sm">
              <span>{img.category}</span>
              <button
                onClick={() => deleteImage(img.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
