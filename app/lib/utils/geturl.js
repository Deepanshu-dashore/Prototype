export class getUrls {
  static getUrl(url, resource_type = "image") {
    if (!url || typeof url !== "string") return "";
    if (url.includes("/upload/")) {
      url = url.split("/upload/").pop();
    } else if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/${resource_type}/upload/${url}`;
  }
}
