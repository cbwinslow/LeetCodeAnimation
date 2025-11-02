import fs from 'fs';
import path from 'path';

export interface Problem {
  id: string;
  number: number;
  title: string;
  slug: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  hasAnimation: boolean;
  hasArticle: boolean;
  animationPath?: string;
  articlePath?: string;
  category?: string;
}

function extractProblemInfo(folderName: string): { number: number; title: string; slug: string } | null {
  // Match patterns like "0001-Two-Sum" or "1054-rearrangeBarcodes"
  const match = folderName.match(/^(\d+)-(.+)$/);
  if (!match) return null;

  const number = parseInt(match[1], 10);
  const title = match[2].replace(/-/g, ' ');
  const slug = folderName;

  return { number, title, slug };
}

function getCategory(number: number): string {
  // Categorize based on problem number ranges (simplified)
  if (number <= 100) return 'Arrays & Strings';
  if (number <= 200) return 'Linked Lists & Trees';
  if (number <= 300) return 'Dynamic Programming';
  if (number <= 400) return 'Advanced Topics';
  return 'Others';
}

export function getAllProblems(): Problem[] {
  const rootDir = path.join(process.cwd(), '..');
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  
  const problems: Problem[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    
    const problemInfo = extractProblemInfo(entry.name);
    if (!problemInfo) continue;

    const problemPath = path.join(rootDir, entry.name);
    const animationPath = path.join(problemPath, 'Animation', 'Animation.gif');
    const articleDir = path.join(problemPath, 'Article');

    let articleFile = '';
    if (fs.existsSync(articleDir)) {
      const articles = fs.readdirSync(articleDir).filter(f => f.endsWith('.md'));
      if (articles.length > 0) {
        articleFile = articles[0];
      }
    }

    problems.push({
      id: entry.name,
      number: problemInfo.number,
      title: problemInfo.title,
      slug: problemInfo.slug,
      hasAnimation: fs.existsSync(animationPath),
      hasArticle: !!articleFile,
      animationPath: fs.existsSync(animationPath) ? `/problems/${entry.name}/Animation/Animation.gif` : undefined,
      articlePath: articleFile ? `${entry.name}/Article/${articleFile}` : undefined,
      category: getCategory(problemInfo.number),
    });
  }

  // Sort by problem number
  return problems.sort((a, b) => a.number - b.number);
}

// For static generation
export function getProblemBySlug(slug: string): Problem | undefined {
  const problems = getAllProblems();
  return problems.find(p => p.slug === slug);
}

export function getArticleContent(articlePath: string | undefined): string | null {
  if (!articlePath) return null
  
  try {
    const fullPath = path.join(process.cwd(), '..', articlePath)
    const content = fs.readFileSync(fullPath, 'utf-8')
    return content
  } catch {
    return null
  }
}
