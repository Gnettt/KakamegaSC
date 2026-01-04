'use client';

const facilities = [
  {
    name: 'Golf',
    image: './golf.jpg',
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
    image: './tennis.jpg',
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
    image: './squash.jpg',
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
    image: './other.jpg',
    description: 'Family-friendly spaces and indoor games.',
    details: [
      'Kids play area',
      'Indoor games: Darts, Pool, Table Tennis, Chess',
      'Club spaces for social events and gatherings',
    ],
    contact: 'Club Management',
  },
];

export default function SportsFacilities() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: '#1C5739' }}
        >
          Sports & Facilities
        </h1>

        <p className="text-gray-700 text-lg mb-16 max-w-2xl">
          Explore our sports and family-friendly facilities designed for
          active lifestyles and social connection.
        </p>

        <div className="space-y-16">
          {facilities.map((facility, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={facility.name}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  !isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* IMAGE */}
                <div className="w-full md:w-1/2 h-[220px] md:h-[280px] rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* TEXT */}
                <div className="w-full md:w-1/2">
                  <h2
                    className="text-2xl md:text-3xl font-semibold mb-3"
                    style={{ color: '#1C5739' }}
                  >
                    {facility.name}
                  </h2>

                  <p className="text-gray-700 mb-4 text-sm md:text-base">
                    {facility.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {facility.details.map((detail, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2"
                      >
                        <span
                          className="font-bold"
                          style={{ color: '#1C5739' }}
                        >
                          ✓
                        </span>
                        <span className="text-gray-700 text-sm md:text-base">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs md:text-sm text-gray-700">
                    <strong>Contact:</strong> {facility.contact}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
