import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/src/config/db";
import Distributor from "@/app/lib/models/distributor";

// ======================================================
// GET SINGLE DISTRIBUTOR
// ======================================================

export async function GET(
  request,
  { params }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid distributor ID",
        },
        {
          status: 400,
        }
      );
    }

    const distributor =
      await Distributor.findById(id).lean();

    if (!distributor) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Distributor not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: distributor,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET distributor error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch distributor",
      },
      {
        status: 500,
      }
    );
  }
}

// ======================================================
// UPDATE DISTRIBUTOR
// ======================================================

export async function PUT(
  request,
  { params }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid distributor ID",
        },
        {
          status: 400,
        }
      );
    }

    const body = await request.json();

    const {
      companyName,
      country,
      region,
      city,
      state,
      postalCode,
      location,
      emails,
      phone,
      website,
      flag,
      status,
      sortOrder,
    } = body;

    if (
      !companyName ||
      !companyName.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Company name is required",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !country ||
      !country.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Country is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!region) {
      return NextResponse.json(
        {
          success: false,
          message: "Region is required",
        },
        {
          status: 400,
        }
      );
    }

    const cleanedEmails =
      Array.isArray(emails)
        ? emails
            .map((email) =>
              String(email)
                .trim()
                .toLowerCase()
            )
            .filter(Boolean)
        : [];

    const updatedDistributor =
      await Distributor.findByIdAndUpdate(
        id,
        {
          companyName:
            companyName.trim(),

          country:
            country.trim(),

          region,

          city:
            city?.trim() || "",

          state:
            state?.trim() || "",

          postalCode:
            postalCode?.trim() || "",

          location:
            location?.trim() || "",

          emails:
            cleanedEmails,

          phone:
            phone?.trim() || "",

          website:
            website?.trim() || "",

          flag:
            flag?.trim() || "🌍",

          status:
            status === "Inactive"
              ? "Inactive"
              : "Active",

          sortOrder:
            Number.isFinite(
              Number(sortOrder)
            )
              ? Number(sortOrder)
              : 0,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedDistributor) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Distributor not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Distributor updated successfully",
        data: updatedDistributor,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "PUT distributor error:",
      error
    );

    if (
      error?.name ===
      "ValidationError"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            Object.values(
              error.errors
            )
              .map(
                (item) =>
                  item.message
              )
              .join(", "),
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update distributor",
      },
      {
        status: 500,
      }
    );
  }
}

// ======================================================
// DELETE DISTRIBUTOR
// ======================================================

export async function DELETE(
  request,
  { params }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid distributor ID",
        },
        {
          status: 400,
        }
      );
    }

    const deletedDistributor =
      await Distributor.findByIdAndDelete(
        id
      );

    if (!deletedDistributor) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Distributor not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Distributor deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "DELETE distributor error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete distributor",
      },
      {
        status: 500,
      }
    );
  }
}