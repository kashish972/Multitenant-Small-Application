"use server";

import dbConnect from "../lib/db";
import tenant from "../models/tenant";



export async function createTenant(data: { name: string; slug: string }) {
  await dbConnect();
  const Tenant = await tenant.create(data);
  return JSON.parse(JSON.stringify(Tenant));
}
