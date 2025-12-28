'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/sports-facilities', label: 'Sports & Facilities' },
    { href: '/membership', label: 'Membership' },
    { href: '/events', label: 'Events' },
    { href: '/hospitality', label: 'Hospitality' },
    { href: '/news', label: 'News' },
    { href: '/leadership', label: 'Leadership' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/downloads', label: 'Downloads' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container-custom">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-12 h-12 relative">
              <Image
                src="/ksc_logo.png"
                alt="Kakamega Sports Club Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-sm leading-tight" style={{ color: '#1C5739' }}>
                Kakamega<br />Sports Club
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 transition"
                style={{ color: '#1C5739' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          
          

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ backgroundColor: isMenuOpen ? '#f8f6f1' : 'transparent' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:transition py-2"
                onClick={() => setIsMenuOpen(false)}
                style={{ color: '#1C5739' }}
              >
                {link.label}
              </Link>
            ))}
           
          </nav>
        )}
      </div>
    </header>
  );
}
