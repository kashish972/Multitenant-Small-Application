'use client';

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddUserProps {
  tenantId: string;
}

export default function AddUserForm({ tenantId }: AddUserProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function addUser() {
    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, tenantId }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || data.error) {
        toast.error(data.error || "Failed to add user");
        return;
      }

      toast.success("User added successfully!");
      setEmail("");
      setPassword("");
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="mt-6 relative">
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

      <h2 className="text-xl font-semibold mb-4 text-gray-900">Add User</h2>

      <div className="bg-gray-100/50 backdrop-blur-lg border border-gray-200 p-6 rounded-2xl shadow-md flex flex-col gap-4">
        {/* Email Field */}
        <div className="flex flex-col">
          <Label className="text-gray-800 mb-1">Email</Label>
          <Input
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/80 text-gray-900 border-gray-300 placeholder-gray-500 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col">
          <Label className="text-gray-800 mb-1">Password</Label>
          <Input
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/80 text-gray-900 border-gray-300 placeholder-gray-500 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>

        <Button
          onClick={addUser}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          {loading ? "Adding..." : "Add User"}
        </Button>
      </div>
    </div>
  );
}
