@echo off
REM GitHub Pages Deployment Script for Rugby Play Builder (Windows)
REM This script helps you deploy to GitHub Pages in one go

echo === Rugby Play Builder - GitHub Pages Deployment ===
echo.

REM Check if Git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Git is not installed. Please install Git first.
    echo Download from: https://git-scm.com/
    pause
    exit /b 1
)

REM Check if Node is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

REM Prompt for GitHub username
set /p GITHUB_USERNAME="Enter your GitHub username: "

REM Prompt for repository name
set /p REPO_NAME="Enter your repository name (default: rugby-play-builder): "
if "%REPO_NAME%"=="" set REPO_NAME=rugby-play-builder

REM Update package.json homepage
echo.
echo Updating package.json with your GitHub info...
set HOMEPAGE=https://%GITHUB_USERNAME%.github.io/%REPO_NAME%

REM Use PowerShell to update package.json
powershell -Command "(Get-Content package.json) -replace '\"homepage\": \".*\"', '\"homepage\": \"%HOMEPAGE%\"' | Set-Content package.json"

echo Homepage set to: %HOMEPAGE%

REM Check if already a git repository
if exist .git (
    echo.
    echo Git repository already exists. Skipping git init.
) else (
    echo.
    echo Initializing Git repository...
    git init
)

REM Check if remote exists
git remote get-url origin >nul 2>nul
if %errorlevel% equ 0 (
    echo Remote 'origin' already exists. Skipping remote add.
) else (
    echo.
    echo Adding GitHub remote...
    git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git
)

REM Install dependencies
echo.
echo Installing dependencies...
call npm install

REM Commit all files
echo.
echo Committing files...
git add .
git commit -m "Initial commit - Rugby Play Builder"

REM Push to GitHub
echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

REM Deploy to GitHub Pages
echo.
echo Deploying to GitHub Pages...
call npm run deploy

REM Final message
echo.
echo === Deployment Complete! ===
echo.
echo Your app should be live at:
echo %HOMEPAGE%
echo.
echo Note: It may take 1-2 minutes for GitHub Pages to update.
echo.
echo To deploy updates in the future, just run:
echo npm run deploy
echo.
pause
