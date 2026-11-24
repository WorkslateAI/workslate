import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceDir = join(__dirname, '../public/assets/images');
const outputDir = join(__dirname, '../public/assets/images');

const sizes = [480, 768, 1200];
const formats = ['avif', 'webp', 'jpeg'];

const images = [
  'hero-markets-abc-workslate-centre.png',
  'local-wallet-international-tokens.png',
  'evm-nodes-workslate.png',
  'token-movement-traceability.png',
  'market-a-b-c-currency-tokens.png',
  'wallet-orchestration.png',
  'logo-mark.png',
  'workslate-Logo.png',
  'logo.png',
  'logo@1x.png',
];

async function optimizeImage(imageName) {
  const inputPath = join(sourceDir, imageName);
  const baseName = imageName.replace(/\.[^/.]+$/, '');
  
  console.log(`Processing ${imageName}...`);
  
  // Get original dimensions
  const metadata = await sharp(inputPath).metadata();
  const maxWidth = metadata.width;
  
  // Add max width to sizes if not already present
  const allSizes = [...new Set([...sizes, maxWidth])].sort((a, b) => a - b);
  
  for (const size of allSizes) {
    const targetWidth = Math.min(size, maxWidth);
    const suffix = targetWidth === maxWidth ? '' : `-${targetWidth}w`;
    
    for (const format of formats) {
      const outputPath = join(outputDir, `${baseName}${suffix}.${format}`);
      
      let sharpInstance = sharp(inputPath).resize(targetWidth, null, {
        fit: 'inside',
        withoutEnlargement: true,
      });
      
      if (format === 'avif') {
        sharpInstance = sharpInstance.avif({
          quality: 75,
          effort: 6,
        });
      } else if (format === 'webp') {
        sharpInstance = sharpInstance.webp({
          quality: 80,
          effort: 6,
        });
      } else if (format === 'jpeg') {
        sharpInstance = sharpInstance.jpeg({
          quality: 85,
          progressive: true,
        });
      }
      
      await sharpInstance.toFile(outputPath);
      console.log(`  Generated: ${baseName}${suffix}.${format}`);
    }
  }
  
  console.log(`✓ Completed ${imageName}\n`);
}

async function main() {
  console.log('Starting image optimization...\n');

  // Optional CLI filter: `node optimize-images.mjs <filename>` processes only
  // that image; with no argument the full list is processed.
  const filter = process.argv[2];
  const targets = filter ? images.filter((name) => name === filter) : images;

  if (filter && targets.length === 0) {
    console.warn(`No image named "${filter}" in the optimization list.`);
    return;
  }

  for (const image of targets) {
    try {
      await optimizeImage(image);
    } catch (error) {
      console.error(`✗ Error processing ${image}:`, error.message);
    }
  }
  
  console.log('\nImage optimization complete!');
}

main().catch(console.error);
