import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" },
  },
  { timestamps: true }
);

export default models.User || mongoose.model("User", UserSchema);
