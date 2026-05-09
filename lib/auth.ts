import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("NextAuth: Missing email or password");
          return null;
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminHashB64 = process.env.ADMIN_PASSWORD_HASH_B64;

        if (!adminEmail || !adminHashB64) {
          console.error("Admin credentials not configured in environment variables.");
          return null;
        }

        const adminHash = Buffer.from(adminHashB64, "base64").toString("utf-8");

        console.log("NextAuth: Environment check", { 
          hasAdminEmail: !!adminEmail, 
          expectedEmail: adminEmail,
          providedEmail: credentials.email,
          hasAdminHash: !!adminHash,
          hashLength: adminHash?.length
        });

        if (credentials.email !== adminEmail) {
          console.log("NextAuth: Email mismatch");
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, adminHash);
        console.log("NextAuth: Password validation result:", isValid);
        
        if (!isValid) return null;

        return { id: "admin", email: adminEmail, name: "Admin", role: "admin" };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2 hours
    updateAge: 30 * 60,   // Refresh after 30 minutes of activity
  },
  jwt: {
    maxAge: 2 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
