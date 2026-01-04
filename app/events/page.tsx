'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

type Event = {
  id: number;
  image: string | null;
  title: string;
  description: string;
  date: string;
  location: string;
  event_type: string;
  published: boolean;
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('published', true)
        .order('date', { ascending: true });

      setEvents(data || []);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const getImageUrl = (path: string) =>
    supabase.storage.from('events').getPublicUrl(path).data.publicUrl;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-8 text-[#1C5739]">
        Events & Tournaments
      </h1>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              {event.image && (
                <img
                  src={getImageUrl(event.image!)}
                  className="w-full h-52 object-cover cursor-pointer"
                  onClick={() =>
                    setSelectedImage(getImageUrl(event.image!))
                  }
                />
              )}

              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {event.description}
                </p>
                <p className="text-xs text-gray-500">
                  📅 {new Date(event.date).toLocaleDateString()} • 📍{' '}
                  {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-h-[90vh] rounded-xl"
          />
        </div>
      )}
    </div>
  );
}
