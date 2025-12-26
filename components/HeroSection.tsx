import Link from 'next/link';

export default function HeroSection() {
  return (
    <div
      className="relative h-96 md:h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-300 to-gray-400"
    >
      {/* Placeholder for hero image */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-600 opacity-30"></div>

      <div className="relative z-10 container-custom text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Building Bonds Beyond the Game
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Kakamega Sports Club is a welcoming members' club in the heart of Western Kenya bringing together sport, community, and great hospitality in a beautiful setting near Kakamega Town and the Kakamega Forest.
        </p>
        <Link
          href="/membership"
          className="inline-block px-8 py-3 font-semibold text-lg rounded-lg transition hover:opacity-90"
          style={{ backgroundColor: '#865807' }}
        >
          Become a Member
        </Link>
      </div>
    </div>
  );
}
