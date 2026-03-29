import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_METADATA, CACHE_CONTROL } from "@/lib/preview-config";

/**
 * Social Preview Endpoint (Query Params)
 * 
 * Usage: /api/preview?title=...&description=...&image=...&canonical=...
 * 
 * All parameters are optional - falls back to defaults.
 * Returns minimal HTML with og:* and twitter:* meta tags.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Extract overrides from query params (or use defaults)
  const title = searchParams.get("title") || DEFAULT_METADATA.title;
  const description = searchParams.get("description") || DEFAULT_METADATA.description;
  const image = searchParams.get("image") || DEFAULT_METADATA.image;
  const canonical = searchParams.get("canonical") || DEFAULT_METADATA.canonical;
  const siteName = DEFAULT_METADATA.siteName;
  const twitterHandle = DEFAULT_METADATA.twitterHandle;

  // Optional: redirect real users after a short delay
  const redirect = searchParams.get("redirect") !== "false";

  // Build minimal HTML with meta tags
  const html = buildPreviewHTML({
    title,
    description,
    image,
    canonical,
    siteName,
    twitterHandle,
    redirect,
  });

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": CACHE_CONTROL,
      // Prevent indexing of preview endpoints
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

interface PreviewParams {
  title: string;
  description: string;
  image: string;
  canonical: string;
  siteName: string;
  twitterHandle: string;
  redirect: boolean;
}

function buildPreviewHTML({
  title,
  description,
  image,
  canonical,
  siteName,
  twitterHandle,
  redirect,
}: PreviewParams): string {
  // Escape HTML entities for safety
  const esc = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">

  <!-- Open Graph (Facebook, LinkedIn, Discord, Slack) -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${esc(canonical)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${esc(image)}">
  <meta property="og:site_name" content="${esc(siteName)}">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="${esc(twitterHandle)}">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${esc(image)}">

  <!-- WhatsApp uses og:* tags -->

  <!-- Canonical URL -->
  <link rel="canonical" href="${esc(canonical)}">

  ${redirect ? `<!-- Redirect real users to canonical URL after 0s -->
  <meta http-equiv="refresh" content="0; url=${esc(canonical)}">` : ""}

  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: #000000;
      color: #333;
    }
    .container {
      text-align: center;
      padding: 2rem;
    }
    a {
      color: #0070f3;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- <h1>${esc(title)}</h1> 
    <p>${esc(description)}</p>
    ${redirect ? `<p>Redirecting to <a href="${esc(canonical)}">${esc(canonical)}</a>...</p>` : `<p><a href="${esc(canonical)}">Visit ${esc(siteName)}</a></p>`}-->
  </div>
</body>
</html>`;
}
