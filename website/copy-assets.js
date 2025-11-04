import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '..');
const targetDir = path.join(__dirname, 'public', 'problems');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Get all problem directories
const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

let copiedCount = 0;

for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  
  // Match problem folder pattern
  const match = entry.name.match(/^\d+-/);
  if (!match) continue;

  const problemPath = path.join(sourceDir, entry.name);
  const targetProblemPath = path.join(targetDir, entry.name);

  // Create problem directory in public
  if (!fs.existsSync(targetProblemPath)) {
    fs.mkdirSync(targetProblemPath, { recursive: true });
  }

  // Copy Animation folder if it exists
  const animationSrc = path.join(problemPath, 'Animation');
  const animationDst = path.join(targetProblemPath, 'Animation');
  
  if (fs.existsSync(animationSrc)) {
    if (!fs.existsSync(animationDst)) {
      fs.mkdirSync(animationDst, { recursive: true });
    }
    
    const animationFiles = fs.readdirSync(animationSrc);
    for (const file of animationFiles) {
      if (file.endsWith('.gif')) {
        const src = path.join(animationSrc, file);
        const dst = path.join(animationDst, file);
        fs.copyFileSync(src, dst);
        copiedCount++;
      }
    }
  }

  // Copy Article folder if it exists
  const articleSrc = path.join(problemPath, 'Article');
  const articleDst = path.join(targetProblemPath, 'Article');
  
  if (fs.existsSync(articleSrc)) {
    if (!fs.existsSync(articleDst)) {
      fs.mkdirSync(articleDst, { recursive: true });
    }
    
    const articleFiles = fs.readdirSync(articleSrc);
    for (const file of articleFiles) {
      if (file.endsWith('.md')) {
        const src = path.join(articleSrc, file);
        const dst = path.join(articleDst, file);
        fs.copyFileSync(src, dst);
      }
    }
  }
}

console.log(`Copied ${copiedCount} animation files to public directory`);
