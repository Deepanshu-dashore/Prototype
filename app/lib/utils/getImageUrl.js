export default function getImageUrl(publicId) {
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/${publicId}`;
}
