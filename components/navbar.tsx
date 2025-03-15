import Link from "next/link";
import { auth } from "@/auth";
import UserDropdown from "./UserDropdown";
import logo from "@/public/logo-small.jpg";
import Image from "next/image";
export async function Navbar() {
  const session = await auth();
  const user = session?.user;
  const isLoggedIn = !!user;

  return (
    <header className="bg-primary w-full">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center py-2">
          <Link href="/" className="flex items-center py-4 px-6 border-r border-primary-foreground/20 gap-4">
            <Image src={logo} alt="Abrazarte logo" width={48} height={48} />
            <div className="flex flex-col">
              <span className="text-white text-2xl font-bold">Abrazarte</span>
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
          <Link href="/blog" className="text-white px-4 py-6 hover:bg-primary-foreground/10">
            NOTAS DE INTERÉS
          </Link>
        </nav>

        <div className="flex items-center">
          {isLoggedIn ? (
            <UserDropdown user={user} />
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
