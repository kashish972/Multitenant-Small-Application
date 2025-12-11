import dbConnect from "@/app/lib/db";
import Tenant from "@/app/models/tenant";
import User from "@/app/models/User";

interface Params {
  tenantId: string;
}

// ✅ Make the function async and await params
export async function GET(
  req: Request,
  context: { params: Params | Promise<Params> }
) {
  const paramsResolved = await context.params; // <== await here
  const tenantSlug = paramsResolved.tenantId;

  console.log("API HIT for tenant:", tenantSlug);

  await dbConnect();

  const tenant = await Tenant.findOne({ slug: tenantSlug });
  if (!tenant) {
    return new Response(JSON.stringify({ error: "Tenant not found" }), { status: 404 });
  }

  const users = await User.find({ tenantId: tenant._id });

  return new Response(JSON.stringify({ tenant, users }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
