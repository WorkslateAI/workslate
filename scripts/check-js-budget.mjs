import { readFileSync } from 'fs';
import { join } from 'path';
import { gzipSync } from 'zlib';

const MAX_GZIP_SIZE = 100 * 1024; // 100KB

const distDir = join(process.cwd(), 'dist');
const indexPath = join(distDir, 'index.html');

try {
  const html = readFileSync(indexPath, 'utf-8');
  
  // Extract script tags with src attributes
  const scriptRegex = /<script[^>]+src="([^"]+)"[^>]*>/g;
  let match;
  let totalSize = 0;
  const scripts = [];

  while ((match = scriptRegex.exec(html)) !== null) {
    const src = match[1];
    const scriptPath = join(distDir, src);
    try {
      const content = readFileSync(scriptPath);
      const gzipped = gzipSync(content);
      const size = gzipped.length;
      totalSize += size;
      scripts.push({ src, size, sizeKB: (size / 1024).toFixed(2) });
    } catch (err) {
      console.error(`Failed to read script: ${src}`);
      process.exit(1);
    }
  }

  console.log('JavaScript gzip size check:');
  console.log('Total size:', (totalSize / 1024).toFixed(2), 'KB');
  console.log('Limit:', (MAX_GZIP_SIZE / 1024).toFixed(2), 'KB');
  console.log('\nIndividual scripts:');
  scripts.forEach(s => console.log(`  ${s.src}: ${s.sizeKB} KB`));

  if (totalSize > MAX_GZIP_SIZE) {
    console.error(`\n❌ JavaScript gzip size exceeds ${MAX_GZIP_SIZE / 1024}KB limit`);
    process.exit(1);
  }

  console.log('\n✅ JavaScript gzip size within budget');
  process.exit(0);
} catch (err) {
  console.error('Failed to check JS budget:', err.message);
  process.exit(1);
}
