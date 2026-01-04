"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

type Leader = {
  leader_id: number;
  image: string | null; // STORAGE PATH
  role: string;
  full_name: string;
  email: string | null;
};

const MANAGEMENT_ROLES = [
  'Chairperson',
  'Vice-Chairperson',
  'Honorable Secretary',
  'Honorable Treasurer',
  'Chairman of Sports Committee',
  'Co-opted Member 1',
  'Co-opted Member 2',
];

const SPORTS_ROLES = [
  'Captain',
  'Vice-Captain',
  'Handicap Manager',
  'Green Keeper',
  'Lady Captain',
  'Vice Lady Captain',
  'Junior Convenor',
];

export default function LeadershipPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      const { data } = await supabase.from('leadership').select('*');
      setLeaders(data || []);
      setLoading(false);
    };

    fetchLeaders();
  }, []);

  const getImageUrl = (path: string) =>
    supabase.storage.from('leadership').getPublicUrl(path).data.publicUrl;

  const getLeaderByRole = (role: string) =>
    leaders.find(l => l.role === role);

  const RoleCard = ({ role }: { role: string }) => {
    const leader = getLeaderByRole(role);

    return (
      <div className="flex items-center gap-6 p-6">
        {leader?.image ? (
          <img
            src={getImageUrl(leader.image)}
            className="w-40 h-40 rounded-full object-cover"
          />
        ) : (
          <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-sm">
            No Image
          </div>
        )}

        <div>
          <p className="font-semibold text-lg">{role}</p>
          {leader ? (
            <>
              <p className="font-bold text-[#1C5739] text-xl">{leader.full_name}</p>
            </>
          ) : (
            <p className="italic text-sm text-gray-500">Vacant</p>
          )}
        </div>
      </div>
    );
  };

  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-5xl font-bold text-[#1C5739] mb-10">
        Leadership
      </h1>

      <h2 className="text-3xl font-bold mb-4">Management Committee</h2>
      <div className="bg-white rounded shadow divide-y mb-12">
        {MANAGEMENT_ROLES.map(role => (
          <RoleCard key={role} role={role} />
        ))}
      </div>

      <h2 className="text-3xl font-bold mb-4">Sports Committee</h2>
      <div className="bg-white rounded shadow divide-y">
        {SPORTS_ROLES.map(role => (
          <RoleCard key={role} role={role} />
        ))}
      </div>
    </div>
  );
}
