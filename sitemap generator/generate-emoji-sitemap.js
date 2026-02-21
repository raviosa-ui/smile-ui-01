const fs = require("fs");
const path = require("path");

const SITE_URL = "https://smileymeaning.com";
const EMOJI_DIR = path.join(__dirname, "emoji"); // singular
const OUTPUT_DIR = path.join(__dirname, "sitemaps");

function generateEmojiSitemap() {

  if (!fs.existsSync(EMOJI_DIR)) {
    console.error("❌ emoji folder not found");
    return;
  }

  const slugs = fs.readdirSync(EMOJI_DIR).filter(folder =>
    fs.existsSync(path.join(EMOJI_DIR, folder, "index.html"))
  );

  const today = new Date().toISOString().split("T")[0];

  const urls = slugs.map(slug => `
    <url>
      <loc>${SITE_URL}/emoji/${slug}/</loc>
      <lastmod>${today}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join("");

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, "emojis.xml"), sitemapContent);

  console.log(`✅ Emoji sitemap generated with ${slugs.length} URLs`);
}

generateEmojiSitemap();