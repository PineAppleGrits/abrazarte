import React from "react";
import { auth } from "@/auth";
import prisma from "@/prisma";

export const metadata = {
  title: "User Profile",
  description: "Display user information using shadcn UI",
};

export default async function Page() {
  // Fetch the session on the server side
  const session = await auth();

  // If there is no session, you can render a message or redirect to login
  if (!session || !session.user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>You must be logged in to view this page.</p>
      </div>
    );
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      favorites: true,
      testimonial: true,
      Review: true,
    },
  });
  if (!user) return <div>User not found</div>;

  const { name, email, favorites, testimonial, Review } = user;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="space-y-3">
        <div>
          <span className="font-semibold">Name: </span>
          <span>{name || "N/A"}</span>
        </div>
        <div>
          <span className="font-semibold">Email: </span>
          <span>{email || "N/A"}</span>
        </div>
      </div>
    </div>
  );
}
