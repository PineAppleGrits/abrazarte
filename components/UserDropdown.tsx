"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, LogOut, Settings, UserCircle } from "lucide-react";
import { signOut } from "@/auth-client"; // Import from client-side auth file
import { User as NextAuthUser } from "next-auth";

interface User extends NextAuthUser {
  isAdmin?: boolean;
}

export default function UserDropdown({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-2 text-white hover:bg-primary-foreground/10 rounded-md"
      >
        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
          <Image
            src={user?.image || "/placeholder.svg?height=40&width=40"}
            alt="User profile"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <div className="flex items-center">
          <span>{user?.name || user?.email}</span>
          <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-3 text-sm text-gray-900 border-b">
            <div className="font-medium truncate">{user?.email}</div>
          </div>

          <Link
            href="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <UserCircle className="h-4 w-4 mr-2" />
            Mi Perfil
          </Link>

          {user?.isAdmin && (
            <Link
              href="/admin"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Panel de Admin
            </Link>
          )}

          <button onClick={handleSignOut} className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}
