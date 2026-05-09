// Separate layout for admin login (no sidebar)
export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <div className="contents">{children}</div>;
}
