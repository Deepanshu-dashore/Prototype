import cloudinary from "../config/Cloudnery";

export class CloudneryService {
  static async upload(
    file,
    folder = "default",
    resource_type = "raw",
    format = null,
  ) {
    try {
      if (!file) {
        throw new Error("No file provided");
      }
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadOptions = {
        resource_type,
        folder,
      };
      // Only set format if it's a valid file extension (not 'image', 'auto', etc.)
      if (format && !["image", "video", "raw", "auto"].includes(format)) {
        uploadOptions.format = format;
      }

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(uploadOptions, (error, result) => {
            if (error) reject(error);
            resolve(result);
          })
          .end(buffer);
      });
      if (result) {
        console.log(result);
        return {
          url: result.secure_url,
          id: result.public_id,
        };
      }
    } catch (error) {
      console.log("Error in cloudnery service -", error);
      return null;
    }
  }

  static async delete(id, resource_type = "raw") {
    try {
      const result = await cloudinary.uploader.destroy(id, { resource_type });
      if (result) {
        return {
          success: true,
        };
      }
    } catch (error) {
      console.log("Error in cloudnery service -", error);
      return null;
    }
  }
}
