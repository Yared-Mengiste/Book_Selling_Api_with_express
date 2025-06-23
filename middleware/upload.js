import multer from 'multer';

// Configure multer to store uploaded files in 'uploads/cover_images' directory
const upload = multer({ dest: 'uploads/cover_images' }).single('coverImage');

// Export the configured upload middleware
export default upload;