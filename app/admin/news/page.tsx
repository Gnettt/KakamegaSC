'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

type News = {
  news_id: number;
  image?: string | null; // stores FILE PATH
  title: string;
  category: string;
  content: string;
  created_by?: string | null;
};

export default function NewsAdminPage() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('news_id', { ascending: false });

    if (error) console.error(error);
    else setNewsList(data || []);

    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setImageFile(null);
    setImagePreview(null);
    setTitle('');
    setCategory('');
    setContent('');
  };

  // Upload image and return file path only in the 'news' bucket
  const handleImageUpload = async (): Promise<string | null> => {
    if (!imageFile) return null;

    const ext = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;
    const filePath = `news/${fileName}`;

    const { error } = await supabase.storage
      .from('news')
      .upload(filePath, imageFile, { upsert: true });

    if (error) {
      alert('Image upload failed: ' + error.message);
      return null;
    }

    return filePath; // store only the path
  };

  const handleSubmit = async () => {
    if (!title || !category || !content) {
      alert('All fields are required');
      return;
    }

    const uploadedImagePath = imageFile ? await handleImageUpload() : imagePreview;

    if (editingId) {
      await supabase
        .from('news')
        .update({
          title,
          category,
          content,
          image: uploadedImagePath,
          created_by: null, // replace with user UUID if needed
        })
        .eq('news_id', editingId);
    } else {
      await supabase.from('news').insert({
        title,
        category,
        content,
        image: uploadedImagePath,
        created_by: null, // replace with user UUID if needed
      });
    }

    resetForm();
    fetchNews();
  };

  const handleEdit = (item: News) => {
    setEditingId(item.news_id);
    setImagePreview(item.image || null);
    setTitle(item.title);
    setCategory(item.category);
    setContent(item.content);
  };

  const deleteNews = async (id: number) => {
    if (!confirm('Delete this article?')) return;
    await supabase.from('news').delete().eq('news_id', id);
    fetchNews();
  };

  const getImageUrl = (path: string | null): string | undefined => {
    if (!path) return undefined;
    const { data } = supabase.storage.from('news').getPublicUrl(path);
    return data?.publicUrl ?? undefined;
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-[#1C5739] mb-8">News Management</h1>

      {/* Form */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-xl font-semibold text-[#1C5739] mb-4">
          {editingId ? 'Edit News Article' : 'Add News Article'}
        </h2>

        <div className="grid gap-4">
          <div>
            {imagePreview && (
              <img
                src={imagePreview.startsWith('http') ? imagePreview : getImageUrl(imagePreview)}
                alt="News"
                className="mb-2 w-32 h-32 object-cover rounded"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setImageFile(e.target.files[0]);
                  setImagePreview(URL.createObjectURL(e.target.files[0]));
                }
              }}
              className="border rounded p-2 w-full"
            />
          </div>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded p-2"
          />

          <textarea
            placeholder="Content"
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
              <button onClick={resetForm} className="border px-6 py-2 rounded">
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* List of news */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-[#1C5739] mb-4">Existing Articles</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {newsList.map((item) => (
              <div
                key={item.news_id}
                className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  {item.image && (
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.category}</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-3 md:mt-0">
                  <button onClick={() => handleEdit(item)} className="text-[#1C5739] text-sm">
                    Edit
                  </button>
                  <button onClick={() => deleteNews(item.news_id)} className="text-red-600 text-sm">
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
