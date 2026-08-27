const fs = require('fs');

const data = JSON.parse(fs.readFileSync('public/questions.json', 'utf8'));

const cleaned = data.filter(q => {
  // Must have exactly 4 options
  if (q.options.length !== 4) return false;
  
  // Remove ID 25 (policeman image mismatch)
  if (q.id === 25) return false;

  // Remove ID 46 (SDS logo mismatch)
  if (q.id === 46) return false;

  return true;
});

// Fix IDs sequentially so there are no gaps (optional, but good practice)
cleaned.forEach((q, i) => {
  q.id = i + 1;
});

fs.writeFileSync('public/questions.json', JSON.stringify(cleaned, null, 2));

console.log(`Cleaned! Kept ${cleaned.length} perfect questions out of ${data.length}.`);
