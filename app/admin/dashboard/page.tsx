'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    news: 0,
    events: 0,
    gallery: 0,
    leadership: 0,
  });

  const [loading, setLoading] = useState(true);

  // Fetch counts from Supabase
  const fetchStats = async () => {
    const [news, events, gallery, leadership] = await Promise.all([
      supabase.from('news').select('news_id', { count: 'exact', head: true }),
      supabase.from('events').select('event_id', { count: 'exact', head: true }),
      supabase.from('gallery').select('id', { count: 'exact', head: true }),
      supabase.from('leadership').select('leader_id', { count: 'exact', head: true }),
    ]);

    setStats({
      news: news.count || 0,
      events: events.count || 0,
      gallery: gallery.count || 0,
      leadership: leadership.count || 0,
    });

    setLoading(false);
  };

  useEffect(() => {
    // Initial fetch
    fetchStats();

    // Subscribe to realtime changes for each table
    const newsSub = supabase
      .channel('public:news')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'news' }, () => fetchStats())
      .subscribe();

    const eventsSub = supabase
      .channel('public:events')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, () => fetchStats())
      .subscribe();

    const gallerySub = supabase
      .channel('public:gallery')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery' }, () => fetchStats())
      .subscribe();

    const leadershipSub = supabase
      .channel('public:leadership')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leadership' }, () => fetchStats())
      .subscribe();

    // Cleanup subscriptions on unmount
    return () => {
      supabase.removeChannel(newsSub);
      supabase.removeChannel(eventsSub);
      supabase.removeChannel(gallerySub);
      supabase.removeChannel(leadershipSub);
    };
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600">
        Loading dashboard…
      </div>
    );
  }

  const cards = [
    {
      title: 'News Articles',
      value: stats.news,
      link: '/admin/news',
      description: 'Manage club announcements & updates',
    },
    {
      title: 'Events',
      value: stats.events,
      link: '/admin/events',
      description: 'Tournaments, socials & schedules',
    },
    {
      title: 'Leadership',
      value: stats.leadership,
      link: '/admin/leadership',
      description: 'Management & sports committees',
    },
    {
      title: 'Gallery',
      value: stats.gallery,
      link: '/admin/gallery',
      description: 'Photos & media uploads',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-[#1C5739] mb-2">
        Admin Dashboard
      </h1>
      <p className="text-gray-600 mb-10">
        Welcome back. Manage Kakamega Sports Club content below.
      </p>

      {/* CARDS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.link}
            className="group bg-white rounded-xl shadow hover:shadow-lg transition p-6 border-t-4"
            style={{ borderColor: '#1C5739' }}
          >
            <h2 className="text-lg font-semibold text-[#1C5739] mb-1">
              {card.title}
            </h2>

            <p className="text-4xl font-bold mb-2">
              {card.value}
            </p>

            <p className="text-sm text-gray-600">
              {card.description}
            </p>

            <p className="mt-4 text-sm font-medium text-[#1C5739] group-hover:underline">
              Manage →
            </p>
          </Link>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-14 bg-[#1C5739] text-white rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-2">
          Quick Actions
        </h2>
        <p className="text-white/80 mb-6">
          Jump straight into common admin tasks
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/news"
            className="bg-white text-[#1C5739] px-6 py-2 rounded font-semibold hover:opacity-90"
          >
            Add News
          </Link>

          <Link
            href="/admin/events"
            className="bg-white text-[#1C5739] px-6 py-2 rounded font-semibold hover:opacity-90"
          >
            Add Event
          </Link>

          <Link
            href="/admin/leadership"
            className="bg-white text-[#1C5739] px-6 py-2 rounded font-semibold hover:opacity-90"
          >
            Edit Leadership
          </Link>

          <Link
            href="/admin/gallery"
            className="bg-white text-[#1C5739] px-6 py-2 rounded font-semibold hover:opacity-90"
          >
            Edit Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
