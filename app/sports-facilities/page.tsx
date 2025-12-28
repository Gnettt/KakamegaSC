'use client';

import { useState } from 'react';

const facilities = [
  {
    name: 'Golf',
    icon: '⛳',
    description:
      'Enjoy our well-maintained 9-hole golf course with a friendly club culture.',
    details: [
      'Course details & pars',
      'Caddie services',
      'Junior golf development',
      'Competition days and training schedules',
    ],
    contact: 'Captain / Golf Office',
  },
  {
    name: 'Tennis',
    icon: '🎾',
    description:
      'A social and competitive tennis environment for all levels.',
    details: [
      'Coaching and training schedules',
      'Social play and tournaments',
      'Professional coaching available',
    ],
    contact: 'Tennis Captain',
  },
  {
    name: 'Squash',
    icon: '🏐',
    description: 'Fast-paced squash for fitness and competition.',
    details: [
      'Training schedules',
      'Social games and club ladders',
      'Coaching available',
    ],
    contact: 'Squash Captain',
  },
  {
    name: 'Other Facilities',
    icon: '🎮',
    description: 'Family-friendly spaces and indoor games.',
    details: [
      'Kids play area',
      'Indoor games: Darts, Pool Table, Table Tennis, Chess',
      'Club spaces for social events and gatherings',
    ],
    contact: 'Club Management',
  },
];

export default function SportsFacilities() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-custom">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: '#1C5739' }}
          >
            Sports & Facilities
          </h1>

          <p className="text-gray-700 text-lg mb-8 max-w-2xl">
            Explore our sports and family-friendly facilities designed for
            active lifestyles and social connection.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {facilities.map((facility, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={facility.name}
                  className="border-2 rounded-lg overflow-hidden transition-all"
                  style={{
                    borderColor: '#1C5739',
                    backgroundColor: isOpen ? '#f8f6f1' : 'white',
                  }}
                >
                  {/* ✅ HEADER ONLY IS CLICKABLE */}
                  <button
                    type="button"
                    className="w-full p-6 flex items-center justify-between text-left"
                    style={{ backgroundColor: '#1C5739' }}
                    onClick={() =>
                      setOpenIndex(isOpen ? null : idx)
                    }
                  >
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      <span className="text-3xl">
                        {facility.icon}
                      </span>
                      {facility.name}
                    </h3>

                    <span
                      className={`text-white text-xl transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      ⌄
                    </span>
                  </button>

                  {/* BODY */}
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">
                      {facility.description}
                    </p>

                    {isOpen && (
                      <div className="space-y-3 mt-4 pt-4 border-t border-gray-200">
                        {facility.details.map((detail, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3"
                          >
                            <span
                              className="font-bold"
                              style={{ color: '#1C5739' }}
                            >
                              ✓
                            </span>
                            <span className="text-gray-700">
                              {detail}
                            </span>
                          </div>
                        ))}

                        <p className="text-sm mt-4 pt-4 border-t border-gray-200">
                          <strong>Contact:</strong>{' '}
                          {facility.contact}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
