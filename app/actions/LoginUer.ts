"use server";


import bcrypt from "bcryptjs";
import dbConnect from "../lib/db";
import User from "../models/User";

export async function loginUser(email: string, password: string) {
  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return JSON.parse(JSON.stringify(user));
}
