"use client"

import { useState, useMemo } from "react"
import { Copy, Check, ExternalLink, Zap, Settings, Link2, Code2, BookOpen } from "lucide-react"

const BASE_URL = "https://v0-preview-bot-crawl.vercel.app"

export default function DocsPage() {
  const [copied, setCopied] = useState<string | null>(null)
  
  // Custom URL Builder State
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [canonical, setCanonical] = useState("")
  const [redirect, setRedirect] = useState(true)

  const generatedUrl = useMemo(() => {
    const params = new URLSearchParams()
    if (title) params.set("title", title)
    if (description) params.set("description", description)
    if (image) params.set("image", image)
    if (canonical) params.set("canonical", canonical)
    if (!redirect) params.set("redirect", "false")
    
    const queryString = params.toString()
    return `${BASE_URL}/api/preview${queryString ? `?${queryString}` : ""}`
  }, [title, description, image, canonical, redirect])

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const slugExamples = [
    { slug: "home", description: "Homepage preview" },
    { slug: "pricing", description: "Pricing page preview" },
    { slug: "features", description: "Features page preview" },
    { slug: "docs", description: "Documentation preview" },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Social Preview API</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Generate beautiful social media preview cards for Facebook, Twitter, LinkedIn, Telegram, Discord, WhatsApp, and more.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12 space-y-16">
        
        {/* Quick Start */}
        <section>
          <SectionHeader icon={<Zap className="h-5 w-5" />} title="Quick Start" />
          <div className="mt-6 space-y-4">
            <p className="text-muted-foreground">
              Simply share this URL on any social platform to display a preview card:
            </p>
            <CodeBlock 
              code={`${BASE_URL}/api/preview`}
              onCopy={() => copyToClipboard(`${BASE_URL}/api/preview`, "quickstart")}
              copied={copied === "quickstart"}
            />
            <div className="flex gap-3 mt-4">
              <a 
                href={`${BASE_URL}/api/preview?redirect=false`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Test in Browser <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* URL Builder */}
        <section>
          <SectionHeader icon={<Settings className="h-5 w-5" />} title="URL Builder (Fully Customizable)" />
          <p className="mt-2 text-muted-foreground">
            Build a custom preview URL with your own title, description, image, and more.
          </p>
          
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Form */}
            <div className="space-y-4 p-6 bg-card rounded-xl border border-border">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My Awesome Product"
                  className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A brief description of your page..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Image URL</label>
                <input 
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/og-image.png"
                  className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <p className="mt-1 text-xs text-muted-foreground">Recommended: 1200x630 pixels</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Canonical URL (redirect destination)</label>
                <input 
                  type="url"
                  value={canonical}
                  onChange={(e) => setCanonical(e.target.value)}
                  placeholder="https://yoursite.com/page"
                  className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox"
                  id="redirect"
                  checked={redirect}
                  onChange={(e) => setRedirect(e.target.checked)}
                  className="h-4 w-4 rounded border-input"
                />
                <label htmlFor="redirect" className="text-sm text-foreground">
                  Enable redirect (users will be redirected to canonical URL)
                </label>
              </div>
            </div>

            {/* Generated URL */}
            <div className="space-y-4">
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="text-sm font-medium text-foreground mb-3">Generated URL</h3>
                <div className="p-4 bg-muted rounded-lg break-all text-sm font-mono text-foreground">
                  {generatedUrl}
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => copyToClipboard(generatedUrl, "generated")}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    {copied === "generated" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied === "generated" ? "Copied!" : "Copy URL"}
                  </button>
                  <a 
                    href={generatedUrl.includes("redirect=false") ? generatedUrl : `${generatedUrl}${generatedUrl.includes("?") ? "&" : "?"}redirect=false`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Test <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Tip:</strong> Paste this URL in Telegram, Discord, Slack, or any social platform to see the preview card.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Slug-based URLs */}
        <section>
          <SectionHeader icon={<Link2 className="h-5 w-5" />} title="Slug-based URLs (Pre-configured Pages)" />
          <p className="mt-2 text-muted-foreground">
            Use predefined slugs for specific pages. These are configured in <code className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono">lib/preview-config.ts</code>
          </p>
          
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {slugExamples.map(({ slug, description }) => (
              <div key={slug} className="p-4 bg-card rounded-xl border border-border">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono text-foreground">/api/preview/{slug}</code>
                  <button
                    onClick={() => copyToClipboard(`${BASE_URL}/api/preview/${slug}`, slug)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    {copied === slug ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
                <a 
                  href={`${BASE_URL}/api/preview/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-3 text-sm text-primary hover:underline"
                >
                  Test <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">What is a slug?</strong> A slug is a URL-friendly identifier for a page. For example, <code className="px-1 py-0.5 bg-muted rounded text-xs">/api/preview/pricing</code> uses the slug <code className="px-1 py-0.5 bg-muted rounded text-xs">pricing</code>.
            </p>
          </div>
        </section>

        {/* Query Parameters Reference */}
        <section>
          <SectionHeader icon={<Code2 className="h-5 w-5" />} title="Query Parameters Reference" />
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Parameter</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Default</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-3 px-4 font-mono text-foreground">title</td>
                  <td className="py-3 px-4 text-muted-foreground">string</td>
                  <td className="py-3 px-4 text-muted-foreground">BotFusion - AI-Powered Automation</td>
                  <td className="py-3 px-4 text-muted-foreground">The title shown in the preview card</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-foreground">description</td>
                  <td className="py-3 px-4 text-muted-foreground">string</td>
                  <td className="py-3 px-4 text-muted-foreground">Streamline your workflows...</td>
                  <td className="py-3 px-4 text-muted-foreground">The description text below the title</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-foreground">image</td>
                  <td className="py-3 px-4 text-muted-foreground">URL</td>
                  <td className="py-3 px-4 text-muted-foreground">og-default.png</td>
                  <td className="py-3 px-4 text-muted-foreground">Full URL to the preview image (1200x630 recommended)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-foreground">canonical</td>
                  <td className="py-3 px-4 text-muted-foreground">URL</td>
                  <td className="py-3 px-4 text-muted-foreground">botfusion.wuaze.com</td>
                  <td className="py-3 px-4 text-muted-foreground">The destination URL when users click/redirect</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-foreground">redirect</td>
                  <td className="py-3 px-4 text-muted-foreground">boolean</td>
                  <td className="py-3 px-4 text-muted-foreground">true</td>
                  <td className="py-3 px-4 text-muted-foreground">Set to &quot;false&quot; to disable auto-redirect</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How to Customize Defaults */}
        <section>
          <SectionHeader icon={<BookOpen className="h-5 w-5" />} title="How to Customize Defaults" />
          <p className="mt-2 text-muted-foreground">
            You can customize default values in two ways:
          </p>

          <div className="mt-6 space-y-6">
            {/* Method 1: Environment Variables */}
            <div className="p-6 bg-card rounded-xl border border-border">
              <h3 className="font-semibold text-foreground mb-3">Method 1: Environment Variables</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Set these in your Vercel dashboard under Settings &gt; Environment Variables:
              </p>
              <CodeBlock 
                code={`PREVIEW_DEFAULT_TITLE="Your Site Name"
PREVIEW_DEFAULT_DESCRIPTION="Your default description"
PREVIEW_DEFAULT_IMAGE="https://yoursite.com/og.png"
PREVIEW_DEFAULT_CANONICAL="https://yoursite.com"
PREVIEW_SITE_NAME="Your Site"
PREVIEW_TWITTER_HANDLE="@yourhandle"`}
                onCopy={() => copyToClipboard(`PREVIEW_DEFAULT_TITLE="Your Site Name"
PREVIEW_DEFAULT_DESCRIPTION="Your default description"
PREVIEW_DEFAULT_IMAGE="https://yoursite.com/og.png"
PREVIEW_DEFAULT_CANONICAL="https://yoursite.com"
PREVIEW_SITE_NAME="Your Site"
PREVIEW_TWITTER_HANDLE="@yourhandle"`, "envvars")}
                copied={copied === "envvars"}
              />
            </div>

            {/* Method 2: Edit Config File */}
            <div className="p-6 bg-card rounded-xl border border-border">
              <h3 className="font-semibold text-foreground mb-3">Method 2: Edit the Config File</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Modify <code className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono">lib/preview-config.ts</code> directly:
              </p>
              <CodeBlock 
                code={`// lib/preview-config.ts

export const DEFAULT_METADATA = {
  title: "Your Site Name",
  description: "Your default description",
  image: "https://yoursite.com/og.png",
  canonical: "https://yoursite.com",
  siteName: "Your Site",
  twitterHandle: "@yourhandle",
};

// Add custom slugs
export const SLUG_METADATA = {
  home: {
    title: "Home - Your Site",
    description: "Welcome to our homepage",
    image: "https://yoursite.com/og-home.png",
    canonical: "https://yoursite.com",
  },
  // Add more pages...
};`}
                onCopy={() => copyToClipboard(`export const DEFAULT_METADATA = {
  title: "Your Site Name",
  description: "Your default description",
  image: "https://yoursite.com/og.png",
  canonical: "https://yoursite.com",
  siteName: "Your Site",
  twitterHandle: "@yourhandle",
};`, "configfile")}
                copied={copied === "configfile"}
              />
            </div>
          </div>
        </section>

        {/* Platform Support */}
        <section>
          <SectionHeader icon={<Zap className="h-5 w-5" />} title="Supported Platforms" />
          <div className="mt-6 grid gap-4 sm:grid-cols-3 md:grid-cols-4">
            {["Facebook", "Twitter / X", "LinkedIn", "Telegram", "Discord", "Slack", "WhatsApp", "iMessage"].map((platform) => (
              <div key={platform} className="flex items-center gap-2 p-3 bg-card rounded-lg border border-border">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <span className="text-sm text-foreground">{platform}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Debug Tools */}
        <section>
          <SectionHeader icon={<Code2 className="h-5 w-5" />} title="Debug Tools" />
          <p className="mt-2 text-muted-foreground">
            Use these official tools to verify your preview cards:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <a 
              href="https://developers.facebook.com/tools/debug/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
            >
              <h3 className="font-medium text-foreground">Facebook Debugger</h3>
              <p className="text-sm text-muted-foreground mt-1">Test Open Graph tags</p>
            </a>
            <a 
              href="https://cards-dev.twitter.com/validator"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
            >
              <h3 className="font-medium text-foreground">Twitter Validator</h3>
              <p className="text-sm text-muted-foreground mt-1">Test Twitter cards</p>
            </a>
            <a 
              href="https://www.linkedin.com/post-inspector/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
            >
              <h3 className="font-medium text-foreground">LinkedIn Inspector</h3>
              <p className="text-sm text-muted-foreground mt-1">Test LinkedIn previews</p>
            </a>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center text-sm text-muted-foreground">
          Social Preview API - Built for BotFusion
        </div>
      </footer>
    </main>
  )
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
    </div>
  )
}

function CodeBlock({ code, onCopy, copied }: { code: string; onCopy: () => void; copied: boolean }) {
  return (
    <div className="relative group">
      <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-sm font-mono text-foreground">
        {code}
      </pre>
      <button
        onClick={onCopy}
        className="absolute top-3 right-3 p-2 bg-background/80 hover:bg-background rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
      </button>
    </div>
  )
}
