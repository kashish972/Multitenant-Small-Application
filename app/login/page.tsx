/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || data.error) {
        toast.error(data.error || "Login failed");
        return;
      }

      toast.success("Login successful!");
      setTimeout(() => {
        if (data.url) window.location.href = data.url;
      }, 1000);
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 px-4">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        aria-label="toast"
      />

      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl relative">
        <h1 className="text-3xl font-extrabold text-white drop-shadow-lg mb-6 text-center">
          Login
        </h1>

        <div className="space-y-5">
          {/* Email Field */}
          <div className="flex flex-col relative z-10">
  <Label className="text-white/90 mb-1">Email</Label>
  <Input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="bg-white/20 text-white border-white/30 focus:border-blue-400 focus:ring-blue-400 placeholder-white/70"
  />
</div>


          {/* Password Field */}
          <div className="flex flex-col">
            <Label className="text-white/90 mb-1">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/20 text-white border-white/30 focus:border-blue-400 focus:ring-blue-400 placeholder-white/70"
            />
          </div>

          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>

        <p className="text-center text-white/70 text-sm mt-6">
          Don&apos;t have a tenant? <a href="/create-tenant" className="text-blue-400 hover:underline">Create one</a>
        </p>

        {/* Floating blobs */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-sky-500/20 rounded-full filter blur-3xl mix-blend-multiply animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-green-400/20 rounded-full filter blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>

        <style jsx>{`
          @keyframes blob {
            0%, 100% { transform: translate(0px,0px) scale(1); }
            33% { transform: translate(20px,-30px) scale(1.1); }
            66% { transform: translate(-20px,20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 8s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}</style>
      </div>
    </div>
  );
}
