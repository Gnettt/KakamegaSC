'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL || '',
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
        );

        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching gallery:', error);
          setImages([]);
        } else {
          setImages(data || []);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const categories = ['all', ...new Set(images.map(img => img.category))];
  const filteredImages =
    selectedCategory === 'all'
      ? images
      : images.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1C5739]">
            Gallery
          </h1>

          <p className="text-gray-700 text-lg mb-8">
            Explore moments from tournaments, events, and club life at Kakamega Sports Club.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-4 py-2 rounded-lg font-medium transition capitalize"
                style={{
                  backgroundColor:
                    selectedCategory === category ? '#1C5739' : '#f8f6f1',
                  color:
                    selectedCategory === category ? 'white' : '#1C5739',
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading gallery...</p>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No images in this category yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map(image => (
                <div
                  key={image.id}
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition bg-white"
                >
                  <div className="relative w-full h-64">
                    <Image
                      src={image.image_url}
                      alt={image.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold mb-1 text-[#1C5739]">
                      {image.title}
                    </h3>
                    {image.description && (
                      <p className="text-sm text-gray-600">
                        {image.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
