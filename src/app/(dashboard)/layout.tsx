import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <main className='flex min-h-screen flex-col p-10 ml-[250px]'>{children}</main>
    </>
  );
}
