import tenant from "../models/tenant";
import dbConnect from "./db";

export async function getTenantBySlug(slug: string) {
  await dbConnect();
  return await tenant.findOne({ slug });
}
