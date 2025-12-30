export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-[#1C5739] text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8">Admin</h2>

        <nav className="flex flex-col space-y-4">
          <a href="/admin/dashboard" className="hover:text-gray-300">
            Dashboard
          </a>
          <a href="/admin/news" className="hover:text-gray-300">
            News
          </a>
          <a href="/admin/events" className="hover:text-gray-300">
            Events
          </a>
          <a href="/admin/leadership" className="hover:text-gray-300">
            Leadership
          </a>
          <a href="/admin/gallery" className="hover:text-gray-300">
            Gallery
          </a>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}
