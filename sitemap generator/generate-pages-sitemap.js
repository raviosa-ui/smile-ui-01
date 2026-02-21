const fs = require("fs");
const path = require("path");

const SITE_URL = "https://smileymeaning.com";
const OUTPUT_DIR = path.join(__dirname, "sitemaps");

const NAV_PAGES = [
  "/all-emojis/",
  "/quiz/",
  "/emoji-mixer/",
  "/emoji-combo/",
  "/emoji-history/",
  "/trending-emojis/"
];

const STATIC_PAGES = [
  "/privacy/",
  "/about/",
  "/contact/",
  "/terms/",
  "/cookie-policy/"
];

function generatePagesSitemap() {

  const today = new Date().toISOString().split("T")[0];

  const navUrls = NAV_PAGES.map(url => `
    <url>
      <loc>${SITE_URL}${url}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
  `).join("");

  const staticUrls = STATIC_PAGES.map(url => `
    <url>
      <loc>${SITE_URL}${url}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>
  `).join("");

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${navUrls}
${staticUrls}
</urlset>`;

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, "pages.xml"), sitemapContent);

  console.log("✅ pages.xml generated successfully");
}

generatePagesSitemap();