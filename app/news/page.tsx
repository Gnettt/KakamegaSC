'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

type NewsItem = {
  news_id: number;
  title: string;
  category: string;
  content: string;
  image?: string | null; // stores file path from 'news' bucket
};

// Initialize Supabase client once
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function NewsPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('news_id', { ascending: false });

      if (error) {
        console.error('Error fetching news:', error);
        setNewsList([]);
      } else {
        setNewsList(data || []);
      }

      setLoading(false);
    };

    fetchNews();
  }, []);

  const getImageUrl = (path: string | null) => {
    if (!path) return null;
    // Fetch public URL from 'news' bucket
    return supabase.storage.from('news').getPublicUrl(path).data.publicUrl;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <section className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-[#1C5739]">
          News & Updates
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading news...</p>
        ) : newsList.length === 0 ? (
          <p className="text-center text-gray-600">
            No news articles available at the moment. Check back soon!
          </p>
        ) : (
          <div className="grid gap-8">
            {newsList.map((item) => {
              const imageUrl = getImageUrl(item.image ?? null);

              return (
                <div
                  key={item.news_id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                >
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={item.title}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2 text-[#1C5739]">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">{item.category}</p>
                    <p className="text-gray-700 whitespace-pre-line">{item.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
