import { NextResponse } from "next/server";

import connectDB from "@/app/lib/db/connect";
import DistributorInformation from "@/app/lib/models/distributors-information";

// ======================================================
// GET ALL DISTRIBUTORS
// ======================================================

export async function GET() {
  try {
    await connectDB();

    const distributors = await DistributorInformation.find({})
      .sort({
        sortOrder: 1,
        createdAt: -1,
      })
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: distributors,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET /api/distributors error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch distributors",
      },
      {
        status: 500,
      },
    );
  }
}

// ======================================================
// CREATE DISTRIBUTOR
// ======================================================

export async function POST(request) {
  try {
    await connectDB();

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

    // --------------------------------------------------
    // REQUIRED VALIDATION
    // --------------------------------------------------

    if (!companyName || !companyName.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Company name is required",
        },
        {
          status: 400,
        },
      );
    }

    if (!country || !country.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Country is required",
        },
        {
          status: 400,
        },
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
        },
      );
    }

    // --------------------------------------------------
    // EMAIL CLEANUP
    // --------------------------------------------------

    const cleanedEmails = Array.isArray(emails)
      ? emails
          .map((email) => String(email).trim().toLowerCase())
          .filter(Boolean)
      : [];

    // --------------------------------------------------
    // CREATE
    // --------------------------------------------------

    const distributor = await DistributorInformation.create({
      companyName: companyName.trim(),

      country: country.trim(),

      region,

      city: city?.trim() || "",

      state: state?.trim() || "",

      postalCode: postalCode?.trim() || "",

      location: location?.trim() || "",

      emails: cleanedEmails,

      phone: phone?.trim() || "",

      website: website?.trim() || "",

      flag: flag?.trim() || "🌍",

      status: status === "Inactive" ? "Inactive" : "Active",

      sortOrder: Number.isFinite(Number(sortOrder)) ? Number(sortOrder) : 0,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Distributor created successfully",
        data: distributor,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("POST /api/distributors error:", error);

    if (error?.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          message: Object.values(error.errors)
            .map((item) => item.message)
            .join(", "),
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create distributor",
      },
      {
        status: 500,
      },
    );
  }
}
