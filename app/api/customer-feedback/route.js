import connect from "@/app/lib/db/connect";
import { CustomerFeedback } from "@/app/lib/models/customerFeedback";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

// ======================================================
// GET ALL CUSTOMER FEEDBACK
// ======================================================

export async function GET(req) {
  try {
    await connect();

    const { searchParams } = new URL(req.url);

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1
    );

    const limit = Math.min(
      Math.max(
        Number(searchParams.get("limit")) || 10,
        1
      ),
      100
    );

    const search =
      searchParams.get("search")?.trim() || "";

    const status =
      searchParams.get("status")?.trim() || "";

    const skip = (page - 1) * limit;

    // ==================================================
    // FILTER
    // ==================================================

    const filter = {};

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          companyOrganisation: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (
      status &&
      ["New", "Read", "Responded"].includes(status)
    ) {
      filter.status = status;
    }

    // ==================================================
    // FETCH DATA
    // ==================================================

    const [feedback, total] =
      await Promise.all([
        CustomerFeedback.find(filter)
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit)
          .lean(),

        CustomerFeedback.countDocuments(
          filter
        ),
      ]);

    const totalPages =
      Math.ceil(total / limit) || 1;

    return ApiResponse(
      200,
      {
        feedback,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      },
      "Customer feedback fetched successfully"
    );
  } catch (error) {
    console.error(
      "GET CUSTOMER FEEDBACK ERROR:",
      error
    );

    return ApiResponse(
      500,
      null,
      error?.message ||
        "Failed to fetch customer feedback"
    );
  }
}

// ======================================================
// CREATE CUSTOMER FEEDBACK
// ======================================================
export async function POST(req) {
  try {
    console.log("=================================");
    console.log("CUSTOMER FEEDBACK POST START");
    console.log("=================================");

    // -----------------------------------------------
    // DATABASE CONNECTION
    // -----------------------------------------------

    await connect();

    console.log("MongoDB connected");

    // -----------------------------------------------
    // REQUEST BODY
    // -----------------------------------------------

    const body = await req.json();

    console.log("Request body:");
    console.log(body);

    // -----------------------------------------------
    // REQUIRED FIELDS
    // -----------------------------------------------

    const requiredFields = [
      "email",
      "salesProcessClarity",
      "installationSafetyCompliance",
      "productsMeetNeeds",
      "productRangeQuality",
      "responsiveness",
      "trainingSatisfaction",
      "overallSatisfaction",
      "repurchaseLikelihood",
      "recommendToColleague",
      "name",
      "titleRole",
      "companyOrganisation",
    ];

    for (const field of requiredFields) {
      if (
        body[field] === undefined ||
        body[field] === null ||
        body[field] === ""
      ) {
        return ApiResponse(
          400,
          null,
          `${field} is required`
        );
      }
    }

    // -----------------------------------------------
    // EMAIL
    // -----------------------------------------------

    const email = String(body.email)
      .trim()
      .toLowerCase();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return ApiResponse(
        400,
        null,
        "Please enter a valid email address"
      );
    }

    // -----------------------------------------------
    // RATINGS
    // -----------------------------------------------

    const ratingFields = [
      "salesProcessClarity",
      "productsMeetNeeds",
      "productRangeQuality",
      "responsiveness",
      "trainingSatisfaction",
      "overallSatisfaction",
      "repurchaseLikelihood",
    ];

    const ratings = {};

    for (const field of ratingFields) {
      const value = Number(body[field]);

      if (
        !Number.isInteger(value) ||
        value < 0 ||
        value > 10
      ) {
        return ApiResponse(
          400,
          null,
          `${field} must be a number between 0 and 10`
        );
      }

      ratings[field] = value;
    }

    // -----------------------------------------------
    // YES / NO
    // -----------------------------------------------

    if (
      !["Yes", "No"].includes(
        body.installationSafetyCompliance
      )
    ) {
      return ApiResponse(
        400,
        null,
        "Installation safety response must be Yes or No"
      );
    }

    if (
      !["Yes", "No"].includes(
        body.recommendToColleague
      )
    ) {
      return ApiResponse(
        400,
        null,
        "Recommendation response must be Yes or No"
      );
    }

    // -----------------------------------------------
    // TEXT
    // -----------------------------------------------

    const name = String(body.name).trim();

    const titleRole =
      String(body.titleRole).trim();

    const companyOrganisation =
      String(
        body.companyOrganisation
      ).trim();

    const comments =
      String(body.comments || "").trim();

    if (
      name.length < 2 ||
      name.length > 100
    ) {
      return ApiResponse(
        400,
        null,
        "Name must be between 2 and 100 characters"
      );
    }

    if (titleRole.length > 100) {
      return ApiResponse(
        400,
        null,
        "Title / Role cannot exceed 100 characters"
      );
    }

    if (
      companyOrganisation.length > 150
    ) {
      return ApiResponse(
        400,
        null,
        "Company / Organisation cannot exceed 150 characters"
      );
    }

    if (comments.length > 1000) {
      return ApiResponse(
        400,
        null,
        "Comments cannot exceed 1,000 characters"
      );
    }

    // -----------------------------------------------
    // CREATE OBJECT
    // -----------------------------------------------

    const feedbackData = {
      email,

      ...ratings,

      installationSafetyCompliance:
        body.installationSafetyCompliance,

      recommendToColleague:
        body.recommendToColleague,

      comments,

      name,

      titleRole,

      companyOrganisation,

      status: "New",

      emailSent: false,
    };

    console.log(
      "Data going to MongoDB:"
    );

    console.log(feedbackData);

    // -----------------------------------------------
    // SAVE
    // -----------------------------------------------

    const feedback =
      await CustomerFeedback.create(
        feedbackData
      );

    console.log(
      "Feedback saved successfully:",
      feedback._id
    );

    // -----------------------------------------------
    // RESPONSE
    // -----------------------------------------------

    return ApiResponse(
      201,
      feedback,
      "Customer feedback submitted successfully"
    );
  } catch (error) {
    console.error(
      "================================="
    );

    console.error(
      "CUSTOMER FEEDBACK ERROR"
    );

    console.error(
      "Error name:",
      error?.name
    );

    console.error(
      "Error message:",
      error?.message
    );

    console.error(
      "Error code:",
      error?.code
    );

    console.error(
      "Error stack:",
      error?.stack
    );

    console.error(
      "================================="
    );

    // -----------------------------------------------
    // MONGOOSE VALIDATION ERROR
    // -----------------------------------------------

    if (
      error?.name ===
      "ValidationError"
    ) {
      const messages =
        Object.values(
          error.errors || {}
        ).map(
          (item) =>
            item.message
        );

      return ApiResponse(
        400,
        null,
        messages.join(", ") ||
          "Validation failed"
      );
    }

    // -----------------------------------------------
    // DUPLICATE KEY
    // -----------------------------------------------

    if (error?.code === 11000) {
      return ApiResponse(
        409,
        null,
        "Duplicate data found"
      );
    }

    // -----------------------------------------------
    // GENERAL ERROR
    // -----------------------------------------------

    return ApiResponse(
      500,
      null,
      error?.message ||
        "Failed to submit customer feedback"
    );
  }
}

