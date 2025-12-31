'use client';
import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Hide sidebar on login page
  const showSidebar = pathname !== '/admin/login';

  return (
    <div className="flex min-h-screen bg-gray-50">
      {showSidebar && (
        <aside className="fixed inset-y-0 left-0 w-64 bg-[#1C5739] text-white p-6 md:translate-x-0 transition-transform">
          <h2 className="text-2xl font-bold mb-8">Admin</h2>
          <nav className="flex flex-col space-y-4">
            <Link href="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <Link href="/admin/news" className="hover:text-gray-300">News</Link>
            <Link href="/admin/events" className="hover:text-gray-300">Events</Link>
            <Link href="/admin/leadership" className="hover:text-gray-300">Leadership</Link>
            <Link href="/admin/gallery" className="hover:text-gray-300">Gallery</Link>
          </nav>
        </aside>
      )}

      {showSidebar && (
        <button
          className="fixed top-4 left-4 md:hidden bg-[#1C5739] text-white p-2 rounded"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      )}

      <main className={`flex-1 p-6 overflow-y-auto ${showSidebar ? 'md:ml-64' : ''}`}>
        {children}
      </main>
    </div>
  );
}
