'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  committee: string;
  email?: string;
  image_url?: string; // add image URL field
}

const MANAGEMENT_POSITIONS = [
  'Chairperson',
  'Vice-Chairperson',
  'Honorary Secretary',
  'Honorary Treasurer',
  'Chairman of Sports Committee',
  'Co-opted Member',
];

const SPORTS_POSITIONS = [
  'Captain',
  'Vice-Captain',
  'Handicap Manager',
  'Green Keeper',
  'Lady Captain',
  'Vice Lady Captain',
];

export default function LeadershipPage() {
  const [management, setManagement] = useState<TeamMember[]>([]);
  const [sports, setSports] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*');

      if (error) {
        console.error('Error fetching team members:', error);
      } else {
        const members = data || [];
        setManagement(members.filter(m => m.committee === 'Management'));
        setSports(members.filter(m => m.committee === 'Sports'));
      }
      setLoading(false);
    };

    fetchMembers();
  }, []);

  const getLeaderForPosition = (members: TeamMember[], position: string) =>
    members.find(m => m.position === position);

  const PositionCard = ({
    position,
    member,
  }: {
    position: string;
    member?: TeamMember;
  }) => (
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 p-4">
      {member?.image_url ? (
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow flex-shrink-0">
          <img
            src={member.image_url}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}

      <div className="flex-1">
        <p className="font-semibold text-gray-800">{position}</p>
        {member ? (
          <>
            <p className="font-bold text-lg text-[#1C5739]">{member.name}</p>
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="text-sm text-gray-600 hover:underline"
              >
                {member.email}
              </a>
            )}
          </>
        ) : (
          <p className="italic text-sm text-gray-500">Position currently vacant</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-[#1C5739]">
          Leadership
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <>
            {/* Management Committee */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-[#1C5739]">
                Management Committee
              </h2>

              <div className="bg-white rounded-xl shadow divide-y">
                {MANAGEMENT_POSITIONS.map(position => (
                  <PositionCard
                    key={position}
                    position={position}
                    member={getLeaderForPosition(management, position)}
                  />
                ))}
              </div>
            </div>

            {/* Sports Committee */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-[#1C5739]">
                Sports Committee
              </h2>

              <div className="bg-white rounded-xl shadow divide-y">
                {SPORTS_POSITIONS.map(position => (
                  <PositionCard
                    key={position}
                    position={position}
                    member={getLeaderForPosition(sports, position)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
