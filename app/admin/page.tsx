'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // For admin use server-side service key in production
);

// Types
interface News {
  id: string;
  title: string;
  content: string;
  category: string;
  published: boolean;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  event_type: string;
  published: boolean;
}

interface Gallery {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category: string;
  published: boolean;
}

interface TeamMember {
  id: string;
  name: string;
  position: string;
  committee: string;
  email?: string;
}

// Main Admin Panel Component
export default function AdminPanel() {
  const [news, setNews] = useState<News[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all tables
  const fetchAll = async () => {
    setLoading(true);
    const [newsRes, eventsRes, galleryRes, teamRes] = await Promise.all([
      supabaseAdmin.from('news').select('*'),
      supabaseAdmin.from('events').select('*'),
      supabaseAdmin.from('gallery').select('*'),
      supabaseAdmin.from('team_members').select('*'),
    ]);
    if (newsRes.data) setNews(newsRes.data);
    if (eventsRes.data) setEvents(eventsRes.data);
    if (galleryRes.data) setGallery(galleryRes.data);
    if (teamRes.data) setTeamMembers(teamRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Delete a row
  const handleDelete = async (table: string, id: string) => {
    const { error } = await supabaseAdmin.from(table).delete().eq('id', id);
    if (error) return alert(error.message);
    fetchAll();
  };

  // Toggle published field
  const togglePublished = async (table: string, id: string, current: boolean) => {
    const { error } = await supabaseAdmin.from(table).update({ published: !current }).eq('id', id);
    if (error) return alert(error.message);
    fetchAll();
  };

  // Add new item
  const handleAdd = async (table: string) => {
    const title = prompt('Enter title/name:');
    if (!title) return;
    const content = prompt('Enter content/description (if applicable):') || '';
    const category = prompt('Enter category/committee/type (if applicable):') || '';
    const email = prompt('Enter email (if applicable):') || '';
    const image_url = prompt('Enter image URL (if applicable):') || '';
    const date = prompt('Enter date (ISO format) (if applicable):') || '';

    let insertObj: any = { title, content, category, published: true };

    switch (table) {
      case 'news':
        insertObj = { title, content, category, published: true };
        break;
      case 'events':
        insertObj = { title, description: content, date, location: category, event_type: email, published: true };
        break;
      case 'gallery':
        insertObj = { title, description: content, image_url, category, published: true };
        break;
      case 'team_members':
        insertObj = { name: title, position: content, committee: category, email };
        break;
    }

    const { error } = await supabaseAdmin.from(table).insert([insertObj]);
    if (error) return alert(error.message);
    fetchAll();
  };

  if (loading) return <p className="p-6 text-gray-700">Loading admin panel...</p>;

  // Render Table Card
  const renderTable = (tableName: string, data: any[]) => (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold" style={{ color: '#1C5739' }}>{tableName}</h2>
        <button
          className="px-4 py-2 bg-[#1C5739] text-white font-semibold rounded shadow hover:bg-green-800 transition"
          onClick={() => handleAdd(tableName.toLowerCase())}
        >
          Add New {tableName.slice(0, -1)}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow-md border">
          <thead className="bg-[#1C5739] text-white">
            <tr>
              {Object.keys(data[0] || {}).map((key) => (
                <th key={key} className="border px-4 py-2 capitalize text-left">{key}</th>
              ))}
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: any) => (
              <tr key={row.id} className="hover:bg-gray-50 transition">
                {Object.keys(row).map((key) => (
                  <td key={key} className="border px-4 py-2">{row[key]?.toString()}</td>
                ))}
                <td className="border px-4 py-2 space-x-2">
                  {'published' in row && (
                    <button
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                      onClick={() => togglePublished(tableName.toLowerCase(), row.id, row.published)}
                    >
                      {row.published ? 'Unpublish' : 'Publish'}
                    </button>
                  )}
                  <button
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    onClick={() => handleDelete(tableName.toLowerCase(), row.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-[#1C5739]">Admin Panel</h1>
      {renderTable('News', news)}
      {renderTable('Events', events)}
      {renderTable('Gallery', gallery)}
      {renderTable('Team_members', teamMembers)}
    </div>
  );
}
