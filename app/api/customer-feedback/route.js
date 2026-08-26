// import connect from "@/app/lib/db/connect";
// import { CustomerFeedback } from "@/app/lib/models/customerFeedback";
// import { ApiResponse } from "@/app/lib/utils/apiResponse";

// // ======================================================
// // GET ALL CUSTOMER FEEDBACK
// // ======================================================

// export async function GET(req) {
//   try {
//     await connect();

//     const { searchParams } = new URL(req.url);

//     const page = Math.max(
//       Number(searchParams.get("page")) || 1,
//       1
//     );

//     const limit = Math.min(
//       Math.max(
//         Number(searchParams.get("limit")) || 10,
//         1
//       ),
//       100
//     );

//     const search =
//       searchParams.get("search")?.trim() || "";

//     const status =
//       searchParams.get("status")?.trim() || "";

//     const skip = (page - 1) * limit;

//     // ==================================================
//     // FILTER
//     // ==================================================

//     const filter = {};

//     if (search) {
//       filter.$or = [
//         {
//           name: {
//             $regex: search,
//             $options: "i",
//           },
//         },
//         {
//           email: {
//             $regex: search,
//             $options: "i",
//           },
//         },
//         {
//           companyOrganisation: {
//             $regex: search,
//             $options: "i",
//           },
//         },
//       ];
//     }

//     if (
//       status &&
//       ["New", "Read", "Responded"].includes(status)
//     ) {
//       filter.status = status;
//     }

//     // ==================================================
//     // FETCH DATA
//     // ==================================================

//     const [feedback, total] =
//       await Promise.all([
//         CustomerFeedback.find(filter)
//           .sort({
//             createdAt: -1,
//           })
//           .skip(skip)
//           .limit(limit)
//           .lean(),

//         CustomerFeedback.countDocuments(
//           filter
//         ),
//       ]);

//     const totalPages =
//       Math.ceil(total / limit) || 1;

//     return ApiResponse(
//       200,
//       {
//         feedback,
//         pagination: {
//           page,
//           limit,
//           total,
//           totalPages,
//         },
//       },
//       "Customer feedback fetched successfully"
//     );
//   } catch (error) {
//     console.error(
//       "GET CUSTOMER FEEDBACK ERROR:",
//       error
//     );

//     return ApiResponse(
//       500,
//       null,
//       error?.message ||
//         "Failed to fetch customer feedback"
//     );
//   }
// }

// // ======================================================
// // CREATE CUSTOMER FEEDBACK
// // ======================================================
// export async function POST(req) {
//   try {
//     console.log("=================================");
//     console.log("CUSTOMER FEEDBACK POST START");
//     console.log("=================================");

//     // -----------------------------------------------
//     // DATABASE CONNECTION
//     // -----------------------------------------------

//     await connect();

//     console.log("MongoDB connected");

//     // -----------------------------------------------
//     // REQUEST BODY
//     // -----------------------------------------------

//     const body = await req.json();

//     console.log("Request body:");
//     console.log(body);

//     // -----------------------------------------------
//     // REQUIRED FIELDS
//     // -----------------------------------------------

//     const requiredFields = [
//       "email",
//       "salesProcessClarity",
//       "installationSafetyCompliance",
//       "productsMeetNeeds",
//       "productRangeQuality",
//       "responsiveness",
//       "trainingSatisfaction",
//       "overallSatisfaction",
//       "repurchaseLikelihood",
//       "recommendToColleague",
//       "name",
//       "titleRole",
//       "companyOrganisation",
//     ];

//     for (const field of requiredFields) {
//       if (
//         body[field] === undefined ||
//         body[field] === null ||
//         body[field] === ""
//       ) {
//         return ApiResponse(
//           400,
//           null,
//           `${field} is required`
//         );
//       }
//     }

//     // -----------------------------------------------
//     // EMAIL
//     // -----------------------------------------------

//     const email = String(body.email)
//       .trim()
//       .toLowerCase();

