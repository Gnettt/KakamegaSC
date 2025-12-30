'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return alert(error.message);
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1C5739]">
      <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-xl">
        <h1 className="text-3xl font-bold text-[#1C5739] mb-6">Admin Login</h1>

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-3 rounded mb-6"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-[#1C5739] text-white py-3 rounded hover:opacity-90"
        >
          Login
        </button>
      </div>
    </div>
  );
}
