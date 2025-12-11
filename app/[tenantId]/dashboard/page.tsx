'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Tenant {
  _id: string;
  name: string;
  slug: string;
}

export default function Dashboard() {
  const { tenantId } = useParams(); // gets the tenant slug from the URL
  const [tenant, setTenant] = useState<Tenant | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tenantId) return;

    const fetchTenant = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/tenant/${tenantId}`);
        const data = await res.json();
        if (res.ok) {
          setTenant(data.tenant);
          setUsers(data.users);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, [tenantId]);

  if (loading) return <p className="p-10">Loading...</p>;
  if (!tenant) return <p className="p-10 text-red-500">Tenant not found</p>;

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-4">{tenant.name} Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Manage users and view tenant details.
        </p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          {users.length === 0 ? (
            <p className="text-gray-500">No users yet.</p>
          ) : (
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user._id}
                  className="p-3 border rounded-md flex justify-between items-center hover:bg-gray-50"
                >
                  <span>{user.email}</span>
                  <span className="text-gray-400 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">
            Add User
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
}
