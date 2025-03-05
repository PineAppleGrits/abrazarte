"use client";

import { signOut as nextAuthSignOut } from "next-auth/react";

export const signOut = () => {
  return nextAuthSignOut({ callbackUrl: "/" });
};
