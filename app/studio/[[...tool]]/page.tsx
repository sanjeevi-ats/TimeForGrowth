import { redirect } from "next/navigation";

/**
 * /studio redirects to the hosted Sanity Studio.
 *
 * next-sanity (which embeds Studio) requires Next.js 16+, but this project
 * uses Next.js 14. Instead we redirect to the Sanity-hosted studio.
 *
 * To get your Studio URL:
 *  1. Run: npx sanity deploy
 *  2. Set NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-project.sanity.studio
 *     in your .env.local
 */
export default function StudioPage() {
  const studioUrl =
    process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ||
    `https://www.sanity.io/manage/personal/project/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ""}`;

  redirect(studioUrl);
}
