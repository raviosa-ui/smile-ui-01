const googleTrends = require('google-trends-api');
const fs = require('fs');
const path = require('path');

// 1. Fetch data from Google
googleTrends.relatedQueries({
  keyword: 'emoji',
  geo: 'US',
})
.then((results) => {
  const data = JSON.parse(results);
  const risingQueries = data.default.rankedList.find(l => l.title === 'Rising');

  if (!risingQueries) throw new Error("No trends found");

  // 2. Process the top 20 trends
  const cleanTrends = risingQueries.rankedKeyword.slice(0, 20).map(item => {
    
    // Clean the name exactly like we do on the frontend
    // "Red Heart emoji meaning" -> "red-heart"
    const cleanName = item.query
      .toLowerCase()
      .replace(/ emoji/g, '')
      .replace(/ meaning/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim();
      
    const slug = cleanName.replace(/\s+/g, '-');

    // 3. THE MAGIC CHECK
    // We check if a folder exists at: ./emoji/red-heart/
    // (Assumes your emoji folders are inside an 'emoji' folder in the root)
    const folderPath = path.join(__dirname, 'emoji', slug);
    const pageExists = fs.existsSync(folderPath);

    return {
      query: cleanName, // We save the clean name now to save frontend work
      value: item.value,
      slug: slug,
      hasPage: pageExists // true or false
    };
  });

  // 4. Save to file
  fs.writeFileSync('daily-emoji-trends.json', JSON.stringify(cleanTrends, null, 2));
  console.log('✅ Trends updated. Checked ' + cleanTrends.length + ' folders.');
})
.catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
