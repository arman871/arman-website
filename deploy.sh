#!/data/data/com.termux/files/usr/bin/bash

# GitHub Pages Deploy Script for Aivonex Technologies
# Run this script to deploy your website to GitHub Pages

echo "🚀 Aivonex Technologies - GitHub Pages Deploy"
echo "=============================================="
echo ""

# Check if git is configured
if ! git config user.name &>/dev/null; then
    echo "⚙️  Setting up Git..."
    read -p "Enter your GitHub username: " GITHUB_USER
    read -p "Enter your GitHub email: " GITHUB_EMAIL
    
    git config --global user.name "$GITHUB_USER"
    git config --global user.email "$GITHUB_EMAIL"
    echo "✅ Git configured!"
fi

echo ""
echo "📁 Website directory: /data/data/com.termux/files/home/ice-website"
echo ""

cd /data/data/com.termux/files/home/ice-website

# Check if already a git repo
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
fi

# Add all files
echo "📝 Adding files..."
git add .

# Commit
echo "💾 Committing changes..."
git commit -m "Deploy Aivonex Technologies website"

# Check for remote
if ! git remote get-url origin &>/dev/null; then
    echo ""
    echo "📡 Setting up remote repository..."
    echo ""
    echo "Instructions:"
    echo "1. Go to https://github.com/new"
    echo "2. Create a new repository (name it 'aivonex-website' or similar)"
    echo "3. Copy your repository URL"
    echo ""
    read -p "Paste your GitHub repository URL: " REPO_URL
    
    git remote add origin "$REPO_URL"
fi

echo ""
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "📍 Your website will be live at:"
echo "   https://<your-github-username>.github.io/<repository-name>/"
echo ""
echo "⚙️  To enable GitHub Pages:"
echo "   1. Go to your repository on GitHub"
echo "   2. Click Settings → Pages"
echo "   3. Source: Deploy from branch"
echo "   4. Branch: main / Folder: / (root)"
echo "   5. Click Save"
echo ""
echo "🎉 Your website will be live in 2-3 minutes!"
