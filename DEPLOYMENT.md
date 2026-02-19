# Deploying to Cloudflare Pages

This guide will help you deploy your portfolio to Cloudflare Pages.

## Prerequisites

- A Cloudflare account (free tier is sufficient)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Cloudflare Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Cloudflare Pages deployment"
   git push origin main
   ```

2. **Go to Cloudflare Pages**
   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Workers & Pages** → **Create application** → **Pages**
   - Click **Connect to Git**

3. **Connect your repository**
   - Select your Git provider (GitHub, GitLab, or Bitbucket)
   - Authorize Cloudflare to access your repositories
   - Select the `2025portfolio` repository

4. **Configure build settings**
   - **Project name**: `2025portfolio` (or your preferred name)
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave empty or use root)

5. **Deploy**
   - Click **Save and Deploy**
   - Wait for the build to complete (usually 1-3 minutes)
   - Your site will be live at: `https://2025portfolio.pages.dev`

### Option 2: Deploy via Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Build your site**
   ```bash
   npm run build
   ```

4. **Deploy**
   ```bash
   wrangler pages deploy dist --project-name=2025portfolio
   ```

## Custom Domain Setup

After deployment, you can add a custom domain:

1. Go to your project in Cloudflare Pages
2. Click **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter your domain name
5. Follow the instructions to update your DNS records

## Automatic Deployments

Once connected to Git, Cloudflare Pages will automatically:
- Deploy every push to your main branch to production
- Deploy pull requests to preview URLs
- Build and deploy within minutes

## Local Development

To run the site locally:

```bash
# Start development server
npm run dev

# Visit http://localhost:4000
```

To test the production build locally:

```bash
# Build the site
npm run build

# Serve the dist folder (you can use any static server)
npx serve dist
```

## Troubleshooting

### Build fails on Cloudflare
- Check that your `package.json` has all required dependencies
- Verify the build command is correct: `npm run build`
- Check the build output directory is set to: `dist`

### Pages don't load correctly
- Ensure all asset paths are relative or start with `/`
- Check browser console for 404 errors
- Verify all static files are in the `public` folder

### Need to update the site
1. Make your changes locally
2. Test with `npm run dev`
3. Commit and push to your repository
4. Cloudflare Pages will automatically rebuild and deploy

## What's Included

The build process:
- ✅ Pre-renders all EJS templates to static HTML
- ✅ Copies all static assets (CSS, JS, images)
- ✅ Generates clean URLs (e.g., `/about` instead of `/about.html`)
- ✅ Optimized for Cloudflare's global CDN

## Performance Benefits

By deploying to Cloudflare Pages, you get:
- 🚀 Global CDN with 300+ data centers
- ⚡ Automatic HTTPS
- 🔄 Automatic deployments from Git
- 📊 Built-in analytics
- 🆓 Unlimited bandwidth (on free tier)

## Need Help?

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Community](https://community.cloudflare.com/)
