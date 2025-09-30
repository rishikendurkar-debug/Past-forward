/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * Resizes an image from a data URL to a specific max width, maintaining aspect ratio.
 * @param imageDataUrl The data URL of the image to resize.
 * @param maxWidth The maximum width for the output image.
 * @returns A promise that resolves with the data URL of the resized JPEG image.
 */
export function resizeImage(imageDataUrl: string, maxWidth: number): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const aspectRatio = img.height / img.width;
            
            canvas.width = maxWidth;
            canvas.height = maxWidth * aspectRatio;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return reject(new Error('Could not get canvas context'));
            }

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Use JPEG format for better compression for photos
            resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.onerror = (err) => {
            reject(new Error('Failed to load image for resizing.'));
        };
        img.src = imageDataUrl;
    });
}
