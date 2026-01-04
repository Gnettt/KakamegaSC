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
  created_at: string;
};

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState('');

  const fetchEvents = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    setEvents(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setImageFile(null);
    setImagePath(null);
    setTitle('');
    setDescription('');
    setDate('');
    setLocation('');
    setEventType('');
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return imagePath;

    const ext = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from('events')
      .upload(fileName, imageFile, { upsert: true });

    if (error) {
      alert(error.message);
      return null;
    }

    return fileName; // STORE PATH ONLY
  };

  const handleSubmit = async () => {
    if (!title || !description || !date || !location || !eventType) {
      alert('All fields are required');
      return;
    }

    const finalImagePath = await uploadImage();

    if (editingId) {
      await supabase
        .from('events')
        .update({
          image: finalImagePath,
          title,
          description,
          date,
          location,
          event_type: eventType,
        })
        .eq('id', editingId);
    } else {
      await supabase.from('events').insert({
        image: finalImagePath,
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
    setImagePath(event.image);
    setTitle(event.title);
    setDescription(event.description);
    setDate(event.date.slice(0, 16));
    setLocation(event.location);
    setEventType(event.event_type);
  };

  const togglePublish = async (id: number, published: boolean) => {
    await supabase
      .from('events')
      .update({ published: !published })
      .eq('id', id);
    fetchEvents();
  };

  const deleteEvent = async (id: number) => {
    if (!confirm('Delete this event?')) return;
    await supabase.from('events').delete().eq('id', id);
    fetchEvents();
  };

  const getImageUrl = (path: string) =>
    supabase.storage.from('events').getPublicUrl(path).data.publicUrl;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-[#1C5739] mb-8">Events Management</h1>

      {/* FORM */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit Event' : 'Add Event'}
        </h2>

        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Event Image
            </label>

            {imagePath && (
              <img
                src={getImageUrl(imagePath)}
                className="w-32 h-32 object-cover rounded mb-2"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="border p-2 rounded w-full"
            />
          </div>

          <input
            className="border p-2 rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border p-2 rounded"
            rows={4}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="datetime-local"
            className="border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="Event Type"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          />

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="bg-[#1C5739] text-white px-6 py-2 rounded"
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

      {/* LIST */}
      <div className="bg-white rounded-xl shadow p-6">
        {loading ? (
          <p>Loading…</p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="border rounded p-4 flex justify-between mb-3"
            >
              <div className="flex gap-4">
                {event.image && (
                  <img
                    src={getImageUrl(event.image)}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className="font-bold">{event.title}</h3>
                  <p className="text-sm text-gray-600">
                    {event.location} • {event.event_type}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => handleEdit(event)}>Edit</button>
                <button
                  onClick={() => togglePublish(event.id, event.published)}
                >
                  {event.published ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  className="text-red-600"
                  onClick={() => deleteEvent(event.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
