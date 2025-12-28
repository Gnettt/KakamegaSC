'use client';

import { useState } from 'react';
import Link from 'next/link';

const membershipCategories = [
  {
    title: 'Full Member',
    description: 'Complete access to all club facilities and services'
  },
  {
    title: 'Associate Member',
    description: 'Limited access with flexible membership terms'
  },
  {
    title: 'Junior Member',
    description: 'Special rates and programs for young members'
  },
  {
    title: 'Corporate Membership',
    description: 'Tailored packages for businesses and organizations'
  }
];

const benefits = [
  'Exclusive access to a members-only club community',
  'Great networking opportunities with diverse professionals',
  'Free access to conference and meeting rooms (subject to booking/availability)',
  'Subsidized services for accommodation, restaurant, and facilities',
  'Reciprocal access with 30+ members\' clubs across East Africa'
];

export default function Membership() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1C5739' }}>
            Membership
          </h1>
          <p className="text-gray-700 text-lg mb-8">
            Join Kakamega Sports Club and become part of a thriving community.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {membershipCategories.map((category, idx) => (
              <div
                key={idx}
                className="border-2 rounded-lg overflow-hidden transition-all cursor-pointer"
                style={{ borderColor: '#1C5739' }}
                onClick={() => setExpandedCategory(expandedCategory === idx ? null : idx)}
              >
                <div className="p-6" style={{ backgroundColor: '#1C5739' }}>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700">{category.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#f8f6f1' }} className="rounded-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#1C5739' }}>
              Benefits of Joining
            </h2>
            <ul className="space-y-4">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span style={{ color: '#1C5739' }} className="text-xl mt-1">✓</span>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border-2" style={{ borderColor: '#1C5739' }}>
            <div className="p-8" style={{ backgroundColor: '#1C5739' }}>
              <h2 className="text-2xl font-bold text-white">How to Join</h2>
            </div>
            <div className="p-8">
              <p className="text-gray-700 mb-6">
                Download and complete the membership form, then submit it to the club office or email it to us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/membership-form.pdf';
                    link.download = 'Kakamega_Sports_Club_Membership_Form.pdf';
                    link.click();
                  }}
                  className="px-6 py-3 font-semibold text-white rounded-lg transition hover:opacity-90"
                  style={{ backgroundColor: '#1C5739' }}
                >
                  Download Membership Form
                </button>
                <Link
                  href="/contact"
                  className="px-6 py-3 font-semibold text-white rounded-lg transition hover:opacity-90"
                  style={{ backgroundColor: '#1C5739' }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
