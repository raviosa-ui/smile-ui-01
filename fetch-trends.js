const googleTrends = require('google-trends-api');
const fs = require('fs');
const path = require('path');

// --- THE BACKUP LIST ---
// If Google blocks us, we use these "Evergreen" trending emojis so the site never breaks.
const BACKUP_KEYWORDS = [
  "skull emoji", "melting face", "red heart", "fire emoji", 
  "tear emoji", "saluting face", "moai", "thumbs up", 
  "heart hands", "eyes emoji", "sweat droplet", "clown face",
  "folded hands", "sparkles", "rolling on the floor laughing",
  "face holding back tears", "check mark", "thinking face",
  "shushing face", "pleading face"
];

// Main Function
(async () => {
  try {
    console.log('🤖 Asking Google for trends...');
    
    // 1. Try to fetch from Google
    const results = await googleTrends.relatedQueries({
      keyword: 'emoji',
      geo: 'US',
    });

    // 2. Check if Google sent garbage (HTML error page)
    if (results.trim().startsWith('<')) {
      throw new Error("Google returned HTML (Rate Limit/Block)");
    }

    // 3. Parse valid JSON
    const data = JSON.parse(results);
    const risingQueries = data.default.rankedList.find(l => l.title === 'Rising');
    
    if (!risingQueries) throw new Error("No rising trends found");

    const liveTrends = risingQueries.rankedKeyword.slice(0, 20);
    console.log('✅ Google allowed us! Using LIVE data.');
    processAndSave(liveTrends.map(item => ({ query: item.query, value: item.value })));

  } catch (err) {
    // 4. THE SAFETY NET
    console.error(`⚠️ Fetch failed (${err.message}). Switching to BACKUP list.`);
    
    // Map backup keywords to the same format as Google data
    const backupData = BACKUP_KEYWORDS.map(kw => ({
      query: kw,
      value: "Popular" // Placeholder text since we don't have live %
    }));
    
    processAndSave(backupData);
  }
})();

// Helper to check folders and save file
function processAndSave(items) {
  const cleanTrends = items.map(item => {
    // Clean name logic
    const cleanName = item.query
      .toLowerCase()
      .replace(/ emoji/g, '')
      .replace(/ meaning/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim();
      
    const slug = cleanName.replace(/\s+/g, '-');

    // Check if folder exists
    const folderPath = path.join(__dirname, 'emoji', slug);
    const pageExists = fs.existsSync(folderPath);

    return {
      query: cleanName,
      value: item.value,
      slug: slug,
      hasPage: pageExists
    };
  });

  fs.writeFileSync('daily-emoji-trends.json', JSON.stringify(cleanTrends, null, 2));
  console.log(`💾 Saved ${cleanTrends.length} items to daily-emoji-trends.json`);
}
