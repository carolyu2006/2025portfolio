const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

// Define all routes and their corresponding templates
const routes = [
    { template: 'index', output: 'index.html' },
    { template: 'projects', output: 'projects/index.html' },
    { template: 'about', output: 'about/index.html' },
    { template: 'play', output: 'play/index.html' },
    { template: 'projects/intertabs', output: 'projects/intertabs/index.html' },
    { template: 'projects/paletteu', output: 'projects/paletteu/index.html' },
    { template: 'projects/mbtiidealpartner', output: 'projects/mbtiidealpartner/index.html' },
    { template: 'projects/everstream', output: 'projects/everstream/index.html' },
    { template: 'projects/albertplus', output: 'projects/albertplus/index.html' },
    { template: 'projects/orangobranding', output: 'projects/orangobranding/index.html' },
];

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

console.log('🚀 Starting build process...\n');

// Pre-render each route
routes.forEach(route => {
    try {
        const templatePath = path.join(__dirname, 'views', `${route.template}.ejs`);
        const outputPath = path.join(distDir, route.output);
        
        // Render the EJS template
        const html = ejs.renderFile(templatePath, {}, { views: [path.join(__dirname, 'views')] }, (err, str) => {
            if (err) {
                console.error(`❌ Error rendering ${route.template}:`, err);
                return;
            }
            
            // Create output directory if it doesn't exist
            const outputDir = path.dirname(outputPath);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }
            
            // Write the rendered HTML to the output file
            fs.writeFileSync(outputPath, str);
            console.log(`✅ Generated: ${route.output}`);
        });
    } catch (error) {
        console.error(`❌ Error processing ${route.template}:`, error);
    }
});

// Copy public directory to dist
setTimeout(() => {
    console.log('\n📦 Copying static assets...');
    
    const publicDir = path.join(__dirname, 'public');
    const publicDistDir = path.join(distDir);
    
    // Copy all files from public to dist
    copyRecursiveSync(publicDir, publicDistDir);
    
    console.log('✅ Static assets copied');
    console.log('\n✨ Build complete! Output in ./dist directory\n');
}, 500);

// Helper function to copy directory recursively
function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(
                path.join(src, childItemName),
                path.join(dest, childItemName)
            );
        });
    } else {
        // Skip files larger than 25MB (Cloudflare Pages limit)
        const fileSizeInMB = stats.size / (1024 * 1024);
        if (fileSizeInMB > 25) {
            console.log(`⚠️  Skipping large file (${fileSizeInMB.toFixed(1)}MB): ${path.relative(process.cwd(), src)}`);
            return;
        }
        fs.copyFileSync(src, dest);
    }
}
