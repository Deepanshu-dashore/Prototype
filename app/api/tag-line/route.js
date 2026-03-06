import connect from "@/app/lib/db/connect";
import { User } from "@/app/lib/models/user";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export const GET = async () => {
  try {
    await connect();
    const tagLine = await User.findOne({});
    return ApiResponse(
      200,
      tagLine?.tagLine ||
        "Welcome to CC Matting - Industry leading solutions for all your needs",
      "Tag line fetched successfully",
    );
  } catch (error) {
    console.error("Error fetching tag line:", error);
    return ApiResponse(500, error, "Failed to fetch tag line");
  }
};

export const POST = async (req) => {
  try {
    await connect();
    const body = await req.json();
    let tagLine = await User.findOne({});
    if (!tagLine) {
      return ApiResponse(404, "Tag line not found", "Tag line not found");
    } else {
      tagLine.tagLine = body.tagLine;
    }
    await tagLine.save();
    return ApiResponse(200, tagLine.tagLine, "Tag line updated successfully");
  } catch (error) {
    console.error("Error updating tag line:", error);
    return ApiResponse(500, error, "Failed to update tag line");
  }
};

export const DELETE = async () => {
  try {
    await connect();
    const tagLine = await User.findOne({});
    if (tagLine) {
      tagLine.tagLine = "";
      await tagLine.save();
    }
    return ApiResponse(200, "", "Tag line deleted successfully");
  } catch (error) {
    console.error("Error deleting tag line:", error);
    return ApiResponse(500, error, "Failed to delete tag line");
  }
};
