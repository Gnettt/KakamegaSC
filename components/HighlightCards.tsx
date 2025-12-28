import Link from 'next/link';

const highlights = [
  {
    icon: '⛳',
    title: 'Golf Course',
    description: 'A scenic 9-hole course for members and guests',
    link: '/sports-facilities'
  },
  {
    icon: '🍽️',
    title: 'Clubhouse & Restaurant',
    description: 'Great food, comfort, and community',
    link: '/hospitality'
  },
  {
    icon: '🍺',
    title: 'Sports Bar',
    description: 'Watch sports, relax, and connect',
    link: '/hospitality'
  },
  {
    icon: '👥',
    title: 'Membership',
    description: 'Join a thriving network of members',
    link: '/membership'
  },
  {
    icon: '💼',
    title: 'Conference Facilities',
    description: 'Meetings, workshops, and corporate events',
    link: '/hospitality'
  },
  {
    icon: '🎉',
    title: 'Grounds for Hire',
    description: 'Weddings, parties, and special events',
    link: '/hospitality'
  }
];

export default function HighlightCards() {
  return (
    <section className="section-padding" style={{ backgroundColor: '#f8f6f1' }}>
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: '#1C5739' }}>
          Quick Highlights
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, idx) => (
            <Link key={idx} href={item.link}>
              <div
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer h-full"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#1C5739' }}>
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
