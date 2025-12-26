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
          // Set placeholder images
          setImages([
            {
              id: '1',
              title: 'Golf Course',
              description: 'Beautiful 9-hole course',
              image_url: '/api/placeholder?category=Golf',
              category: 'Golf'
            },
            {
              id: '2',
              title: 'Club Life',
              description: 'Members enjoying social events',
              image_url: '/api/placeholder?category=ClubLife',
              category: 'Club Life'
            },
            {
              id: '3',
              title: 'Junior Programs',
              description: 'Young members in action',
              image_url: '/api/placeholder?category=Junior',
              category: 'Junior'
            },
            {
              id: '4',
              title: 'Aerial View',
              description: 'Course aerial photography',
              image_url: '/api/placeholder?category=Aerial',
              category: 'Aerial'
            }
          ]);
        } else {
          setImages(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const categories = ['all', ...new Set(images.map(img => img.category))];
  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#865807' }}>
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
                  backgroundColor: selectedCategory === category ? '#865807' : '#f8f6f1',
                  color: selectedCategory === category ? 'white' : '#865807'
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
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition bg-gray-100 h-64"
                >
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <p className="text-4xl mb-2">🖼️</p>
                      <p className="text-sm">{image.category}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold mb-1" style={{ color: '#865807' }}>
                      {image.title}
                    </h3>
                    {image.description && (
                      <p className="text-sm text-gray-600">{image.description}</p>
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
