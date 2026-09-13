import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ALLOWED_URLS } from "@shared/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isPathActive(path: string, currentPath: string) {
  if (!currentPath) return false;

  return path.includes(ALLOWED_URLS[currentPath]);
}

export function getAdminSection(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "admin") return parts[1] ?? "";
  return parts[0] ?? "";
}
