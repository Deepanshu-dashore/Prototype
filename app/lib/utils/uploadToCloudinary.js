/**
 * Uploads a file directly from browser to Cloudinary.
 * Bypasses Vercel's 4.5MB FUNCTION_PAYLOAD_TOO_LARGE limit.
 */
export async function uploadToCloudinaryClient(file, folder = "default", resourceType = "auto") {
  if (!file) throw new Error("No file provided");

  // 1. Get signature from Next.js server (< 1 KB)
  const signRes = await fetch("/api/cloudinary/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder }),
  });

  if (!signRes.ok) {
    const errorData = await signRes.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to authorize Cloudinary upload");
  }

  const { signature, timestamp, apiKey, cloudName } = await signRes.json();

  if (!apiKey || !cloudName || !signature) {
    throw new Error("Missing Cloudinary upload credentials");
  }

  // 2. Prepare FormData for direct Cloudinary upload
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("folder", folder);

  let endpointType = resourceType;
  if (!endpointType || endpointType === "auto") {
    if (file.type?.startsWith("image/")) {
      endpointType = "image";
    } else if (file.type?.startsWith("video/")) {
      endpointType = "video";
    } else {
      endpointType = "raw";
    }
  }

  // 3. Upload directly to Cloudinary
  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${endpointType}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!uploadRes.ok) {
    const errorData = await uploadRes.json().catch(() => ({}));
    throw new Error(errorData.error?.message || "Direct upload to Cloudinary failed");
  }

  const result = await uploadRes.json();
  const buildUrl = result.secure_url.includes("upload/")
    ? result.secure_url.split("upload/")[1]
    : result.secure_url;

  return {
    url: buildUrl,
    secure_url: result.secure_url,
    id: result.public_id,
    resourceType: endpointType,
  };
}

/**
 * Deletes an uploaded file from Cloudinary if database save fails.
 * Prevents orphaned / unnecessary storage accumulation.
 */
export async function deleteFromCloudinaryClient(fileId, resourceType = "raw") {
  if (!fileId) return;
  try {
    const res = await fetch("/api/cloudinary/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileId, resourceType }),
    });
    return await res.json();
  } catch (err) {
    console.error("Failed to delete unused Cloudinary asset:", err);
  }
}
