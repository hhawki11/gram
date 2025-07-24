# Google Drive API Setup Guide

## Step 1: Enable Google Drive API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Drive API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click on it and press "Enable"

## Step 2: Create API Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the API key
4. (Optional) Restrict the API key:
   - Click on the API key to edit it
   - Under "API restrictions", select "Restrict key"
   - Choose "Google Drive API"
   - Under "Website restrictions", add your domain

## Step 3: Set Up Your .env File

1. Open your `.env` file in the project root
2. Replace `your_google_drive_api_key_here` with your actual API key
3. Add your Google Drive folder IDs (see Step 4)

## Step 4: Get Google Drive Folder IDs

1. Create folders in Google Drive for each gallery section:
   - Europe 2025
   - NYC Marathon 2024
   - Japan 2024
   - California 2024
   - Key West 2024
   - Mt. Rainier 2022

2. For each folder:
   - Open the folder in Google Drive
   - Copy the folder ID from the URL (the part after `/folders/`)
   - Example: `https://drive.google.com/drive/folders/1ABC123DEF456GHI789JKL` 
   - Folder ID would be: `1ABC123DEF456GHI789JKL`

3. Make sure each folder is shared publicly:
   - Right-click folder → "Share"
   - Change to "Anyone with the link can view"
   - Click "Copy link"

## Step 5: Update .env File

```env
REACT_APP_GOOGLE_DRIVE_API_KEY=your_actual_api_key_here
REACT_APP_EUROPE_FOLDER_ID=your_europe_folder_id_here
REACT_APP_NYC_FOLDER_ID=your_nyc_folder_id_here
REACT_APP_JAPAN_FOLDER_ID=your_japan_folder_id_here
REACT_APP_CALIFORNIA_FOLDER_ID=your_california_folder_id_here
REACT_APP_KEYWEST_FOLDER_ID=your_keywest_folder_id_here
REACT_APP_RAINIER_FOLDER_ID=your_rainier_folder_id_here
```

## Step 6: Upload and Share Images

1. Upload images to your Google Drive folders
2. **IMPORTANT**: Make sure all images AND folders are publicly viewable:
   
   **For Folders:**
   - Right-click each folder → "Share"
   - Change to "Anyone with the link can view"
   - Click "Copy link"
   
   **For Images:**
   - Select all images in a folder (Ctrl+A or Cmd+A)
   - Right-click → "Share" 
   - Set to "Anyone with the link can view"
   - Click "Done"

3. **Alternative Method (Recommended)**:
   - Make the parent folder public first
   - Then upload images - they'll inherit the public permissions
   - This ensures all new images are automatically accessible

## Step 7: Test Your Setup

1. Run your app: `npm start`
2. Navigate to a gallery section
3. You should see images loading from Google Drive
4. If images don't load, check the browser console for error messages

## Troubleshooting

- **Black/missing images**: 
  - Check that both folders AND individual images are set to "Anyone with the link can view"
  - Try the alternative method: make folder public first, then upload images
  - Wait 5-10 minutes after making images public for changes to take effect
- **API quota exceeded**: Google Drive API has daily limits
- **403 errors**: Check if API key is correct and has proper permissions
- **Images not loading**: Ensure images are publicly shared
- **Empty galleries**: Verify folder IDs are correct
- **CORS errors**: The app now uses Google Drive's thumbnail API which is more web-friendly

## Common Issues

1. **Images appear black**: This happens when images aren't properly shared
   - Solution: Re-share the folder and all images as "Anyone with the link can view"
   
2. **Some images load, others don't**: Mixed permissions on individual files
   - Solution: Select all images in folder → Share → "Anyone with the link can view"
   
3. **Images work in browser but not in app**: CORS policy issues
   - Solution: The app now uses thumbnail API which should resolve this

## Security Notes

- Keep your API key secure
- Consider using environment-specific API keys
- Monitor API usage in Google Cloud Console
- The `.env` file should not be committed to version control (it's in .gitignore)
