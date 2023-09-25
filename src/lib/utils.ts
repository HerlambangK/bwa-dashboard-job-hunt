import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const hashpassword = async (password: string ) => {
  const hashedpassword = await bcrypt.hash(password, 8);
  return hashedpassword;
}

export const comparePassword = async (password: string , hashedpassword:string) => {
  const isMatch = await bcrypt.compare(password,hashedpassword)

  return isMatch
}