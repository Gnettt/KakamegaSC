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

export default function Leadership() {
  const [management, setManagement] = useState<TeamMember[]>([]);
  const [sports, setSports] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL || '',
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
        );

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
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const MemberCard = ({ member }: { member: TeamMember }) => (
    <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition border-t-4" style={{ borderColor: '#865807' }}>
      <h3 className="text-xl font-bold" style={{ color: '#865807' }}>
        {member.name}
      </h3>
      <p className="font-semibold text-gray-700 mt-1">{member.position}</p>
      {member.email && (
        <p className="text-sm text-gray-600 mt-2">
          <a href={`mailto:${member.email}`} className="hover:underline">
            {member.email}
          </a>
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#865807' }}>
            Leadership
          </h1>
          <p className="text-gray-700 text-lg mb-12">
            Meet the dedicated teams leading Kakamega Sports Club.
          </p>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading leadership information...</p>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#865807' }}>
                  Management Committee
                </h2>
                {management.length === 0 ? (
                  <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-600">
                    <p>Management committee members coming soon.</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {management.map(member => (
                      <MemberCard key={member.id} member={member} />
                    ))}
                  </div>
                )}
                <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: '#f8f6f1' }}>
                  <h3 className="font-semibold mb-3" style={{ color: '#865807' }}>
                    Management Committee Positions:
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• The Chairperson</li>
                    <li>• The Vice-Chairperson</li>
                    <li>• The Honorary Secretary</li>
                    <li>• The Honorary Treasurer</li>
                    <li>• The Chairman of Sports Committee</li>
                    <li>• Two co-opted members (for expertise/special interests)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#865807' }}>
                  Sports Committee
                </h2>
                {sports.length === 0 ? (
                  <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-600">
                    <p>Sports committee members coming soon.</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sports.map(member => (
                      <MemberCard key={member.id} member={member} />
                    ))}
                  </div>
                )}
                <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: '#f8f6f1' }}>
                  <h3 className="font-semibold mb-3" style={{ color: '#865807' }}>
                    Sports Committee Positions:
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• The Captain</li>
                    <li>• The Vice-Captain</li>
                    <li>• The Handicap Manager</li>
                    <li>• The Green Keeper</li>
                    <li>• The Lady Captain</li>
                    <li>• The Vice Lady Captain</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
