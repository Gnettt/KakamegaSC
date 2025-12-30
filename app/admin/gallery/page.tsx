'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

type GalleryItem = {
  id: string;
  title: string;
  image_url: string;
  category: string;
  published: boolean;
};

export default function GalleryAdmin() {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchGallery = async () => {
    const { data } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    setGallery(data || []);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    setImages(fileArray);

    const previews = fileArray.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewUrls(previews);
  };

  const uploadImages = async () => {
    if (!category || images.length === 0) {
      alert('Category and images are required');
      return;
    }

    setUploading(true);

    for (const file of images) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);

      if (uploadError) {
        alert(uploadError.message);
        continue;
      }

      const { data } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      await supabase.from('gallery').insert({
        title: file.name,
        image_url: data.publicUrl,
        category,
        published: true,
      });
    }

    setImages([]);
    setPreviewUrls([]);
    setCategory('');
    setUploading(false);
    fetchGallery();
  };

  const togglePublish = async (id: string, published: boolean) => {
    await supabase
      .from('gallery')
      .update({ published: !published })
      .eq('id', id);

    fetchGallery();
  };

  const deleteImage = async (id: string) => {
    if (!confirm('Delete image?')) return;

    await supabase.from('gallery').delete().eq('id', id);
    fetchGallery();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-[#1C5739] mb-8">
        Gallery Management
      </h1>

      {/* Upload Box */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-xl font-semibold text-[#1C5739] mb-4">
          Upload Images
        </h2>

        <input
          type="text"
          placeholder="Category (e.g. Tournaments, Events)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />

        <label className="block border-2 border-dashed border-[#1C5739] rounded-lg p-6 text-center cursor-pointer hover:bg-[#f3f7f5]">
          <input
            type="file"
            multiple
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
          <p className="text-[#1C5739] font-semibold">
            Drag & drop images here or click to browse
          </p>
        </label>

        {previewUrls.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {previewUrls.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Preview"
                className="rounded-lg object-cover h-32 w-full"
              />
            ))}
          </div>
        )}

        <button
          disabled={uploading}
          onClick={uploadImages}
          className="mt-6 bg-[#1C5739] text-white px-6 py-2 rounded hover:opacity-90 disabled:opacity-50"
        >
          {uploading ? 'Uploading…' : 'Upload Images'}
        </button>
      </div>

      {/* Existing Gallery */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-[#1C5739] mb-4">
          Existing Images
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gallery.map((img) => (
            <div
              key={img.id}
              className="border rounded-lg overflow-hidden"
            >
              <img
                src={img.image_url}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <p className="font-semibold">{img.category}</p>

                <div className="flex justify-between mt-3">
                  <button
                    onClick={() =>
                      togglePublish(img.id, img.published)
                    }
                    className="text-sm text-[#1C5739]"
                  >
                    {img.published ? 'Unpublish' : 'Publish'}
                  </button>

                  <button
                    onClick={() => deleteImage(img.id)}
                    className="text-sm text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
