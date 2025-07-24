// Google Drive API utility functions
// You'll need to set up Google Drive API credentials first

const GOOGLE_DRIVE_API_KEY = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY || 'YOUR_API_KEY_HERE';

// Folder IDs for different galleries
const FOLDER_IDS = {
  'Europe 2025': process.env.REACT_APP_EUROPE_FOLDER_ID || 'YOUR_EUROPE_FOLDER_ID',
  'NYC Marathon 2024': process.env.REACT_APP_NYC_FOLDER_ID || 'YOUR_NYC_FOLDER_ID',
  'Japan 2024': process.env.REACT_APP_JAPAN_FOLDER_ID || 'YOUR_JAPAN_FOLDER_ID',
  'California 2024': process.env.REACT_APP_CALIFORNIA_FOLDER_ID || 'YOUR_CALIFORNIA_FOLDER_ID',
  'Key West 2024': process.env.REACT_APP_KEYWEST_FOLDER_ID || 'YOUR_KEYWEST_FOLDER_ID',
  'Mt. Rainier 2022': process.env.REACT_APP_RAINIER_FOLDER_ID || 'YOUR_RAINIER_FOLDER_ID'
};

export const fetchImagesFromDriveFolder = async (folderId) => {
  try {
    if (!GOOGLE_DRIVE_API_KEY || GOOGLE_DRIVE_API_KEY === 'YOUR_API_KEY_HERE') {
      console.warn('Google Drive API key not configured');
      return [];
    }

    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${GOOGLE_DRIVE_API_KEY}&fields=files(id,name,mimeType,modifiedTime)&orderBy=name`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter for image files only
    const imageFiles = data.files.filter(file => 
      file.mimeType.startsWith('image/')
    );
    
    // Convert to direct download URLs - using the thumbnail API for better web compatibility
    const imageUrls = imageFiles.map(file => ({
      id: file.id,
      name: file.name,
      // Use Google Drive's thumbnail API which is more web-friendly
      url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
      // Fallback URL for direct access
      directUrl: `https://drive.google.com/uc?id=${file.id}`,
      modifiedTime: file.modifiedTime
    }));
    
    return imageUrls;
  } catch (error) {
    console.error('Error fetching images from Google Drive:', error);
    return [];
  }
};

export const getFolderIdBySection = (sectionId) => {
  const sectionNames = [
    'Europe 2025',
    'NYC Marathon 2024', 
    'Japan 2024',
    'California 2024',
    'Key West 2024',
    'Mt. Rainier 2022'
  ];
  
  const sectionName = sectionNames[sectionId];
  return FOLDER_IDS[sectionName];
};

// Cache for storing fetched images to reduce API calls
const imageCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getCachedImages = async (folderId) => {
  const cacheKey = folderId;
  const cached = imageCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const images = await fetchImagesFromDriveFolder(folderId);
  imageCache.set(cacheKey, {
    data: images,
    timestamp: Date.now()
  });
  
  return images;
};
