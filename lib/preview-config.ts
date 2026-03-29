/**
 * Social Preview Configuration
 * All defaults are hardcoded here or read from environment variables.
 * No database calls - pure static configuration.
 */

// Default metadata (fallback when no overrides provided)
export const DEFAULT_METADATA = {
  title: process.env.PREVIEW_DEFAULT_TITLE || "BotFusion - Telegram developer tool platform",
  description:
    process.env.PREVIEW_DEFAULT_DESCRIPTION ||
    "Broadcast, analytics, anomaly detection, QR codes, link tracking and automation APIs for Telegram bots.",
  image:
    process.env.PREVIEW_DEFAULT_IMAGE ||
    "https://modelmschief.github.io/flame/android-chrome-512x512.png",
  canonical: process.env.PREVIEW_DEFAULT_CANONICAL || "https://botfusion.wuaze.com",
  siteName: process.env.PREVIEW_SITE_NAME || "BotFusion",
  twitterHandle: process.env.PREVIEW_TWITTER_HANDLE || "@botfusion",
};

// Pre-defined slug mappings (dictionary style, no DB)
// Add your pages here - each slug maps to its metadata
export const SLUG_METADATA: Record<
  string,
  {
    title: string;
    description: string;
    image: string;
    canonical: string;
  }
> = {
  home: {
    title: "BotFusion - AI-Powered Automation Platform",
    description:
      "Connect your favorite tools and automate workflows with AI. No coding required.",
    image: "https://modelmschief.github.io/flame/android-chrome-512x512.png",
    canonical: "https://botfusion.wuaze.com",
  },
  pricing: {
    title: "Pricing - BotFusion",
    description:
      "Simple, transparent pricing. Start free and scale as you grow.",
    image: "https://modelmschief.github.io/flame/android-chrome-512x512.png",
    canonical: "https://botfusion.wuaze.com/",
  },
  features: {
    title: "Features - BotFusion",
    description:
      "Explore powerful automation features: AI agents, integrations, workflows, and more.",
    image: "https://modelmschief.github.io/flame/android-chrome-512x512.png",
    canonical: "https://botfusion.wuaze.com/",
  },
  docs: {
    title: "Documentation - BotFusion",
    description:
      "Learn how to build automations with our comprehensive guides and API reference.",
    image: "https://modelmschief.github.io/flame/android-chrome-512x512.png",
    canonical: "https://botfusion.wuaze.com/docs.html",
  },
  // Add more slugs as needed...
};

// Cache control settings
export const CACHE_CONTROL = "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400";
