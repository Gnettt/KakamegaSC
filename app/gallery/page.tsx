'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';

interface GalleryImage {
  id: number;
  image: string; // STORAGE PATH
  category: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data } = await supabase
        .from('gallery')
        .select('*')
        .order('id', { ascending: false });

      setImages(data || []);
      setLoading(false);
    };

    fetchGallery();
  }, []);

  const categories = ['all', ...new Set(images.map(i => i.category))];

  const filtered =
    selectedCategory === 'all'
      ? images
      : images.filter(i => i.category === selectedCategory);

  const getImageUrl = (path: string) =>
    supabase.storage.from('gallery').getPublicUrl(path).data.publicUrl;

  return (
    <div className="p-6">
      <h1 className="text-5xl font-bold text-[#1C5739] mb-6">Gallery</h1>

      <div className="flex gap-3 mb-8 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded capitalize ${
              selectedCategory === cat
                ? 'bg-[#1C5739] text-white'
                : 'bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map(img => (
            <div key={img.id} className="relative h-32 rounded overflow-hidden">
              <Image
                src={getImageUrl(img.image)}
                alt={img.category}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