//     const emailRegex =
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       return ApiResponse(
//         400,
//         null,
//         "Please enter a valid email address"
//       );
//     }

//     // -----------------------------------------------
//     // RATINGS
//     // -----------------------------------------------

//     const ratingFields = [
//       "salesProcessClarity",
//       "productsMeetNeeds",
//       "productRangeQuality",
//       "responsiveness",
//       "trainingSatisfaction",
//       "overallSatisfaction",
//       "repurchaseLikelihood",
//     ];

//     const ratings = {};

//     for (const field of ratingFields) {
//       const value = Number(body[field]);

//       if (
//         !Number.isInteger(value) ||
//         value < 0 ||
//         value > 10
//       ) {
//         return ApiResponse(
//           400,
//           null,
//           `${field} must be a number between 0 and 10`
//         );
//       }

//       ratings[field] = value;
//     }

//     // -----------------------------------------------
//     // YES / NO
//     // -----------------------------------------------

//     if (
//       !["Yes", "No"].includes(
//         body.installationSafetyCompliance
//       )
//     ) {
//       return ApiResponse(
//         400,
//         null,
//         "Installation safety response must be Yes or No"
//       );
//     }

//     if (
//       !["Yes", "No"].includes(
//         body.recommendToColleague
//       )
//     ) {
//       return ApiResponse(
//         400,
//         null,
//         "Recommendation response must be Yes or No"
//       );
//     }

//     // -----------------------------------------------
//     // TEXT
//     // -----------------------------------------------

//     const name = String(body.name).trim();

//     const titleRole =
//       String(body.titleRole).trim();

//     const companyOrganisation =
//       String(
//         body.companyOrganisation
//       ).trim();

//     const comments =
//       String(body.comments || "").trim();

//     if (
//       name.length < 2 ||
//       name.length > 100
//     ) {
//       return ApiResponse(
//         400,
//         null,
//         "Name must be between 2 and 100 characters"
//       );
//     }

//     if (titleRole.length > 100) {
//       return ApiResponse(
//         400,
//         null,
//         "Title / Role cannot exceed 100 characters"
//       );
//     }

//     if (
//       companyOrganisation.length > 150
//     ) {
//       return ApiResponse(
//         400,
//         null,
//         "Company / Organisation cannot exceed 150 characters"
//       );
//     }

//     if (comments.length > 1000) {
//       return ApiResponse(
//         400,
//         null,
//         "Comments cannot exceed 1,000 characters"
//       );
//     }

//     // -----------------------------------------------
//     // CREATE OBJECT
//     // -----------------------------------------------

//     const feedbackData = {
//       email,

//       ...ratings,

//       installationSafetyCompliance:
//         body.installationSafetyCompliance,

//       recommendToColleague:
//         body.recommendToColleague,

//       comments,

//       name,

//       titleRole,

//       companyOrganisation,

//       status: "New",

//       emailSent: false,
//     };

//     console.log(
//       "Data going to MongoDB:"
//     );

//     console.log(feedbackData);

//     // -----------------------------------------------
//     // SAVE
//     // -----------------------------------------------

//     const feedback =
//       await CustomerFeedback.create(
//         feedbackData
//       );

//     console.log(
//       "Feedback saved successfully:",
//       feedback._id
//     );

//     // -----------------------------------------------
//     // RESPONSE
//     // -----------------------------------------------

//     return ApiResponse(
//       201,
//       feedback,
//       "Customer feedback submitted successfully"
//     );
//   } catch (error) {
//     console.error(
//       "================================="
//     );

//     console.error(
//       "CUSTOMER FEEDBACK ERROR"
//     );

//     console.error(
//       "Error name:",
//       error?.name
//     );

//     console.error(
//       "Error message:",
//       error?.message
//     );

//     console.error(
//       "Error code:",
//       error?.code
//     );

//     console.error(
//       "Error stack:",
//       error?.stack
//     );

//     console.error(
//       "================================="
//     );

//     // -----------------------------------------------
//     // MONGOOSE VALIDATION ERROR
//     // -----------------------------------------------

//     if (
//       error?.name ===
//       "ValidationError"
//     ) {
//       const messages =
//         Object.values(
//           error.errors || {}
//         ).map(
//           (item) =>
//             item.message
//         );

//       return ApiResponse(
//         400,
//         null,
//         messages.join(", ") ||
//           "Validation failed"
//       );
//     }

//     // -----------------------------------------------
//     // DUPLICATE KEY
//     // -----------------------------------------------

//     if (error?.code === 11000) {
//       return ApiResponse(
//         409,
//         null,
//         "Duplicate data found"
//       );
//     }

//     // -----------------------------------------------
//     // GENERAL ERROR
//     // -----------------------------------------------

//     return ApiResponse(
//       500,
//       null,
//       error?.message ||
//         "Failed to submit customer feedback"
//     );
//   }
// }

// // ======================================================
// // UPDATE FEEDBACK STATUS
// // ======================================================

// export async function PATCH(req) {
//   try {
//     await connect();

//     const body = await req.json();

//     const {
//       id,
//       status,
//     } = body;

//     if (!id) {
//       return ApiResponse(
//         400,
//         null,
//         "Feedback ID is required"
//       );
//     }

//     if (
//       ![
//         "New",
//         "Read",
//         "Responded",
//       ].includes(status)
//     ) {
//       return ApiResponse(
//         400,
//         null,
//         "Invalid feedback status"
//       );
//     }

//     const feedback =
//       await CustomerFeedback.findByIdAndUpdate(
//         id,
//         {
//           status,
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       );

