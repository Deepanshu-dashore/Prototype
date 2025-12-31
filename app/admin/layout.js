import Sidebar from "@/src/components/admin/Sidebar";
import AuthGuard from "@/src/components/admin/AuthGuard";

export default function AdminLayout({ children }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50/50">
        <Sidebar />
        <main className="flex-1 lg:overflow-y-auto h-screen pt-16 lg:pt-0">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
