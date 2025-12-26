import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#865807' }} className="text-white">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Kakamega Sports Club</h3>
            <p className="text-gray-200 text-sm">
              Western Kenya's premier members' club bringing together sport, community, and hospitality.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-200 hover:text-white transition">Home</Link></li>
              <li><Link href="/about" className="text-gray-200 hover:text-white transition">About</Link></li>
              <li><Link href="/events" className="text-gray-200 hover:text-white transition">Events</Link></li>
              <li><Link href="/membership" className="text-gray-200 hover:text-white transition">Membership</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <div className="text-sm text-gray-200 space-y-2">
              <p>P.O. Box 58-50100, Kakamega, Kenya</p>
              <p>Tel: +254 703 267 336 / +254 738 267 336</p>
              <p>Email: reception@kakamegasportsclub.com</p>
              <p>Hours: 8:00am – 5:00pm</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-200">
              © {currentYear} Kakamega Sports Club. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" className="text-gray-200 hover:text-white transition">
                Facebook
              </a>
              <a href="https://instagram.com" className="text-gray-200 hover:text-white transition">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
