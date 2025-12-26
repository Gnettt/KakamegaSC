'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
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
          subject: '',
          message: ''
        });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#865807' }}>
            Contact Us
          </h1>
          <p className="text-gray-700 text-lg mb-12">
            Get in touch with Kakamega Sports Club. We'd love to hear from you!
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-white rounded-lg shadow-sm border-t-4" style={{ borderColor: '#865807' }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#865807' }}>
                📍 Location
              </h3>
              <p className="text-gray-700 text-sm">
                P.O. Box 58-50100<br />
                Kakamega, Kenya
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border-t-4" style={{ borderColor: '#865807' }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#865807' }}>
                📞 Phone
              </h3>
              <p className="text-gray-700 text-sm">
                +254 703 267 336<br />
                +254 738 267 336
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border-t-4" style={{ borderColor: '#865807' }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#865807' }}>
                📧 Email
              </h3>
              <p className="text-gray-700 text-sm">
                <a href="mailto:reception@kakamegasportsclub.com" className="hover:underline">
                  reception@kakamegasportsclub.com
                </a>
                <br />
                <a href="mailto:manager@kakamegasportsclub.com" className="hover:underline">
                  manager@kakamegasportsclub.com
                </a>
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white border-2" style={{ borderColor: '#865807' }}>
              <div className="p-6" style={{ backgroundColor: '#865807' }}>
                <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#865807' } as any}
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
                    style={{ '--tw-ring-color': '#865807' } as any}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#865807' } as any}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#865807' } as any}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#865807' } as any}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 font-semibold text-white rounded-lg transition hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: '#865807' }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>

                {submitted && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                    ✓ Thank you! We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>

            {/* Info Box */}
            <div>
              <div className="p-8 rounded-lg" style={{ backgroundColor: '#f8f6f1' }}>
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#865807' }}>
                  Office Hours
                </h2>
                <p className="text-gray-700 mb-6">
                  Our team is available during these hours to assist you:
                </p>
                <div className="bg-white p-4 rounded-lg border-l-4 mb-6" style={{ borderColor: '#865807' }}>
                  <p className="font-semibold text-gray-800">Monday – Friday</p>
                  <p className="text-gray-600">8:00 AM – 5:00 PM</p>
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 mb-6" style={{ borderColor: '#865807' }}>
                  <p className="font-semibold text-gray-800">Saturday & Sunday</p>
                  <p className="text-gray-600">By Appointment</p>
                </div>

                <h3 className="text-xl font-bold mb-4" style={{ color: '#865807' }}>
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white transition"
                    style={{ backgroundColor: '#865807' }}
                  >
                    f
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white transition"
                    style={{ backgroundColor: '#865807' }}
                  >
                    📷
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
