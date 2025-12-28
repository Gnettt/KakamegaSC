'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  committee: string;
  email?: string;
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
        setManagement(
          members.filter(m => m.committee === 'Management')
        );
        setSports(
          members.filter(m => m.committee === 'Sports')
        );
      }

      setLoading(false);
    };

    fetchMembers();
  }, []);

  const getLeaderForPosition = (
    members: TeamMember[],
    position: string
  ) => members.find(m => m.position === position);

  const PositionRow = ({
    position,
    member,
  }: {
    position: string;
    member?: TeamMember;
  }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-4">
      <p className="font-semibold text-gray-800">
        {position}
      </p>

      {member ? (
        <div>
          <p
            className="font-bold text-lg"
            style={{ color: '#1C5739' }}
          >
            {member.name}
          </p>
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-sm text-gray-600 hover:underline"
            >
              {member.email}
            </a>
          )}
        </div>
      ) : (
        <p className="italic text-sm text-gray-500">
          Position currently vacant
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: '#1C5739' }}
        >
          Leadership
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <>
            {/* Management Committee */}
            <div className="mb-20">
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: '#1C5739' }}
              >
                Management Committee
              </h2>

              <div className="bg-white rounded-lg shadow-sm divide-y">
                {MANAGEMENT_POSITIONS.map(position => (
                  <PositionRow
                    key={position}
                    position={position}
                    member={getLeaderForPosition(
                      management,
                      position
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Sports Committee */}
            <div>
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: '#1C5739' }}
              >
                Sports Committee
              </h2>

              <div className="bg-white rounded-lg shadow-sm divide-y">
                {SPORTS_POSITIONS.map(position => (
                  <PositionRow
                    key={position}
                    position={position}
                    member={getLeaderForPosition(
                      sports,
                      position
                    )}
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
