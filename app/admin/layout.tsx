import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

// Auth middleware is handled by middleware.ts (protects all /admin/* except /admin/login)
// Sidebar visibility is conditionally controlled in AdminLayoutClient based on current path
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
