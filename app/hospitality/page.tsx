'use client';

import { useState } from 'react';

export default function Hospitality() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/booking-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          eventDate: '',
          guestCount: '',
          message: ''
        });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1C5739' }}>
            Clubhouse & Hospitality
          </h1>
          <p className="text-gray-700 text-lg mb-8">
            Exceptional dining and event spaces for memorable experiences.
          </p>

          {/* Alternating Image Sections */}
          <div className="space-y-16">
            {/* Restaurant & Bar */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#1C5739' }}>
                  Restaurant & Bar
                </h2>
                <p className="text-gray-700 mb-4">
                  Enjoy great meals and refreshments in a relaxed, welcoming atmosphere. Our chef prepares quality dishes using fresh ingredients, complemented by a well-stocked bar featuring local and international beverages.
                </p>
              </div>
              <div className="md:w-1/2 h-56 md:h-64 rounded-xl overflow-hidden shadow">
                <img
                  src="/images/restaurant.jpg"
                  alt="Restaurant & Bar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Conference Halls */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:flex-row-reverse">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#1C5739' }}>
                  Conference Halls
                </h2>
                <p className="text-gray-700 mb-4">
                  Catch live sports, enjoy drinks, and connect with fellow members and guests. Our sports bar features multiple screens, comfortable seating, and a vibrant atmosphere perfect for watching the big match.
                </p>
              </div>
              <div className="md:w-1/2 h-56 md:h-64 rounded-xl overflow-hidden shadow">
                <img
                  src="/images/conference.jpg"
                  alt="Conference Halls"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Venue Hire & Events Cards */}
          <div style={{ backgroundColor: '#f8f6f1' }} className="p-8 rounded-lg my-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#1C5739' }}>
              Venue Hire & Events
            </h2>
            <p className="text-gray-700 mb-6">
              Our versatile facilities are perfect for hosting your special occasions and business events.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: '💼', title: 'Meetings & Conferences', desc: 'Professional spaces with full AV facilities' },
                { icon: '💍', title: 'Weddings', desc: 'Elegant settings for your special day' },
                { icon: '🎯', title: 'Corporate Days', desc: 'Team building and company events' },
                { icon: '🎉', title: 'Private Functions', desc: 'Birthdays, anniversaries, and celebrations' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg shadow">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Inquiry Form */}
          <div className="bg-white border-2" style={{ borderColor: '#1C5739' }}>
            <div className="p-8" style={{ backgroundColor: '#1C5739' }}>
              <h2 className="text-2xl font-bold text-white">Booking Inquiry Form</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#1C5739' } as any}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#1C5739' } as any}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#1C5739' } as any}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Event Type</label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#1C5739' } as any}
                  >
                    <option value="">Select event type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Conference">Conference</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Private Function">Private Function</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Event Date</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#1C5739' } as any}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Guest Count</label>
                  <input
                    type="number"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#1C5739' } as any}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Additional Details</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#1C5739' } as any}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 font-semibold text-white rounded-lg transition hover:opacity-90"
                style={{ backgroundColor: '#1C5739' }}
              >
                Send Booking Inquiry
              </button>

              {submitted && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                  Thank you! Your booking inquiry has been sent successfully.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
