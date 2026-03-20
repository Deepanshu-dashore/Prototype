import cloudinary from "../config/Cloudnery";

export class CloudneryService {
  static async upload(
    file,
    folder = "default",
    resource_type = "raw",
    format = "",
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
        console.log(result.secure_url);
        const buildUrl = result.secure_url.split("upload/")[1];
        return {
          url: buildUrl,
          id: result.public_id,
        };
      }
    } catch (error) {
      console.log("Error in cloudnery service -", error);
      return null;
    }
  }

  static async delete(fileId, arg2 = "image", arg3 = null) {
    try {
      if (!fileId) return null;

      // Handle the case where someone calls .delete(id, folder, type)
      let resource_type = arg3 || arg2 || "image";
      // Ensure it's one of the standard Cloudinary resource types
      if (!["image", "video", "raw"].includes(resource_type)) {
        resource_type = "image";
      }

      const fileName = fileId.split("/");
      // Check if the first part is a version (starts with 'v' followed by numbers)
      const hasVersion =
        fileName[0].startsWith("v") && !isNaN(fileName[0].substring(1));

      let publicIdParts = hasVersion ? fileName.slice(1) : fileName;
      let publicId = publicIdParts.join("/");

      if (resource_type !== "raw") {
        // Remove extension for images and videos
        publicId = publicId.split(".")[0];
      }

      console.log(`Cloudnery: Deleting ${publicId} (${resource_type})`);
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type,
      });

      if (result) {
        return {
          success: true,
          result,
        };
      }
    } catch (error) {
      console.log("Error in cloudnery service -", error);
      return null;
    }
  }
}
