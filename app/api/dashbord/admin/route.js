import connect from "@/app/lib/db/connect";
import roleVerify from "@/app/lib/middlewares/roleVerify";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import Distributor from "@/app/lib/models/distributor";
import Order from "@/app/lib/models/order";
import Product from "@/app/lib/models/product";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") || "yearly"; // yearly, monthly, currentMonth

  const user = await verifyJWT();
  if (!user) {
    return ApiResponse(401, false, "Unauthorized");
  }
  if (!roleVerify(["admin"], user)) {
    return ApiResponse(403, false, "Forbidden");
  }

  try {
    await connect();

    // ── Admin dashboard card data ───────────────────────────────────────────
    const dashboardCard = {
      totalOrders: 0,
      totalPendingOrders: 0,
      totalProducts: 0,
      totalDistributors: 0,
      totalUnverifyDistributors: 0,
    };

    dashboardCard.totalOrders = await Order.countDocuments();
    dashboardCard.totalProducts = await Product.countDocuments();
    dashboardCard.totalDistributors = await Distributor.countDocuments();
    dashboardCard.totalUnverifyDistributors = await Distributor.countDocuments({
      "verification.isVerified": false,
    });
    dashboardCard.totalPendingOrders = await Order.countDocuments({
      status: "PENDING",
    });

    // ── Order overview graph (Distribution) ──────────────────────────────────
    let matchStage = {};
    let groupStage = {
      _id: {
        month: { $month: "$createdAt" },
        year: { $year: "$createdAt" },
      },
      count: { $sum: 1 },
    };
    let sortStage = {
      "_id.year": 1,
      "_id.month": 1,
    };

    const now = new Date();
    if (range === "yearly") {
      // Current year distribution grouped by month
      matchStage = {
        createdAt: {
          $gte: new Date(now.getFullYear(), 0, 1),
          $lte: new Date(now.getFullYear(), 11, 31, 23, 59, 59),
        },
      };
    } else if (range === "monthly") {
      // Last 30 days distribution grouped by day
      matchStage = {
        createdAt: {
          $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        },
      };
      groupStage = {
        _id: {
          day: { $dayOfMonth: "$createdAt" },
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        count: { $sum: 1 },
      };
      sortStage = {
        "_id.year": 1,
        "_id.month": 1,
        "_id.day": 1,
      };
    } else if (range === "currentMonth") {
      // Current month distribution grouped by day
      matchStage = {
        createdAt: {
          $gte: new Date(now.getFullYear(), now.getMonth(), 1),
        },
      };
      groupStage = {
        _id: {
          day: { $dayOfMonth: "$createdAt" },
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        count: { $sum: 1 },
      };
      sortStage = {
        "_id.year": 1,
        "_id.month": 1,
        "_id.day": 1,
      };
    }

    const OrderOverViewGraph = await Order.aggregate([
      { $match: matchStage },
      { $group: groupStage },
      { $sort: sortStage },
    ]);

    // ── Order by status graph ────────────────────────────────────────────────
    const OrderByStatusGraph = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const recentNewDirtubutors = await Distributor.find({
      "verification.isVerified": false,
    })
      .sort({ createdAt: -1 })
      .limit(7)
      .select("companyName contactPersonName createdAt");

    // ── Recent orders ────────────────────────────────────────────────────────
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(7)
      .populate("orderBy", "companyName")
      .select("-po -invoice -updatedAt -__v");

    return ApiResponse(
      200,
      {
        dashboardCard,
        OrderOverViewGraph,
        OrderByStatusGraph,
        recentOrders,
        recentNewDirtubutors,
      },
      "Dashboard data",
    );
  } catch (error) {
    console.error("Dashboard error:", error);
    return ApiResponse(500, error, "Internal server error");
  }
}