//     if (!feedback) {
//       return ApiResponse(
//         404,
//         null,
//         "Customer feedback not found"
//       );
//     }

//     return ApiResponse(
//       200,
//       feedback,
//       "Feedback status updated successfully"
//     );
//   } catch (error) {
//     console.error(
//       "PATCH CUSTOMER FEEDBACK ERROR:",
//       error
//     );

//     return ApiResponse(
//       500,
//       null,
//       error?.message ||
//         "Failed to update feedback status"
//     );
//   }
// }

// // ======================================================
// // DELETE FEEDBACK
// // ======================================================

// export async function DELETE(req) {
//   try {
//     await connect();

//     const { searchParams } =
//       new URL(req.url);

//     const id =
//       searchParams.get("id");

//     if (!id) {
//       return ApiResponse(
//         400,
//         null,
//         "Feedback ID is required"
//       );
//     }

//     const feedback =
//       await CustomerFeedback.findByIdAndDelete(
//         id
//       );

//     if (!feedback) {
//       return ApiResponse(
//         404,
//         null,
//         "Customer feedback not found"
//       );
//     }

//     return ApiResponse(
//       200,
//       feedback,
//       "Customer feedback deleted successfully"
//     );
//   } catch (error) {
//     console.error(
//       "DELETE CUSTOMER FEEDBACK ERROR:",
//       error
//     );

//     return ApiResponse(
//       500,
//       null,
//       error?.message ||
//         "Failed to delete customer feedback"
//     );
//   }
// }
import connect from "@/app/lib/db/connect";
import { CustomerFeedback } from "@/app/lib/models/customerFeedback";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { Resend } from "resend";

// ======================================================
// RESEND
// ======================================================

const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not configured"
    );
  }

  return new Resend(apiKey);
};

// ======================================================
// HTML ESCAPE
// ======================================================

