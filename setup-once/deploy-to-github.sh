#!/bin/bash

# GitHub Pages Deployment Script for Rugby Play Builder
# This script helps you deploy to GitHub Pages in one go

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Rugby Play Builder - GitHub Pages Deployment ===${NC}\n"

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}Error: Git is not installed. Please install Git first.${NC}"
    echo "Download from: https://git-scm.com/"
    exit 1
fi

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed. Please install Node.js first.${NC}"
    echo "Download from: https://nodejs.org/"
    exit 1
fi

# Prompt for GitHub username
echo -e "${YELLOW}Enter your GitHub username:${NC}"
read GITHUB_USERNAME

# Prompt for repository name
echo -e "${YELLOW}Enter your repository name (default: rugby-play-builder):${NC}"
read REPO_NAME
REPO_NAME=${REPO_NAME:-rugby-play-builder}

# Update package.json homepage
echo -e "\n${GREEN}Updating package.json with your GitHub info...${NC}"
HOMEPAGE="https://$GITHUB_USERNAME.github.io/$REPO_NAME"

# Use sed to update the homepage field (works on Mac/Linux)
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|\"homepage\": \".*\"|\"homepage\": \"$HOMEPAGE\"|" package.json
else
    # Linux
    sed -i "s|\"homepage\": \".*\"|\"homepage\": \"$HOMEPAGE\"|" package.json
fi

echo -e "${GREEN}Homepage set to: $HOMEPAGE${NC}"

# Check if already a git repository
if [ -d ".git" ]; then
    echo -e "\n${YELLOW}Git repository already exists. Skipping git init.${NC}"
else
    echo -e "\n${GREEN}Initializing Git repository...${NC}"
    git init
fi

# Check if remote exists
if git remote get-url origin &> /dev/null; then
    echo -e "${YELLOW}Remote 'origin' already exists. Skipping remote add.${NC}"
else
    echo -e "\n${GREEN}Adding GitHub remote...${NC}"
    git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
fi

# Install dependencies
echo -e "\n${GREEN}Installing dependencies...${NC}"
npm install

# Commit all files
echo -e "\n${GREEN}Committing files...${NC}"
git add .
git commit -m "Initial commit - Rugby Play Builder" || echo "Nothing to commit or already committed"

# Push to GitHub
echo -e "\n${GREEN}Pushing to GitHub...${NC}"
git branch -M main
git push -u origin main

# Deploy to GitHub Pages
echo -e "\n${GREEN}Deploying to GitHub Pages...${NC}"
npm run deploy

# Final message
echo -e "\n${GREEN}=== Deployment Complete! ===${NC}"
echo -e "\nYour app should be live at:"
echo -e "${GREEN}$HOMEPAGE${NC}"
echo -e "\nNote: It may take 1-2 minutes for GitHub Pages to update."
echo -e "\nTo deploy updates in the future, just run:"
echo -e "${YELLOW}npm run deploy${NC}"
