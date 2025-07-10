# Deployment Guide

## 🚀 Pushing to GitHub

### Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it: `portfolio` or `ayush-portfolio`
5. Make it **Public** (for portfolio visibility)
6. **Don't** initialize with README (we already have one)
7. Click "Create repository"

### Step 2: Connect Local Repository to GitHub

```bash
# Add the remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Verify the remote was added
git remote -v
```

### Step 3: Push to GitHub

```bash
# Push to main branch
git push -u origin main

# For subsequent pushes, just use:
git push
```

## 🔐 Environment Variables Setup

### Step 1: Create .env file
Create a `.env` file in your project root (this will be ignored by Git):

```bash
# Copy the example file
cp .env.example .env
```

### Step 2: Fill in your Firebase credentials
Edit the `.env` file with your actual Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🌐 Deploy to Static Hosting

You can deploy the built `dist` folder to any static hosting provider, such as:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use a tool like `gh-pages` to publish the `dist` or `build` folder

## 🔄 Continuous Deployment

You can set up CI/CD with your preferred platform (e.g., Vercel, Netlify, GitHub Actions) for automatic deployment on push.

## 📝 Important Notes

### Security Checklist
- ✅ `.env` file is in `.gitignore`
- ✅ Firebase config is in environment variables
- ✅ No API keys in code
- ✅ Sensitive data excluded from repository

### Before Pushing
1. **Test locally**: `npm run dev`
2. **Build test**: `npm run build`
3. **Check for sensitive data**: Review all files
4. **Update README**: Ensure all links are correct

### After Deployment
1. **Test the live site**
2. **Check all links work**
3. **Verify contact form**
4. **Test on mobile devices**

## 🆘 Troubleshooting

### Common Issues

**Build fails:**
- Run `npm install` to ensure all dependencies
- Check for syntax errors in console
- Verify all imports are correct

**Deployment fails:**
- Check your hosting provider's documentation
- Verify project ID or site settings are correct
- Check project permissions

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Review hosting provider console/logs
3. Check CI/CD logs (if using)
4. Verify all environment variables are set

---

**Remember**: Never commit sensitive data like API keys or passwords to Git! 