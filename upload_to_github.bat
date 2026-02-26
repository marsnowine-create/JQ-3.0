@echo off
setlocal

echo [INFO] Checking for Git...
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not found in PATH.
    echo Please install Git from https://git-scm.com/ and try again.
    pause
    exit /b 1
)

echo [INFO] Initializing Git repository...
if not exist .git (
    git init
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to initialize git repository.
        pause
        exit /b 1
    )
)

echo [INFO] Adding files...
git add .

echo [INFO] Committing changes...
git commit -m "Update JQ-3.0"

echo [INFO] Renaming branch to main...
git branch -M main

echo [INFO] Configuring remote origin...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/marsnowine-create/JQ-3.0.git

echo [INFO] Pushing to remote...
echo [NOTE] You may be asked to enter your GitHub credentials in a pop-up window.
git push -u origin main

echo [INFO] Deploying to GitHub Pages...
call npm run deploy

if %errorlevel% equ 0 (
    echo [SUCCESS] Project successfully uploaded and deployed to GitHub!
    echo Page URL: https://marsnowine-create.github.io/JQ-3.0/
) else (
    echo [ERROR] Failed to push or deploy. Please check your internet connection and permissions.
)

pause
