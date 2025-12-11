'use client';

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CreateTenant() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  function generateSlug(value: string) {
    const s = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(s);
  }

  async function createTenant() {
    if (!name || !slug) {
      toast.error("Tenant name and slug are required!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/tenant/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || data.error) {
        toast.error(data.error || "Failed to create tenant");
        return;
      }

      toast.success("Tenant created successfully!");
      router.push(`/${slug}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 overflow-hidden p-4">
      {/* Floating decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-sky-500/20 rounded-full filter blur-3xl mix-blend-multiply animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-400/20 rounded-full filter blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>

      {/* Card */}
      <Card className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl">
        <CardHeader>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-lg mb-2">
            Create Tenant
          </h1>
          <p className="text-white/80 text-sm sm:text-base">
            Start your workspace by creating a tenant.
          </p>
        </CardHeader>

        <CardContent className="space-y-5 mt-4">
          {/* Tenant Name */}
          <div className="flex flex-col">
            <Label className="text-white/90 mb-5">Tenant Name</Label>
            <Input
              placeholder="Google"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                generateSlug(e.target.value);
              }}
              className="bg-white/20 placeholder-white/50 text-white border-white/30 focus:border-blue-400 focus:ring-blue-400"
            />
          </div>

          {/* Slug */}
          <div className="flex flex-col">
            <Label className="text-white/90 mb-5">Slug (URL)</Label>
            <Input
              placeholder="google"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="bg-white/20 placeholder-white/50 text-white border-white/30 focus:border-blue-400 focus:ring-blue-400"
            />
            <p className="text-xs text-white/60 mt-1">
              Your workspace URL: <span className="font-semibold">/{slug}</span>
            </p>
          </div>

          {/* Button */}
          <Button
            type="button"
            disabled={loading}
            onClick={createTenant}
            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            {loading ? "Creating..." : "Create Tenant"}
          </Button>
        </CardContent>
      </Card>

      {/* Toast container */}
     <ToastContainer
  aria-label="notification"
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable
  theme="colored"
/>


      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px,0px) scale(1); }
          33% { transform: translate(30px,-50px) scale(1.1); }
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
  );
}
