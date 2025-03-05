import { auth } from "@/auth";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser() as User;

  if (!user) {
    redirect("/login");
  }

  if (!user.isAdmin) {
    redirect("/unauthorized");
  }

  return user;
}
