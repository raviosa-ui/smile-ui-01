const googleTrends = require('google-trends-api');
const fs = require('fs');

// 1. Fetch data from Google
googleTrends.relatedQueries({
  keyword: 'emoji',
  geo: 'US', // Change country code if needed
})
.then((results) => {
  const data = JSON.parse(results);
  const risingQueries = data.default.rankedList.find(l => l.title === 'Rising');

  if (!risingQueries) throw new Error("No trends found");

  // 2. Format the top 20 trends
  const cleanTrends = risingQueries.rankedKeyword.slice(0, 20).map(item => ({
    query: item.query,
    value: item.value
  }));

  // 3. Save to file
  fs.writeFileSync('daily-emoji-trends.json', JSON.stringify(cleanTrends, null, 2));
  console.log('✅ Trends updated successfully!');
})
.catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
