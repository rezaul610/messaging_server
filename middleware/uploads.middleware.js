const fs = require('fs');
const path = require('path');

/**
 * Save base64 image to disk
 * @param {string} base64Image - data:image/png;base64,...
 * @param {string} folder - upload folder
 * @param {string} filenamePrefix - optional prefix
 * @returns {object} { success, filename, path }
 */
function saveBase64Image(base64Image) {
    if (!base64Image) {
        throw new Error('Base64 image is required');
    }

    const base64Data = base64Image.split(';base64,');
    const base64Header = base64Data[0];
    const base64Content = base64Data[1];
    const header = base64Header.split(':');
    const mimeType = header[1]; // e.g., image/png
    const ext = mimeType.split('/')[1]; // e.g., png
    const type = mimeType.split('/')[0]; // e.g., image

    /* // Extract extension
    const match = base64Image.match(/^data:image\/(\w+);base64,/);
    const ext = match ? match[1] : 'png';
    // Remove base64 header
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');*/

    const buffer = Buffer.from(base64Content, 'base64');

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'uploads');
    fs.mkdirSync(uploadDir, { recursive: true });

    const filename = `${type}_${Date.now()}.${ext}`;
    const filePath = path.join(uploadDir, filename);
    console.log(`Saving image to: ${filePath}`);

    fs.writeFileSync(filePath, buffer);

    return {
        success: true,
        filename,
        path: filePath
    };
}

/**
 * Retrieve image and convert to base64
 * @param {string} filePath - relative path (uploads/images/img.png)
 * @returns {object} { success, base64, mime }
 */
function getImageAsBase64(filePath) {
    if (!filePath) {
        throw new Error('File path is required');
    }

    const filename = path.basename(filePath);
    const fileNama = filename.split('_')[0];
    const ext = filename.split('.')[1];
    const mime = `${fileNama}/${ext}`;

    if (!fs.existsSync(filePath)) {
        throw new Error('Image not found');
    }

    // Detect mime type from extension
    // const ext = path.extname(filePath).replace('.', '');
    // const mime = `image/${ext === 'jpg' ? 'jpeg' : ext}`;

    const imageBuffer = fs.readFileSync(filePath);
    const base64 = `data:${mime};base64,${imageBuffer.toString('base64')}`;

    return base64;
}

module.exports = {
    saveBase64Image,
    getImageAsBase64,
};
