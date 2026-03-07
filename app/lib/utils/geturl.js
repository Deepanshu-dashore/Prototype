export class getUrls {
  static getUrl(url, resource_type = "image") {
    return `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/${resource_type}/upload/${url}`;
  }
}
