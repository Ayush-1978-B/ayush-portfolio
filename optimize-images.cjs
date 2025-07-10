const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const optimizeImage = async (inputPath, outputPath, options = {}) => {
  try {
    const { width, quality = 80, format = 'webp' } = options;
    
    let pipeline = sharp(inputPath);
    
    if (width) {
      pipeline = pipeline.resize(width, null, { withoutEnlargement: true });
    }
    
    if (format === 'webp') {
      pipeline = pipeline.webp({ quality });
    } else if (format === 'jpeg') {
      pipeline = pipeline.jpeg({ quality });
    } else if (format === 'png') {
      pipeline = pipeline.png({ quality });
    }
    
    await pipeline.toFile(outputPath);
    console.log(`Optimized: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
  }
};

const optimizeImages = async () => {
  const publicDir = path.join(__dirname, 'public');
  const imagesDir = path.join(publicDir, 'images');
  const optimizedDir = path.join(publicDir, 'images-optimized');
  
  // Create optimized directory if it doesn't exist
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
  }
  
  const imageFiles = fs.readdirSync(imagesDir).filter(file => 
    /\.(jpg|jpeg|png|gif)$/i.test(file)
  );
  
  for (const file of imageFiles) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(optimizedDir, file.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp'));
    
    // Determine optimization settings based on file size
    const stats = fs.statSync(inputPath);
    const fileSizeMB = stats.size / (1024 * 1024);
    
    let options = { quality: 80, format: 'webp' };
    
    if (fileSizeMB > 1) {
      // Large images get more aggressive optimization
      options.width = 800;
      options.quality = 70;
    } else if (fileSizeMB > 0.5) {
      // Medium images
      options.width = 1200;
      options.quality = 75;
    }
    
    await optimizeImage(inputPath, outputPath, options);
  }
  
  console.log('Image optimization complete!');
};

optimizeImages().catch(console.error); 