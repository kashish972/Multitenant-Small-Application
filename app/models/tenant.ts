import mongoose, { Schema, models } from "mongoose";

const TenantSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // used in URL
  },
  { timestamps: true }
);

export default models.Tenant || mongoose.model("Tenant", TenantSchema);
