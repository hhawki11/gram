# Dynamic Media Loading System

## How It Works

Your gallery now automatically loads both images and videos from specific folders based on the section. No more manual importing required!

## Folder Structure

```
src/img/
├── Europe 2025/          → Gallery Section 0
│   ├── photo1.jpg
│   ├── video1.mp4
│   └── cover.JPG
├── NYC Marathon 2024/    → Gallery Section 1  
├── Japan 2024/           → Gallery Section 2
├── California 2024/      → Gallery Section 3
├── Key West 2024/        → Gallery Section 4
└── Mt. Rainier 2022/     → Gallery Section 5
```

## Adding New Media

### Easy Method:
1. **Drop images and videos** into the appropriate folder (e.g., `/src/img/Key West 2024/`)
2. **Restart the dev server** (`npm start`)
3. **Media appears automatically** in the gallery!

### Supported Formats:
**Images**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.svg`
**Videos**: `.mp4`, `.mov`, `.avi`, `.webm`
- Case insensitive (`.JPG`, `.PNG`, `.MP4` etc. work too)

### Automatic Exclusions:
- **Cover images**: Any image with "cover" in the filename (e.g., `cover.jpg`, `Cover.JPG`, `album-cover.png`) are automatically excluded from galleries
- **Reason**: Cover images are typically used for the main scrolling gallery background, not the detailed photo galleries

## Adding New Gallery Sections

### To add a new section (e.g., "Hawaii 2025"):

1. **Create folder**: `/src/img/Hawaii 2025/`
2. **Add images** to the folder
3. **Update the mapping** in `/src/utils/imageLoader.js`:
   ```javascript
   export const sectionFolders = {
     0: 'Europe 2025',
     1: 'NYC Marathon 2024',
     2: 'Japan 2024',
     3: 'California 2024',
     4: 'Key West 2024',
     5: 'Mt. Rainier 2022',
     6: 'Hawaii 2025'  // Add this line
   };
   ```
4. **Add section title** in `Gallery.js`:
   ```javascript
   const sectionTitles = {
     // ...existing titles...
     6: "Hawaii 2025"  // Add this line
   };
   ```

## Benefits

✅ **No more manual imports** - just drop images in folders
✅ **Automatic discovery** - all images in folder are loaded
✅ **Easy organization** - one folder per trip/event
✅ **Fallback system** - shows placeholder images if folder is empty
✅ **Performance** - only loads images when gallery is opened

## Troubleshooting

**No images showing?**
- Check folder name matches exactly (case sensitive)
- Restart dev server after adding images
- Check browser console for error messages

**Images not updating?**
- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
- Restart development server

**Wrong section showing images?**
- Verify section ID mapping in `imageLoader.js`
- Check folder names match exactly

## File Organization Tips

- Keep image file names descriptive
- Use consistent naming (e.g., IMG_001.jpg, IMG_002.jpg)
- **Cover images are automatically excluded** from galleries (any filename containing "cover")
- Cover images should be used for the main scrolling gallery backgrounds
- The system loads images in alphabetical order by filename
