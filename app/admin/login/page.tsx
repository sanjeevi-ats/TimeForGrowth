"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type View = "login" | "forgot" | "forgot-sent";

// ── Card must be defined OUTSIDE the page component so React keeps the same
// component reference across re-renders. Defining it inside causes remounts
// on every keystroke, destroying focus.
function Card({ children, shake }: { children: React.ReactNode; shake: boolean }) {
  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center p-4">
      <div
        className={cn(
          "w-full max-w-sm bg-white border border-[#E0E0E0] rounded-card p-8 shadow-card",
          shake && "[animation:shake_0.4s_ease-in-out]"
        )}
      >
        <div className="text-center mb-8">
          <h1 className="text-xl font-black uppercase tracking-tight">Time For Growth</h1>
          <p className="text-sm text-[#666] mt-1">Admin Access</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const router = useRouter();

  // ── Login ─────────────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", { email, password, redirect: false });

    if (result?.error) {
      setLoading(false);
      setError("Invalid email or password. Please try again.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  // ── Forgot Password ───────────────────────────────────────────────────────
  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In production, trigger an email via your email provider here.
    // For now we just show the confirmation state after 1s.
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setView("forgot-sent");
  };

  // Card is defined above, outside this component.

  // ── Views ─────────────────────────────────────────────────────────────────
  if (view === "forgot-sent") {
    return (
      <Card shake={shake}>
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle size={40} className="text-black" />
          </div>
          <h2 className="font-bold text-base">Check Your Email</h2>
          <p className="text-sm text-[#666]">
            If <strong>{forgotEmail}</strong> is registered, a password reset link has been sent.
            Check your inbox (and spam folder).
          </p>
          <p className="text-xs text-[#999] bg-[#F5F5F5] rounded-card p-3 text-left">
            <strong>Note:</strong> To actually send reset emails, configure an email provider (e.g.
            SendGrid or Resend) in <code className="bg-white px-1 rounded">.env.local</code> and
            wire it to the <code className="bg-white px-1 rounded">/api/admin/reset-password</code> route.
          </p>
          <button
            onClick={() => { setView("login"); setForgotEmail(""); }}
            className="btn-primary w-full justify-center mt-2"
          >
            Back to Sign In
          </button>
        </div>
      </Card>
    );
  }

  if (view === "forgot") {
    return (
      <Card shake={shake}>
        <button
          onClick={() => setView("login")}
          className="flex items-center gap-1.5 text-xs text-[#666] hover:text-black transition-colors mb-6"
        >
          <ArrowLeft size={13} /> Back to sign in
        </button>

        <h2 className="font-bold text-base mb-1">Reset Password</h2>
        <p className="text-sm text-[#666] mb-5">
          Enter the email associated with your admin account and we'll send a reset link.
        </p>

        <form onSubmit={handleForgot} className="space-y-4">
          <div>
            <label htmlFor="forgot-email" className="label">Email</label>
            <input
              id="forgot-email"
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="input"
              placeholder="admin@time4growth.in"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
            {loading ? (
              <><span className="spinner" />Sending…</>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      </Card>
    );
  }

  // Default: login view
  return (
    <Card shake={shake}>
      {error && (
        <div className="mb-4 p-3 border border-red-200 bg-red-50 rounded-card text-sm text-red-700 animate-fade-in">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="label">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="admin@time4growth.in"
            required
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="password" className="label">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input pr-10"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-black transition-colors"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center py-3 mt-2"
        >
          {loading ? (
            <><span className="spinner" />Signing in…</>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <div className="text-center mt-4">
        <button
          onClick={() => { setView("forgot"); setError(""); setForgotEmail(email); }}
          className="text-xs text-[#666] hover:text-black transition-colors underline"
        >
          Forgot Password?
        </button>
      </div>
    </Card>
  );
}
