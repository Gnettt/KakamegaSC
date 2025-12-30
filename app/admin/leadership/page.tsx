'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

type Member = {
  id: string;
  name: string;
  position: string;
  committee: string;
  email?: string;
};

const MANAGEMENT_POSITIONS = [
  'Chairperson',
  'Vice-Chairperson',
  'Honorary Secretary',
  'Honorary Treasurer',
  'Chairman of Sports Committee',
  'Co-opted Member 1',
  'Co-opted Member 2',
];

const SPORTS_POSITIONS = [
  'Captain',
  'Vice-Captain',
  'Handicap Manager',
  'Green Keeper',
  'Lady Captain',
  'Vice Lady Captain',
];

export default function LeadershipAdmin() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    const { data } = await supabase
      .from('team_members')
      .select('*')
      .order('committee');

    setMembers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const saveMember = async (
    committee: string,
    position: string,
    name: string,
    email: string
  ) => {
    const existing = members.find(
      (m) => m.position === position && m.committee === committee
    );

    if (existing) {
      await supabase
        .from('team_members')
        .update({ name, email })
        .eq('id', existing.id);
    } else {
      await supabase.from('team_members').insert([
        {
          committee,
          position,
          name,
          email,
        },
      ]);
    }

    fetchMembers();
  };

  if (loading) {
    return <p className="text-center p-6">Loading leadership…</p>;
  }

  const renderCommittee = (
    title: string,
    committee: string,
    positions: string[]
  ) => (
    <div className="bg-white rounded-xl shadow p-6 mb-10">
      <h2 className="text-2xl font-bold text-[#1C5739] mb-6">{title}</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {positions.map((position) => {
          const existing = members.find(
            (m) => m.position === position && m.committee === committee
          );

          return (
            <div
              key={position}
              className="border rounded-lg p-4 hover:shadow transition"
            >
              <h3 className="font-semibold text-[#1C5739] mb-2">
                {position}
              </h3>

              <input
                defaultValue={existing?.name || ''}
                placeholder="Full name"
                className="w-full border p-2 rounded mb-2"
                id={`${committee}-${position}-name`}
              />

              <input
                defaultValue={existing?.email || ''}
                placeholder="Email (optional)"
                className="w-full border p-2 rounded mb-3"
                id={`${committee}-${position}-email`}
              />

              <button
                className="w-full bg-[#1C5739] text-white py-2 rounded hover:opacity-90"
                onClick={() => {
                  const nameInput = document.getElementById(
                    `${committee}-${position}-name`
                  ) as HTMLInputElement;

                  const emailInput = document.getElementById(
                    `${committee}-${position}-email`
                  ) as HTMLInputElement;

                  if (!nameInput.value.trim()) {
                    alert('Name is required');
                    return;
                  }

                  saveMember(
                    committee,
                    position,
                    nameInput.value,
                    emailInput.value
                  );
                }}
              >
                Save
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-[#1C5739] mb-10">
        Leadership Management
      </h1>

      {renderCommittee(
        'Management Committee',
        'Management Committee',
        MANAGEMENT_POSITIONS
      )}

      {renderCommittee(
        'Sports Committee',
        'Sports Committee',
        SPORTS_POSITIONS
      )}
    </div>
  );
}
