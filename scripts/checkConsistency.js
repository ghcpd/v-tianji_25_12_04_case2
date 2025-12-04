const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function walk(dir) {
  const results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results.push(...walk(full));
    } else {
      results.push(full);
    }
  });
  return results;
}

const files = walk(root).filter(f => (f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.js') || f.endsWith('.jsx')) && !f.includes(path.sep + 'scripts' + path.sep));

let errors = [];

// 1) Detect .refactored files (file names)
const refactoredFiles = files.filter(f => f.includes('.refactored.'));
if (refactoredFiles.length > 0) {
  errors.push({ type: 'refactored_files', files: refactoredFiles });
}

// 2) Detect multiple naming variants for core user fields (id/name/email) across the codebase
const variantGroups = {
  id: /\b(userId|id|uid|userIdentifier)\b/g,
  name: /\b(userName|name|fullName|displayName|username)\b/g,
  email: /\b(userEmail|email|emailAddress|contactEmail)\b/g
};
const variantsFound = {};
for (const [group, rx] of Object.entries(variantGroups)) {
  variantsFound[group] = new Set();
  for (const f of files) {
    const content = fs.readFileSync(f, 'utf8');
    const matches = content.match(rx);
    if (matches) matches.forEach(m => variantsFound[group].add(m));
  }
}
const variantIssues = Object.entries(variantsFound).filter(([, set]) => set.size > 1).map(([k, set]) => ({ field: k, variants: Array.from(set) }));
if (variantIssues.length > 0) {
  errors.push({ type: 'naming_variant_issues', details: variantIssues });
}

// 3) Detect snake_case identifiers in source files
const snakeRegex = /\b[a-z0-9]+_[a-z0-9]+\b/g;
const snakeMatches = [];
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(snakeRegex);
  if (matches) {
    snakeMatches.push({ file: f, matches: Array.from(new Set(matches)) });
  }
}
if (snakeMatches.length > 0) {
  errors.push({ type: 'snake_case_usage', details: snakeMatches });
}

if (errors.length > 0) {
  console.error('Consistency checks failed:\n', JSON.stringify(errors, null, 2));
  process.exit(2);
} else {
  console.log('Consistency checks passed. No .refactored files or snake_case identifiers found.');
  process.exit(0);
}
