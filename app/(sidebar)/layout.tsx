import { Sidebar } from "@/components/Sidebar";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen bg-blue-100/20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,rgba(102,136,255,0.18),transparent_60%)]" />
      <Sidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
