import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="section-padding" style={{ backgroundColor: '#865807' }}>
      <div className="container-custom text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Join Kakamega Sports Club?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Experience exclusive access to world-class facilities, a vibrant community, and unforgettable memories.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/membership"
            className="px-8 py-3 font-semibold rounded-lg transition bg-white"
            style={{ color: '#865807' }}
          >
            Learn About Membership
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 font-semibold rounded-lg transition border-2 border-white hover:bg-white hover:text-amber-700"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
