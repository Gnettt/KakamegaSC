'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  event_type: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL || '',
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
        );

        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true });

        if (error) {
          console.error('Error fetching events:', error);
          setEvents([]);
        } else {
          setEvents(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#865807' }}>
            Events & Tournaments
          </h1>
          <p className="text-gray-700 text-lg mb-8 max-w-2xl">
            From competitive tournaments to social experiences, our calendar brings members together all year round.
          </p>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No events scheduled at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="border-l-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition"
                  style={{ borderColor: '#865807' }}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2" style={{ color: '#865807' }}>
                        {event.title}
                      </h3>
                      <p className="text-gray-700 mb-3">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                        <span>📍 {event.location}</span>
                        <span className="px-3 py-1 rounded-full" style={{ backgroundColor: '#f8f6f1', color: '#865807' }}>
                          {event.event_type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 p-8 rounded-lg" style={{ backgroundColor: '#f8f6f1' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#865807' }}>
              Featured Events
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>⛳ Captain's Tournament</li>
              <li>🏆 Club Opens</li>
              <li>👶 Junior Golf Events</li>
              <li>�� Sponsorship Opportunities</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
