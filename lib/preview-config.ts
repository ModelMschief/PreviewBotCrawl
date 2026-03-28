/**
 * Social Preview Configuration
 * All defaults are hardcoded here or read from environment variables.
 * No database calls - pure static configuration.
 */

// Default metadata (fallback when no overrides provided)
export const DEFAULT_METADATA = {
  title: process.env.PREVIEW_DEFAULT_TITLE || "BotFusion - AI-Powered Automation",
  description:
    process.env.PREVIEW_DEFAULT_DESCRIPTION ||
    "Streamline your workflows with intelligent automation. BotFusion connects your tools and automates repetitive tasks.",
  image:
    process.env.PREVIEW_DEFAULT_IMAGE ||
    "https://botfusion.wuaze.com/og-default.png",
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
    image: "https://botfusion.wuaze.com/og-home.png",
    canonical: "https://botfusion.wuaze.com",
  },
  pricing: {
    title: "Pricing - BotFusion",
    description:
      "Simple, transparent pricing. Start free and scale as you grow.",
    image: "https://botfusion.wuaze.com/og-pricing.png",
    canonical: "https://botfusion.wuaze.com/pricing",
  },
  features: {
    title: "Features - BotFusion",
    description:
      "Explore powerful automation features: AI agents, integrations, workflows, and more.",
    image: "https://botfusion.wuaze.com/og-features.png",
    canonical: "https://botfusion.wuaze.com/features",
  },
  docs: {
    title: "Documentation - BotFusion",
    description:
      "Learn how to build automations with our comprehensive guides and API reference.",
    image: "https://botfusion.wuaze.com/og-docs.png",
    canonical: "https://botfusion.wuaze.com/docs",
  },
  // Add more slugs as needed...
};

// Cache control settings
export const CACHE_CONTROL = "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400";
