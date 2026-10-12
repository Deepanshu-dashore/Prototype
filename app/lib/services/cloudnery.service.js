import cloudinary from "../config/Cloudnery";

export class CloudneryService {
  /**
   * Generates a signed authentication payload for direct client-side uploads.
   * This allows files (>4.5MB up to 100MB+) to be sent directly from the browser to Cloudinary,
   * avoiding Vercel's serverless FUNCTION_PAYLOAD_TOO_LARGE (4.5MB) restriction.
   */
  static getUploadSignature(folder = "default", extraParams = {}) {
    try {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const paramsToSign = {
        folder,
        timestamp,
        ...extraParams,
      };

      const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        process.env.CLOUDINARY_SECRET
      );

      return {
        signature,
        timestamp,
        folder,
        apiKey: process.env.CLOUDINARY_API_KEY,
        cloudName: process.env.CLOUDINARY_NAME,
        ...extraParams,
      };
    } catch (error) {
      console.log("Error generating upload signature -", error);
      return null;
    }
  }

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

      // If already uploaded (client sent URL/public_id directly)
      if (typeof file === "string") {
        const buildUrl = file.includes("upload/")
          ? file.split("upload/")[1]
          : file;
        return {
          url: buildUrl,
          id: file,
        };
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadOptions = {
        resource_type,
        folder,
        chunk_size: 6000000,
      };

      if (resource_type !== "raw") {
        uploadOptions.transformation = [{ quality: "auto" }];
      }

      // Only set format if it's a valid file extension (not 'image', 'auto', etc.)
      if (format && !["image", "video", "raw", "auto"].includes(format)) {
        uploadOptions.format = format;
      }

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_chunked_stream(uploadOptions, (error, result) => {
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

  static async delete(fileId, resource_type = "raw") {
    try {
      let publicId = null;
      const fileName = fileId.split("/");
      if (resource_type !== "raw") {
        publicId = fileName.slice(1).join("/").split(".")[0];
      } else {
        publicId = fileName.slice(1).join("/");
      }
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type,
      });
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
