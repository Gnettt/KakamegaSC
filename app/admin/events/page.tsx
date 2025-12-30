'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  event_type: string;
  published: boolean;
  created_at: string;
};

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState('');

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (!error) setEvents(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setDate('');
    setLocation('');
    setEventType('');
  };

  const handleSubmit = async () => {
    if (!title || !description || !date || !location || !eventType) {
      alert('All fields are required');
      return;
    }

    if (editingId) {
      await supabase
        .from('events')
        .update({
          title,
          description,
          date,
          location,
          event_type: eventType,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingId);
    } else {
      await supabase.from('events').insert({
        title,
        description,
        date,
        location,
        event_type: eventType,
        published: true,
      });
    }

    resetForm();
    fetchEvents();
  };

  const handleEdit = (event: Event) => {
    setEditingId(event.id);
    setTitle(event.title);
    setDescription(event.description);
    setDate(event.date.slice(0, 16)); // for datetime-local
    setLocation(event.location);
    setEventType(event.event_type);
  };

  const togglePublish = async (id: string, published: boolean) => {
    await supabase
      .from('events')
      .update({ published: !published })
      .eq('id', id);

    fetchEvents();
  };

  const deleteEvent = async (id: string) => {
    if (!confirm('Delete this event?')) return;

    await supabase.from('events').delete().eq('id', id);
    fetchEvents();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-[#1C5739] mb-8">
        Events Management
      </h1>

      {/* FORM */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-xl font-semibold text-[#1C5739] mb-4">
          {editingId ? 'Edit Event' : 'Add Event'}
        </h2>

        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2"
          />

          <textarea
            placeholder="Event description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2"
          />

          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded p-2"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded p-2"
          />

          <input
            type="text"
            placeholder="Event type (Tournament, Social, Training)"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="border rounded p-2"
          />

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="bg-[#1C5739] text-white px-6 py-2 rounded hover:opacity-90"
            >
              {editingId ? 'Update Event' : 'Publish Event'}
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
          Upcoming & Past Events
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="font-bold">{event.title}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(event.date).toLocaleString()} •{' '}
                    {event.location}
                  </p>
                  <p className="text-xs text-gray-500">
                    {event.event_type} •{' '}
                    {event.published ? 'Published' : 'Draft'}
                  </p>
                </div>

                <div className="flex gap-3 mt-3 md:mt-0">
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-[#1C5739] text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      togglePublish(event.id, event.published)
                    }
                    className="text-sm"
                  >
                    {event.published ? 'Unpublish' : 'Publish'}
                  </button>

                  <button
                    onClick={() => deleteEvent(event.id)}
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
