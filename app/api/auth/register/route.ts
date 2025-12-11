import dbConnect from "@/app/lib/db";
import Tenant from "@/app/models/tenant";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await dbConnect();

  const { email, password, tenantId } = await req.json();

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ error: "Invalid email format" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Password validation
  if (!password || password.length < 6) {
    return new Response(
      JSON.stringify({ error: "Password must be at least 6 characters long" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Find tenant
  const tenant = await Tenant.findById(tenantId);
  if (!tenant) {
    return new Response(
      JSON.stringify({ error: "Invalid tenant" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Enforce tenant-specific email domain (example: eki => @eki.com)
  const tenantDomain = `${tenant.slug}.com`; // You can adjust if needed
  if (!email.endsWith(`@${tenantDomain}`)) {
    return new Response(
      JSON.stringify({ error: `Email must be under @${tenantDomain}` }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Hash password and create user
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashed,
    tenantId: tenant._id,
  });

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
