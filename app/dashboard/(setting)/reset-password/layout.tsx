export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-muted flex-1 flex flex-col items-center min-h-screen gap-8 lg:gap-16 xl:gap-32">{children}</div>;
}
