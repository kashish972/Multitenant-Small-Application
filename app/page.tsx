'use client';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-20 right-0 w-72 h-72 bg-green-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000"></div>

      {/* Glassmorphic card */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-white drop-shadow-lg">
          Multi-Tenant App
        </h1>
        <p className="text-white/80 mb-8 sm:text-lg">
          Login to your workspace or create a new tenant to get started.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => router.push('/login')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/create-tenant')}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Create Tenant
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
