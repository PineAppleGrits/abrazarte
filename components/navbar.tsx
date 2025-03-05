import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function Navbar({ loggedIn = false, userName = "" }: { loggedIn?: boolean; userName?: string }) {
  return (
    <header className="bg-primary w-full">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center py-4 px-6 border-r border-primary-foreground/20">
            <div className="relative h-12 w-12 mr-2">
              <div className="absolute inset-0 bg-white rounded-full flex items-center justify-center">
                <div className="text-primary text-2xl font-bold">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5Z"
                      stroke="#333"
                      strokeWidth="2"
                    />
                    <path
                      d="M15 15C15 17.2091 13.2091 19 11 19C8.79086 19 7 17.2091 7 15C7 12.7909 8.79086 11 11 11C13.2091 11 15 12.7909 15 15Z"
                      fill="white"
                      stroke="#333"
                      strokeWidth="2"
                    />
                    <path
                      d="M33 15C33 17.2091 31.2091 19 29 19C26.7909 19 25 17.2091 25 15C25 12.7909 26.7909 11 29 11C31.2091 11 33 12.7909 33 15Z"
                      fill="white"
                      stroke="#333"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 27C12 27 14.5 31 20 31C25.5 31 28 27 28 27"
                      stroke="#333"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-xl font-bold">Find Care</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center">
          <Link href="/" className="text-white px-4 py-6 hover:bg-primary-foreground/10">
            HOME
          </Link>
          <Link href="/quienes-somos" className="text-white px-4 py-6 hover:bg-primary-foreground/10">
            ¿QUIÉNES SOMOS?
          </Link>
          <Link href="/contacto" className="text-white px-4 py-6 hover:bg-primary-foreground/10">
            CONTACTO
          </Link>
          <Link href="/buscar-geriatrico" className="text-white px-4 py-6 hover:bg-primary-foreground/10">
            BUSCAR GERIÁTRICO
          </Link>
          <Link href="/notas-de-interes" className="text-white px-4 py-6 hover:bg-primary-foreground/10">
            NOTAS DE INTERÉS
          </Link>
        </nav>

        <div className="flex items-center">
          {loggedIn ? (
            <div className="flex items-center gap-2 px-4">
              <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="User profile"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="flex items-center text-white">
                <span>{userName}</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </div>
            </div>
          ) : (
            <Link href="/login" className="text-white px-4 py-6 hover:bg-primary-foreground/10 font-medium">
              INICIAR SESIÓN
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
