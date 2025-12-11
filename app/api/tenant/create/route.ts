import dbConnect from "@/app/lib/db";
import Tenant from "@/app/models/tenant";

export async function POST(req: Request) {
  console.log("API HIT: Tenant Create");

  await dbConnect(); // Connect to MongoDB
  console.log("Connecting to MongoDB...");

  const { name, slug } = await req.json();
  console.log("Received:", name, slug);

  if (!name || !slug) {
    return new Response(JSON.stringify({ error: "Name and slug required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Check if slug already exists
  const existing = await Tenant.findOne({ slug });
  if (existing) {
    return new Response(
      JSON.stringify({ error: "Tenant slug already exists" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const tenant = await Tenant.create({ name, slug });
  console.log("Created tenant:", tenant);

  return new Response(JSON.stringify(tenant), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
