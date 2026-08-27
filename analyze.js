const fs = require('fs');

const data = JSON.parse(fs.readFileSync('public/questions.json', 'utf8'));

console.log(`Total questions: ${data.length}`);

const not4Options = data.filter(q => q.options.length !== 4);
console.log(`Questions with != 4 options: ${not4Options.length}`);

// Let's also look for the "sds" logo or the policeman image.
// The policeman question text is "මාර්ගය මත සලකුණු කර ඇති මෙම මාර්ග සලකුණෙන්"
const policeQuestion = data.find(q => q.question.includes("මාර්ගය මත සලකුණු කර ඇති මෙම මාර්ග සලකුණෙන්"));
if (policeQuestion) {
  console.log('Found police question:', policeQuestion.image);
}

const sdsQuestion = data.find(q => q.options.some(o => o.includes("sds")) || q.question.includes("sds"));
// SDS logo is an image, let's list all unique images to see if one is obvious
const uniqueImages = [...new Set(data.map(q => q.image).filter(Boolean))];
console.log(`Unique images: ${uniqueImages.length}`);

// Print the first few questions with != 4 options
console.log('Examples of bad option lengths:', not4Options.slice(0, 2).map(q => ({id: q.id, opts: q.options.length})));
