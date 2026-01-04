'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section
      className="
        relative
        flex
        items-center
        justify-center
        overflow-hidden
        h-[520px]
        md:h-[400px]
      "
      style={{
        marginTop: 'var(--nav-height)',
      }}
    >
      {/* 🔹 Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/background.jpg')",
        }}
      />

      {/* 🔹 Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-4xl px-6 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
        >
          Building Bonds Beyond the Game
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Kakamega Sports Club is a welcoming members' club in the heart of Western Kenya, bringing together sport, community, and great hospitality in a beautiful setting near Kakamega Town and the Kakamega Forest.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        >
          <Link
            href="/membership"
            className="inline-block px-8 py-3 font-semibold text-lg rounded-lg transition hover:opacity-90"
            style={{ backgroundColor: '#1C5739' }}
          >
            Become a Member
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
