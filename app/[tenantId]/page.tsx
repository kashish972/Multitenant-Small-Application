'use client';

import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import AddUserForm from "./AddUserForm";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

interface Tenant {
  _id: string;
  name: string;
  slug: string;
}

interface User {
  _id: string;
  email: string;
}

export default function TenantHome() {
  const { tenantId } = useParams();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTenant() {
      if (!tenantId) return;

      try {
        const res = await fetch(`/api/tenant/${tenantId}`);
        if (!res.ok) throw new Error("Tenant not found");
        const data = await res.json();
        setTenant(data.tenant);
        setUsers(data.users || []);
      } catch (err) {
        console.error(err);
        setTenant(null);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTenant();
  }, [tenantId]);

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "_id",
        cell: (info) => users.findIndex((u) => u._id === info.getValue()) + 1,
      },
      {
        header: "Email",
        accessorKey: "email",
      },
    ],
    [users]
  );

  if (loading)
    return <p className="text-center mt-20 text-gray-600 text-lg">Loading...</p>;
  if (!tenant)
    return <p className="text-center mt-20 text-red-600 text-lg">Tenant not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10 relative overflow-hidden">
      {/* Floating decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/20 rounded-full filter blur-3xl mix-blend-multiply animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-200/20 rounded-full filter blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {tenant.name} Workspace
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your users and workspace settings
        </p>

        {/* Users Table with glassmorphism */}
        <div className="mb-8 p-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
          <DataTable columns={columns} data={users} />
        </div>

        {/* Add User Form */}
        <div className="mb-6 p-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
          <AddUserForm tenantId={tenant._id.toString()} />
        </div>
      </div>

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
  );
}