const escapeHtml = (value) => {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// ======================================================
// GET ALL CUSTOMER FEEDBACK
// ======================================================

export async function GET(req) {
  try {
    await connect();

    const { searchParams } =
      new URL(req.url);

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

    const skip =
      (page - 1) * limit;

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
      ["New", "Read", "Responded"].includes(
        status
      )
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
};

// ======================================================
// CREATE CUSTOMER FEEDBACK
// ======================================================

export async function POST(req) {
  try {
    console.log(
      "================================="
    );

    console.log(
      "CUSTOMER FEEDBACK POST START"
    );

    console.log(
      "================================="
    );

    // ==================================================
    // DATABASE CONNECTION
    // ==================================================

    await connect();

    console.log(
      "MongoDB connected"
    );

    // ==================================================
    // REQUEST BODY
    // ==================================================

    const body =
      await req.json();

    console.log(
      "Request body received"
    );

    // ==================================================
    // REQUIRED FIELDS
    // ==================================================

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

    for (
      const field of requiredFields
    ) {
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

    // ==================================================
    // EMAIL
    // ==================================================

    const email =
      String(body.email)
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

    // ==================================================
    // RATINGS
    // ==================================================

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

    for (
      const field of ratingFields
    ) {
      const value =
        Number(body[field]);

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

    // ==================================================
    // YES / NO
    // ==================================================

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

    // ==================================================
    // TEXT
    // ==================================================

    const name =
      String(body.name).trim();

    const titleRole =
      String(body.titleRole).trim();

    const companyOrganisation =
      String(
        body.companyOrganisation
      ).trim();

    const comments =
      String(
        body.comments || ""
      ).trim();

    // ==================================================
    // NAME VALIDATION
    // ==================================================

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

    // ==================================================
    // TITLE / ROLE VALIDATION
    // ==================================================

    if (
      titleRole.length > 100
    ) {
      return ApiResponse(
        400,
        null,
        "Title / Role cannot exceed 100 characters"
      );
    }

    // ==================================================
    // COMPANY VALIDATION
    // ==================================================

    if (
      companyOrganisation.length >
      150
    ) {
      return ApiResponse(
        400,
        null,
        "Company / Organisation cannot exceed 150 characters"
      );
    }

    // ==================================================
    // COMMENTS VALIDATION
    // ==================================================

    if (
      comments.length > 1000
    ) {
      return ApiResponse(
        400,
        null,
        "Comments cannot exceed 1,000 characters"
      );
    }

    // ==================================================
    // CREATE OBJECT
    // ==================================================

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
      "Saving customer feedback..."
    );

    // ==================================================
    // SAVE TO DATABASE
    // ==================================================

    const feedback =
      await CustomerFeedback.create(
        feedbackData
      );

    console.log(
      "Feedback saved successfully:",
      feedback._id
    );

    // ==================================================
    // EMAIL VARIABLES
    // ==================================================

    let adminEmailSent = false;
    let customerEmailSent = false;

    // ==================================================
    // SEND EMAILS
    // ==================================================

    try {
      // ------------------------------------------------
      // ENVIRONMENT VARIABLES
      // ------------------------------------------------

      const receiverEmail =
        process.env
          .FEEDBACK_RECEIVER_EMAIL ||
        process.env.FEEDBACK_EMAIL;

      const fromEmail =
        process.env.RESEND_FROM_EMAIL;

      if (!receiverEmail) {
        throw new Error(
          "FEEDBACK_RECEIVER_EMAIL is not configured"
        );
      }

      if (!fromEmail) {
        throw new Error(
          "RESEND_FROM_EMAIL is not configured"
        );
      }

      // ------------------------------------------------
      // RESEND CLIENT
      // ------------------------------------------------

      const resend =
        getResendClient();

      // ==================================================
      // ADMIN EMAIL HTML
      // ==================================================

      const adminEmailHtml = `
<!DOCTYPE html>

<html>

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>
    New Customer Feedback
  </title>

</head>

<body
  style="
    margin:0;
    padding:0;
    background:#F1F4FC;
    font-family:Arial,Helvetica,sans-serif;
    color:#151515;
  "
>

  <div
    style="
      max-width:700px;
      margin:0 auto;
      padding:30px 15px;
    "
  >

    <!-- =========================================
         HEADER
    ========================================== -->

    <div
      style="
        background:#173DB8;
        color:#ffffff;
        padding:30px;
        border-radius:16px 16px 0 0;
      "
    >

      <h1
        style="
          margin:0;
          font-size:28px;
        "
      >
        New Customer Feedback
      </h1>

      <p
        style="
          margin:8px 0 0;
          color:#DDE6FF;
          font-size:14px;
        "
      >
        CC Matting Customer Experience
      </p>

    </div>

    <!-- =========================================
         CUSTOMER DETAILS
    ========================================== -->

    <div
      style="
        background:#ffffff;
        padding:25px;
        border:1px solid #DDE3F2;
      "
    >

      <h2
        style="
          margin:0 0 20px;
          color:#173DB8;
          font-size:20px;
        "
      >
        Customer Details
      </h2>

      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="
          border-collapse:collapse;
          font-size:14px;
        "
      >

        <tr>

          <td
            style="
              padding:9px 0;
              font-weight:bold;
              width:40%;
            "
          >
            Name
          </td>

          <td
            style="
              padding:9px 0;
            "
          >
            ${escapeHtml(name)}
          </td>

        </tr>

        <tr>

          <td
            style="
              padding:9px 0;
              font-weight:bold;
            "
          >
            Email
          </td>

          <td
            style="
              padding:9px 0;
            "
          >
            ${escapeHtml(email)}
          </td>

        </tr>

        <tr>

          <td
            style="
              padding:9px 0;
              font-weight:bold;
            "
          >
            Title / Role
          </td>

          <td
            style="
              padding:9px 0;
            "
          >
            ${escapeHtml(titleRole)}
          </td>

        </tr>

        <tr>

          <td
            style="
              padding:9px 0;
              font-weight:bold;
            "
          >
            Company / Organisation
          </td>

          <td
            style="
              padding:9px 0;
            "
          >
            ${escapeHtml(
              companyOrganisation
            )}
          </td>

        </tr>

      </table>

    </div>

    <!-- =========================================
         FEEDBACK RESPONSES
    ========================================== -->

    <div
      style="
        background:#ffffff;
        padding:25px;
        margin-top:15px;
        border:1px solid #DDE3F2;
      "
    >

      <h2
        style="
          margin:0 0 20px;
          color:#173DB8;
          font-size:20px;
        "
      >
        Feedback Responses
      </h2>

      <!-- QUESTION 1 -->

      <div
        style="
          padding:14px;
          margin-bottom:10px;
          background:#F7F9FE;
          border-radius:10px;
        "
      >

        <strong>
          1. Sales Process Clarity
        </strong>

        <div
          style="
            margin-top:6px;
            font-size:20px;
            font-weight:bold;
            color:#173DB8;
          "
        >
          ${escapeHtml(
            ratings.salesProcessClarity
          )} / 10
        </div>

      </div>

      <!-- QUESTION 2 -->

      <div
        style="
          padding:14px;
          margin-bottom:10px;
          background:#F7F9FE;
          border-radius:10px;
        "
      >

        <strong>
          2. Installation Safety Compliance
        </strong>

        <div
          style="
            margin-top:6px;
            font-size:16px;
            font-weight:bold;
            color:#173DB8;
          "
        >
          ${escapeHtml(
            body.installationSafetyCompliance
          )}
        </div>

      </div>

      <!-- QUESTION 3 -->

      <div
        style="
          padding:14px;
          margin-bottom:10px;
          background:#F7F9FE;
          border-radius:10px;
        "
      >

        <strong>
          3. Products Meet Needs
        </strong>

        <div
          style="
            margin-top:6px;
            font-size:20px;
            font-weight:bold;
            color:#173DB8;
          "
        >
          ${escapeHtml(
            ratings.productsMeetNeeds
          )} / 10
        </div>

      </div>

      <!-- QUESTION 4 -->

      <div
        style="
          padding:14px;
          margin-bottom:10px;
          background:#F7F9FE;
          border-radius:10px;
        "
      >

        <strong>
          4. Product Range Quality
        </strong>

        <div
          style="
            margin-top:6px;
            font-size:20px;
            font-weight:bold;
            color:#173DB8;
          "
        >
          ${escapeHtml(
            ratings.productRangeQuality
          )} / 10
        </div>

      </div>

      <!-- QUESTION 5 -->

      <div
        style="
          padding:14px;
          margin-bottom:10px;
          background:#F7F9FE;
          border-radius:10px;
        "
      >

        <strong>
          5. Responsiveness
        </strong>

        <div
          style="
            margin-top:6px;
            font-size:20px;
            font-weight:bold;
            color:#173DB8;
          "
        >
          ${escapeHtml(
            ratings.responsiveness
          )} / 10
        </div>

      </div>

      <!-- QUESTION 6 -->

      <div
        style="
          padding:14px;
          margin-bottom:10px;
          background:#F7F9FE;
          border-radius:10px;
        "
      >

        <strong>
          6. Training Satisfaction
        </strong>

        <div
          style="
            margin-top:6px;
            font-size:20px;
            font-weight:bold;
            color:#173DB8;
          "
        >
          ${escapeHtml(
            ratings.trainingSatisfaction
          )} / 10
        </div>

      </div>

      <!-- QUESTION 7 -->

      <div
        style="
          padding:14px;
          margin-bottom:10px;
          background:#F7F9FE;
          border-radius:10px;
        "
      >

        <strong>
          7. Overall Satisfaction
        </strong>

        <div
          style="
            margin-top:6px;
            font-size:20px;
            font-weight:bold;
            color:#173DB8;
          "
        >
          ${escapeHtml(
            ratings.overallSatisfaction
          )} / 10
        </div>

      </div>

      <!-- QUESTION 8 -->

      <div
        style="
          padding:14px;
          margin-bottom:10px;
          background:#F7F9FE;
          border-radius:10px;
        "
      >

        <strong>
          8. Repurchase Likelihood
        </strong>

        <div
          style="
            margin-top:6px;
            font-size:20px;
            font-weight:bold;
            color:#173DB8;
          "
        >
          ${escapeHtml(
            ratings.repurchaseLikelihood
          )} / 10
        </div>

      </div>

      <!-- QUESTION 9 -->

      <div
        style="
          padding:14px;
          margin-bottom:10px;
          background:#F7F9FE;
          border-radius:10px;
        "
      >

        <strong>
          9. Recommend to Colleague
        </strong>

        <div
          style="
            margin-top:6px;
            font-size:16px;
            font-weight:bold;
            color:#173DB8;
          "
        >
          ${escapeHtml(
            body.recommendToColleague
          )}
        </div>

      </div>

    </div>

    <!-- =========================================
         COMMENTS
    ========================================== -->

    <div
      style="
        background:#ffffff;
        padding:25px;
        margin-top:15px;
        border:1px solid #DDE3F2;
      "
    >

      <h2
        style="
          margin:0 0 12px;
          color:#173DB8;
          font-size:20px;
        "
      >
        Additional Comments
      </h2>

      <p
        style="
          margin:0;
          color:#505866;
          line-height:1.7;
          white-space:pre-wrap;
        "
      >
        ${
          comments
            ? escapeHtml(comments)
            : "No additional comments provided."
        }
      </p>

    </div>

    <!-- =========================================
         FOOTER
    ========================================== -->

    <div
      style="
        text-align:center;
        padding:20px;
        color:#737987;
        font-size:12px;
      "
    >
      Customer feedback submitted through
      CC Matting website.
    </div>

  </div>

</body>

</html>
`;

      // ==================================================
      // CUSTOMER CONFIRMATION EMAIL HTML
      // ==================================================

      const customerEmailHtml = `
<!DOCTYPE html>

<html>

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>
    Thank You for Your Feedback
  </title>

</head>

<body
  style="
    margin:0;
    padding:0;
    background:#F1F4FC;
    font-family:Arial,Helvetica,sans-serif;
    color:#151515;
  "
>

  <div
    style="
      max-width:650px;
      margin:0 auto;
      padding:30px 15px;
    "
  >

    <!-- =========================================
         HEADER
    ========================================== -->

    <div
      style="
        background:#173DB8;
        color:#ffffff;
        padding:35px 30px;
        text-align:center;
        border-radius:16px 16px 0 0;
      "
    >

      <div
        style="
          width:64px;
          height:64px;
          margin:0 auto 18px;
          border-radius:50%;
          background:rgba(255,255,255,0.15);
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:30px;
        "
      >
        ✓
      </div>

      <h1
        style="
          margin:0;
          font-size:28px;
        "
      >
        Thank You!
      </h1>

      <p
        style="
          margin:10px 0 0;
          color:#DDE6FF;
          font-size:15px;
        "
      >
        We appreciate your valuable feedback.
      </p>

    </div>

    <!-- =========================================
         CONTENT
    ========================================== -->

    <div
      style="
        background:#ffffff;
        padding:30px;
        border:1px solid #DDE3F2;
      "
    >

      <p
        style="
          margin:0;
          font-size:16px;
          line-height:1.7;
          color:#30343B;
        "
      >
        Dear
        <strong>
          ${escapeHtml(name)}
        </strong>,
      </p>

      <p
        style="
          margin:18px 0 0;
          font-size:15px;
          line-height:1.8;
          color:#505866;
        "
      >
        Thank you for taking the time to
        share your experience with
        <strong>CC Matting</strong>.
        Your feedback is important to us
        and helps us continue improving
        our products, installation services
        and customer experience.
      </p>

      <!-- SUMMARY -->

      <div
        style="
          margin-top:25px;
          padding:20px;
          background:#F1F4FC;
          border:1px solid #DDE3F2;
          border-radius:12px;
        "
      >

        <h2
          style="
            margin:0 0 15px;
            color:#173DB8;
            font-size:18px;
          "
        >
          Your Feedback Summary
        </h2>

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="
            border-collapse:collapse;
            font-size:14px;
          "
        >

          <tr>

            <td
              style="
                padding:8px 0;
                color:#737987;
              "
            >
              Overall Satisfaction
            </td>

            <td
              style="
                padding:8px 0;
                font-weight:bold;
                text-align:right;
                color:#173DB8;
              "
            >
              ${escapeHtml(
                ratings.overallSatisfaction
              )} / 10
            </td>

          </tr>

          <tr>

            <td
              style="
                padding:8px 0;
                color:#737987;
              "
            >
              Products Meet Needs
            </td>

            <td
              style="
                padding:8px 0;
                font-weight:bold;
                text-align:right;
                color:#173DB8;
              "
            >
              ${escapeHtml(
                ratings.productsMeetNeeds
              )} / 10
            </td>

          </tr>

          <tr>

            <td
              style="
                padding:8px 0;
                color:#737987;
              "
            >
              Product Range Quality
            </td>

            <td
              style="
                padding:8px 0;
                font-weight:bold;
                text-align:right;
                color:#173DB8;
              "
            >
              ${escapeHtml(
                ratings.productRangeQuality
              )} / 10
            </td>

          </tr>

          <tr>

            <td
              style="
                padding:8px 0;
                color:#737987;
              "
            >
              Recommend to Colleague
            </td>

            <td
              style="
                padding:8px 0;
                font-weight:bold;
                text-align:right;
                color:#173DB8;
              "
            >
              ${escapeHtml(
                body.recommendToColleague
              )}
            </td>

          </tr>

        </table>

      </div>

      <p
        style="
          margin:25px 0 0;
          font-size:15px;
          line-height:1.8;
          color:#505866;
        "
      >
        If you have any additional questions
        or would like to discuss your feedback,
        simply reply to this email and our team
        will be happy to assist you.
      </p>

      <div
        style="
          margin-top:25px;
          padding-top:20px;
          border-top:1px solid #E5E8F0;
        "
      >

        <p
          style="
            margin:0;
            font-size:14px;
            color:#505866;
          "
        >
          Kind regards,
        </p>

        <p
          style="
            margin:5px 0 0;
            font-size:15px;
            font-weight:bold;
            color:#173DB8;
          "
        >
          CC Matting Team
        </p>

      </div>

    </div>

    <!-- =========================================
         FOOTER
    ========================================== -->

    <div
      style="
        text-align:center;
        padding:20px;
        color:#737987;
        font-size:12px;
      "
    >

      <p
        style="
          margin:0;
        "
      >
        Thank you for helping us improve.
      </p>

      <p
        style="
          margin:7px 0 0;
        "
      >
        CC Matting Customer Experience
      </p>

    </div>

  </div>

</body>

</html>
`;

      // ==================================================
      // SEND ADMIN EMAIL
      // ==================================================

      console.log(
        "Sending feedback notification to admin..."
      );

      const {
        data: adminEmailData,
        error: adminEmailError,
      } =
        await resend.emails.send({
          from: fromEmail,

          to: [
            receiverEmail,
          ],

          replyTo: email,

          subject:
            `New Customer Feedback - ${name}`,

          html: adminEmailHtml,
        });

      if (adminEmailError) {
        console.error(
          "ADMIN EMAIL ERROR:",
          adminEmailError
        );
      } else {
        adminEmailSent = true;

        console.log(
          "Admin feedback email sent successfully:",
          adminEmailData?.id
        );
      }

      // ==================================================
      // SEND CUSTOMER CONFIRMATION EMAIL
      // ==================================================

      console.log(
        "Sending confirmation email to customer..."
      );

      const {
        data: customerEmailData,
        error: customerEmailError,
      } =
        await resend.emails.send({
          from: fromEmail,

          to: [
            email,
          ],

          replyTo: receiverEmail,

          subject:
            "Thank You for Your Feedback - CC Matting",

          html: customerEmailHtml,
        });

      if (customerEmailError) {
        console.error(
          "CUSTOMER EMAIL ERROR:",
          customerEmailError
        );
      } else {
        customerEmailSent = true;

        console.log(
          "Customer confirmation email sent successfully:",
          customerEmailData?.id
        );
      }

      // ==================================================
      // UPDATE EMAIL SENT STATUS
      // ==================================================
      //
      // Existing emailSent field represents the admin
      // notification email.
      //
      // We keep this behavior unchanged.
      //
      // ==================================================

      if (adminEmailSent) {
        await CustomerFeedback.findByIdAndUpdate(
          feedback._id,
          {
            emailSent: true,
          }
        );

        console.log(
          "emailSent updated to true"
        );
      }

    } catch (emailError) {
      // ==================================================
      // EMAIL SYSTEM ERROR
      // ==================================================

      console.error(
        "================================="
      );

      console.error(
        "CUSTOMER FEEDBACK EMAIL ERROR"
      );

      console.error(
        emailError
      );

      console.error(
        "================================="
      );
    }

    // ==================================================
    // FINAL EMAIL STATUS
    // ==================================================

    let responseMessage =
      "Customer feedback submitted successfully.";

    if (
      adminEmailSent &&
      customerEmailSent
    ) {
      responseMessage =
        "Customer feedback submitted successfully. Confirmation emails have been sent.";
    } else if (
      adminEmailSent &&
      !customerEmailSent
    ) {
      responseMessage =
        "Customer feedback submitted successfully. Admin notification was sent, but customer confirmation email could not be sent.";
    } else if (
      !adminEmailSent &&
      customerEmailSent
    ) {
      responseMessage =
        "Customer feedback submitted successfully. Customer confirmation was sent, but admin notification could not be sent.";
    } else {
      responseMessage =
        "Customer feedback submitted successfully. Email notifications could not be sent.";
    }

    // ==================================================
    // GET FINAL FEEDBACK
    // ==================================================

    const finalFeedback =
      await CustomerFeedback.findById(
        feedback._id
      ).lean();

    // ==================================================
    // FINAL RESPONSE
    // ==================================================

    return ApiResponse(
      201,
      finalFeedback,
      responseMessage
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

    // ==================================================
    // MONGOOSE VALIDATION ERROR
    // ==================================================

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

    // ==================================================
    // DUPLICATE KEY
    // ==================================================

    if (
      error?.code === 11000
    ) {
      return ApiResponse(
        409,
        null,
        "Duplicate data found"
      );
    }

    // ==================================================
    // GENERAL ERROR
    // ==================================================

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

    const body =
      await req.json();

    const {
      id,
      status,
    } = body;

    // ==================================================
    // ID
    // ==================================================

    if (!id) {
      return ApiResponse(
        400,
        null,
        "Feedback ID is required"
      );
    }

    // ==================================================
    // STATUS
    // ==================================================

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

    // ==================================================
    // UPDATE
    // ==================================================

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

    // ==================================================
    // NOT FOUND
    // ==================================================

    if (!feedback) {
      return ApiResponse(
        404,
        null,
        "Customer feedback not found"
      );
    }

    // ==================================================
    // RESPONSE
    // ==================================================

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

    // ==================================================
    // ID
    // ==================================================

    if (!id) {
      return ApiResponse(
        400,
        null,
        "Feedback ID is required"
      );
    }

    // ==================================================
    // DELETE
    // ==================================================

    const feedback =
      await CustomerFeedback.findByIdAndDelete(
        id
      );

    // ==================================================
    // NOT FOUND
    // ==================================================

    if (!feedback) {
      return ApiResponse(
        404,
        null,
        "Customer feedback not found"
      );
    }

    // ==================================================
    // RESPONSE
    // ==================================================

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