// ======================================================
// UPDATE FEEDBACK STATUS
// ======================================================

export async function PATCH(req) {
  try {
    await connect();

    const body = await req.json();

    const {
      id,
      status,
    } = body;

    if (!id) {
      return ApiResponse(
        400,
        null,
        "Feedback ID is required"
      );
    }

    if (
      ![
        "New",
        "Read",
        "Responded",
      ].includes(status)
    ) {
      return ApiResponse(
        400,
        null,
        "Invalid feedback status"
      );
    }

    const feedback =
      await CustomerFeedback.findByIdAndUpdate(
        id,
        {
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!feedback) {
      return ApiResponse(
        404,
        null,
        "Customer feedback not found"
      );
    }

    return ApiResponse(
      200,
      feedback,
      "Feedback status updated successfully"
    );
  } catch (error) {
    console.error(
      "PATCH CUSTOMER FEEDBACK ERROR:",
      error
    );

    return ApiResponse(
      500,
      null,
      error?.message ||
        "Failed to update feedback status"
    );
  }
}

// ======================================================
// DELETE FEEDBACK
// ======================================================

export async function DELETE(req) {
  try {
    await connect();

    const { searchParams } =
      new URL(req.url);

    const id =
      searchParams.get("id");

    if (!id) {
      return ApiResponse(
        400,
        null,
        "Feedback ID is required"
      );
    }

    const feedback =
      await CustomerFeedback.findByIdAndDelete(
        id
      );

    if (!feedback) {
      return ApiResponse(
        404,
        null,
        "Customer feedback not found"
      );
    }

    return ApiResponse(
      200,
      feedback,
      "Customer feedback deleted successfully"
    );
  } catch (error) {
    console.error(
      "DELETE CUSTOMER FEEDBACK ERROR:",
      error
    );

    return ApiResponse(
      500,
      null,
      error?.message ||
        "Failed to delete customer feedback"
    );
  }
}