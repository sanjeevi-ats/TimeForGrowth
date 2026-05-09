import Link from "next/link";

export default function AdminFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#E0E0E0] mt-auto py-4 px-6 lg:px-8 flex items-center justify-between text-xs text-[#999]">
      <span>© {year} Time For Growth — Admin Panel</span>
      <div className="flex items-center gap-4">
        <Link href="/" target="_blank" className="hover:text-black transition-colors">
          View Site ↗
        </Link>
        <Link href="/admin/settings" className="hover:text-black transition-colors">
          Settings
        </Link>
        <span>v0.1.0</span>
      </div>
    </footer>
  );
}
