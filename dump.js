const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/questions.json', 'utf8'));

let out = '';
data.forEach(q => {
  out += `ID: ${q.id} | Image: ${q.image}\n`;
  out += `Q: ${q.question}\n`;
  out += `Options (${q.options.length}):\n`;
  q.options.forEach((o, i) => {
    out += `  ${i === q.answerIndex ? '[*]' : '[ ]'} ${o}\n`;
  });
  out += '----------------------------------------\n';
});

fs.writeFileSync('review.txt', out);
