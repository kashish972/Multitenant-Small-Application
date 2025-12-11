import dbConnect from "@/app/lib/db";
import tenant from "@/app/models/tenant";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await dbConnect();

  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok)
    return Response.json({ error: "Invalid password" }, { status: 401 });

  // GET TENANT USING user.tenantId
  const Tenant = await tenant.findById(user.tenantId);

  if (!Tenant)
    return Response.json({ error: "Tenant not found" }, { status: 404 });

  return Response.json({
    success: true,
    tenantId: Tenant._id,
    tenantName: Tenant.slug, // or tenant.name
    url: `/${Tenant.slug}`,
  });
}
