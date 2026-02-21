const fs = require("fs");
const path = require("path");

const SITE_URL = "https://smileymeaning.com";
const EMOJI_CATEGORY_DIR = path.join(__dirname, "emojis");
const CATEGORY_PAGE_DIR = path.join(__dirname, "category");
const OUTPUT_DIR = path.join(__dirname, "sitemaps");

function generateCategorySitemap() {

  if (!fs.existsSync(EMOJI_CATEGORY_DIR)) {
    console.error("❌ emojis folder not found");
    return;
  }

  const categoryFolders = fs.readdirSync(EMOJI_CATEGORY_DIR).filter(folder =>
    fs.statSync(path.join(EMOJI_CATEGORY_DIR, folder)).isDirectory()
  );

  const today = new Date().toISOString().split("T")[0];

  const validCategories = categoryFolders.filter(slug =>
    fs.existsSync(path.join(CATEGORY_PAGE_DIR, slug, "index.html"))
  );

  const urls = validCategories.map(slug => `
    <url>
      <loc>${SITE_URL}/category/${slug}/</loc>
      <lastmod>${today}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
  `).join("");

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, "categories.xml"), sitemapContent);

  console.log(`✅ Categories sitemap generated with ${validCategories.length} URLs`);
}

generateCategorySitemap();