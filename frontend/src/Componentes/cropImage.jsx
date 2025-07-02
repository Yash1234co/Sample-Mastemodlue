export default function getCroppingImage(imageSrc, pixelCrop) {
  return new Promise((resolve, reject) => {
    if (!imageSrc) {
      reject(new Error("No image source provided."));
      return;
    }

    const image = new Image();
    image.crossOrigin = "anonymous"; // Prevent CORS issues
    image.src = imageSrc;

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty or conversion to blob failed."));
            return;
          }

          const file = new File([blob], "cropped.jpg", { type: blob.type });
          resolve(file);
        }, "image/jpeg");
      } catch (err) {
        reject(err);
      }
    };

    image.onerror = () => {
      reject(new Error("Failed to load image. Invalid or undefined imageSrc: " + imageSrc));
    };
  });
}
