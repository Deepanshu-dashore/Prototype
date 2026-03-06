import cloudinary from "../config/Cloudnery";

export class CloudneryService {
  static async upload(file, folder = "default", resource_type = "auto") {
    try {
      if (!file) {
        throw new Error("No file provided");
      }
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type,
              folder,
            },
            (error, result) => {
              if (error) reject(error);
              resolve(result);
            },
          )
          .end(buffer);
      });
      if (result) {
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

  static async delete(id) {
    try {
      const result = await cloudinary.uploader.destroy(id);
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
