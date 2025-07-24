// Utility function to dynamically import all images from a folder
export const importAll = (r) => {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item);
    return null;
  });
  return images;
};

// Function to get all media (images and videos) from a specific gallery folder
export const getGalleryImages = (folderName) => {
  try {
    // Create a require context for images
    const imageContext = require.context('../img/', true, /\.(png|jpe?g|svg|gif)$/i);
    const allImages = importAll(imageContext);
    
    // Create a require context for videos
    const videoContext = require.context('../img/', true, /\.(mp4|mov|avi|webm)$/i);
    const allVideos = importAll(videoContext);
    
    // Filter images that belong to the specified folder and exclude cover images
    const folderImages = Object.keys(allImages)
      .filter(key => {
        const belongsToFolder = key.startsWith(folderName + '/');
        const isCoverImage = key.toLowerCase().includes('cover');
        return belongsToFolder && !isCoverImage;
      })
      .map(key => ({
        src: allImages[key],
        type: 'image',
        filename: key.split('/').pop()
      }));
    
    // Filter videos that belong to the specified folder
    const folderVideos = Object.keys(allVideos)
      .filter(key => {
        const belongsToFolder = key.startsWith(folderName + '/');
        const isCoverVideo = key.toLowerCase().includes('cover');
        return belongsToFolder && !isCoverVideo;
      })
      .map(key => ({
        src: allVideos[key],
        type: 'video',
        filename: key.split('/').pop()
      }));
    
    // Combine and sort by filename
    const allMedia = [...folderImages, ...folderVideos].sort((a, b) => 
      a.filename.localeCompare(b.filename)
    );
    
    return allMedia;
  } catch (error) {
    console.warn(`Could not load media from folder: ${folderName}`, error);
    return [];
  }
};

// Mapping of section IDs to folder names
export const sectionFolders = {
  0: 'Europe 2025',
  1: 'NYC Marathon 2024',
  2: 'Japan 2024',
  3: 'California 2024',
  4: 'Key West 2024',
  5: 'Mt. Rainier 2022'
};

// Function to get images for a specific section
export const getImagesForSection = (sectionId) => {
  const folderName = sectionFolders[sectionId];
  if (!folderName) {
    console.warn(`No folder mapping found for section ${sectionId}`);
    return [];
  }
  
  return getGalleryImages(folderName);
};
