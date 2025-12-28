export default function About() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1C5739' }}>
            About Kakamega Sports Club
          </h1>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1C5739' }}>
                Our History
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kakamega Sports Club, established in 1932, is Western Kenya's premier members' club. The club offers a lush 9-hole golf course, tennis and squash courts, a restaurant and bar, and accommodation. It remains a social hub and historic sporting landmark near Kakamega Town and the Kakamega Forest known for its colonial-era charm and modern amenities.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1C5739' }}>
                What We Stand For
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-3 mt-1" style={{ color: '#1C5739' }}>✓</span>
                  <span className="text-gray-700">Community, sportsmanship, and inclusivity</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1" style={{ color: '#1C5739' }}>✓</span>
                  <span className="text-gray-700">Quality facilities and memorable experiences</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1" style={{ color: '#1C5739' }}>✓</span>
                  <span className="text-gray-700">A vibrant social environment for members and guests</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: '#f8f6f1' }}>
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#1C5739' }}>
            Our Facilities
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Golf Course', desc: '9-hole scenic course with professional management' },
              { title: 'Tennis Courts', desc: 'Well-maintained courts for social and competitive play' },
              { title: 'Squash Courts', desc: 'Modern squash facilities for all levels' },
              { title: 'Clubhouse', desc: 'Comfortable spaces for dining and gatherings' },
              { title: 'Restaurant & Bar', desc: 'Quality meals in a welcoming atmosphere' },
              { title: 'Accommodation', desc: 'Comfortable rooms for members and guests' }
            ].map((facility, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#1C5739' }}>
                  {facility.title}
                </h3>
                <p className="text-gray-600 text-sm">{facility.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
