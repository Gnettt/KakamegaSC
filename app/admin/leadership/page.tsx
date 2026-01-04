'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

type Leader = {
  leader_id: number;
  image: string | null; // STORAGE PATH
  role: string;
  full_name: string;
  email: string | null;
};

export default function LeadershipAdmin() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [role, setRole] = useState('');
  const [fullName, setFullName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all leaders
  const fetchLeaders = async () => {
    const { data } = await supabase.from('leadership').select('*').order('leader_id');
    setLeaders(data || []);
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  const resetForm = () => {
    setRole('');
    setFullName('');
    setFile(null);
    setEditingId(null);
  };

  const getImageUrl = (path: string) =>
    supabase.storage.from('leadership').getPublicUrl(path).data.publicUrl;

  const saveLeader = async () => {
    if (!role || !fullName) {
      alert('Role and name required');
      return;
    }

    setLoading(true);
    let imagePath: string | null = null;

    if (file) {
      const ext = file.name.split('.').pop();
      imagePath = `leaders/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('leadership')
        .upload(imagePath, file, { upsert: true });

      if (uploadError) {
        alert(uploadError.message);
        setLoading(false);
        return;
      }
    }

    if (editingId) {
      // Update existing leader
      await supabase.from('leadership')
        .update({
          role,
          full_name: fullName,
          image: imagePath ?? leaders.find(l => l.leader_id === editingId)?.image
        })
        .eq('leader_id', editingId);
    } else {
      // Insert new leader
      await supabase.from('leadership').insert({
        role,
        full_name: fullName,
        image: imagePath,
      });
    }

    resetForm();
    setLoading(false);
    fetchLeaders();
  };

  const handleEdit = (leader: Leader) => {
    setEditingId(leader.leader_id);
    setRole(leader.role);
    setFullName(leader.full_name);
    setFile(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this leader?')) return;
    await supabase.from('leadership').delete().eq('leader_id', id);
    fetchLeaders();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-[#1C5739] mb-6">Leadership Admin</h1>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <input
          className="border p-2 w-full mb-3"
          placeholder="Role"
          value={role}
          onChange={e => setRole(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Full name"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />

        <input
          type="file"
          onChange={e => setFile(e.target.files?.[0] || null)}
        />

        <div className="flex gap-4 mt-4">
          <button
            onClick={saveLeader}
            disabled={loading}
            className="bg-[#1C5739] text-white px-6 py-2 rounded"
          >
            {loading ? 'Saving…' : editingId ? 'Update Leader' : 'Save Leader'}
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

      {/* Existing Leaders */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {leaders.map(l => (
          <div key={l.leader_id} className="bg-white p-4 rounded shadow relative">
            {l.image && (
              <img
                src={getImageUrl(l.image)}
                className="h-32 w-32 rounded-full object-cover mb-3"
              />
            )}
            <p className="font-bold">{l.full_name}</p>
            <p className="text-sm text-gray-600">{l.role}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(l)}
                className="text-[#1C5739] text-sm border px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(l.leader_id)}
                className="text-red-600 text-sm border px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
