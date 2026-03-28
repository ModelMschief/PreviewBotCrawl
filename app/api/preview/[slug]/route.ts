import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_METADATA,
  SLUG_METADATA,
  CACHE_CONTROL,
} from "@/lib/preview-config";

/**
 * Social Preview Endpoint (Path-based Slugs)
 * 
 * Usage: /api/preview/home, /api/preview/pricing, /api/preview/features
 * 
 * Slugs are mapped to pre-defined metadata in preview-config.ts.
 * Unknown slugs fall back to defaults.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Look up slug in pre-defined mappings
  const meta = SLUG_METADATA[slug];

  // Use slug-specific metadata or fall back to defaults
  const title = meta?.title || DEFAULT_METADATA.title;
  const description = meta?.description || DEFAULT_METADATA.description;
  const image = meta?.image || DEFAULT_METADATA.image;
  const canonical = meta?.canonical || DEFAULT_METADATA.canonical;
  const siteName = DEFAULT_METADATA.siteName;
  const twitterHandle = DEFAULT_METADATA.twitterHandle;

  // Build minimal HTML
  const html = buildPreviewHTML({
    title,
    description,
    image,
    canonical,
    siteName,
    twitterHandle,
    slug,
    found: !!meta,
  });

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": CACHE_CONTROL,
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
  slug: string;
  found: boolean;
}

function buildPreviewHTML({
  title,
  description,
  image,
  canonical,
  siteName,
  twitterHandle,
}: PreviewParams): string {
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

  <!-- Open Graph -->
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

  <link rel="canonical" href="${esc(canonical)}">

  <!-- Instant redirect for real users -->
  <meta http-equiv="refresh" content="0; url=${esc(canonical)}">

  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: #fafafa;
      color: #333;
    }
  </style>
</head>
<body>
  <noscript>
    <p>Redirecting to <a href="${esc(canonical)}">${esc(canonical)}</a>...</p>
  </noscript>
</body>
</html>`;
}
