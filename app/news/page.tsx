'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
}

export default function News() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL || '',
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
        );

        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching news:', error);
          setNews([]);
        } else {
          setNews(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1C5739' }}>
            News & Announcements
          </h1>
          <p className="text-gray-700 text-lg mb-8">
            Stay updated with official club communication and announcements.
          </p>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading news...</p>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No news articles at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {news.map((article) => (
                <div
                  key={article.id}
                  className="border-l-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition"
                  style={{ borderColor: '#1C5739' }}
                >
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="text-2xl font-bold flex-1" style={{ color: '#1C5739' }}>
                      {article.title}
                    </h3>
                    <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: '#f8f6f1', color: '#1C5739' }}>
                      {article.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    {new Date(article.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-700 leading-relaxed">{article.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
