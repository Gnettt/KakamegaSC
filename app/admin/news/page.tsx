'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

type News = {
  id: string;
  title: string;
  content: string;
  category: string;
  published: boolean;
  created_at: string;
};

export default function NewsAdminPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setNews(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setCategory('');
  };

  const handleSubmit = async () => {
    if (!title || !content || !category) {
      alert('All fields are required');
      return;
    }

    if (editingId) {
      await supabase
        .from('news')
        .update({
          title,
          content,
          category,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingId);
    } else {
      await supabase.from('news').insert({
        title,
        content,
        category,
        published: true,
      });
    }

    resetForm();
    fetchNews();
  };

  const handleEdit = (item: News) => {
    setEditingId(item.id);
    setTitle(item.title);
    setContent(item.content);
    setCategory(item.category);
  };

  const togglePublish = async (id: string, published: boolean) => {
    await supabase
      .from('news')
      .update({ published: !published })
      .eq('id', id);

    fetchNews();
  };

  const deleteNews = async (id: string) => {
    if (!confirm('Delete this article?')) return;

    await supabase.from('news').delete().eq('id', id);
    fetchNews();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-[#1C5739] mb-8">
        News Management
      </h1>

      {/* FORM */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-xl font-semibold text-[#1C5739] mb-4">
          {editingId ? 'Edit News Article' : 'Add News Article'}
        </h2>

        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2"
          />

          <input
            type="text"
            placeholder="Category (e.g. Announcements, Tournaments)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded p-2"
          />

          <textarea
            placeholder="News content"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border rounded p-2"
          />

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="bg-[#1C5739] text-white px-6 py-2 rounded hover:opacity-90"
            >
              {editingId ? 'Update' : 'Publish'}
            </button>

            {editingId && (
              <button
                onClick={resetForm}
                className="border px-6 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-[#1C5739] mb-4">
          Existing Articles
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-600">
                    {item.category} •{' '}
                    {item.published ? 'Published' : 'Draft'}
                  </p>
                </div>

                <div className="flex gap-3 mt-3 md:mt-0">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-[#1C5739] text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      togglePublish(item.id, item.published)
                    }
                    className="text-sm"
                  >
                    {item.published ? 'Unpublish' : 'Publish'}
                  </button>

                  <button
                    onClick={() => deleteNews(item.id)}
                    className="text-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
