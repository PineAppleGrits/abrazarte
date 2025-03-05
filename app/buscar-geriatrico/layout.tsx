import QueryProvider from "../providers";

export default function f({ children }: Readonly<{ children: React.ReactNode }>) {
  return <QueryProvider>{children}</QueryProvider>;
}
