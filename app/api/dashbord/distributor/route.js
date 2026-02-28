import connect from "@/app/lib/db/connect";
import roleVerify from "@/app/lib/middlewares/roleVerify";
import { verifyDistributorJWT } from "@/app/lib/middlewares/verifyDistibutorJwt";
import Distributor from "@/app/lib/models/distributor";
import Order from "@/app/lib/models/order";
import Product from "@/app/lib/models/product";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import mongoose from "mongoose";

export async function GET() {
  const user = await verifyDistributorJWT();
  if (!user) {
    return ApiResponse(401, false, "Unauthorized");
  }
  if (!roleVerify(["distributor"], user)) {
    return ApiResponse(403, false, "Forbidden");
  }
  try {
    await connect();

    // Convert string id from JWT payload → ObjectId so MongoDB $match works correctly
    const distributorId = new mongoose.Types.ObjectId(user.id);

    // ── Distributor dashboard card data ───────────────────────────────────────
    const dashboardCard = {
      totalOrders: 0,
      totalPendingOrders: 0,
      totalDeliveredOrders: 0,
      totalRejectedOrders: 0,
      totalShippedOrders: 0,
    };
    dashboardCard.totalOrders = await Order.countDocuments({
      orderBy: distributorId,
    });
    dashboardCard.totalPendingOrders = await Order.countDocuments({
      orderBy: distributorId,
      status: "PENDING",
    });
    dashboardCard.totalDeliveredOrders = await Order.countDocuments({
      orderBy: distributorId,
      status: "DELIVERED",
    });
    dashboardCard.totalRejectedOrders = await Order.countDocuments({
      orderBy: distributorId,
      status: "CANCELLED",
    });
    dashboardCard.totalShippedOrders = await Order.countDocuments({
      orderBy: distributorId,
      status: "SHIPPEMENT",
    });

    // ── Order overview graph (orders per day, current distributor) ────────────
    const OrderOverViewGraph = await Order.aggregate([
      {
        $match: {
          orderBy: distributorId,
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$createdAt" },
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
        },
      },
    ]);

    // ── Order by status graph (current distributor) ───────────────────────────
    const OrderByStatusGraph = await Order.aggregate([
      {
        $match: {
          orderBy: distributorId,
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // ── Popular products (top 5 by viewCount) ─────────────────────────────────
    const popularProducts = await Product.find({ visibility: true })
      .sort({ viewCount: -1 })
      .select("-__v -updatedAt -createdAt")
      .limit(5);

    // ── Recent orders (this distributor, newest first) ───────────────────────
    const recentOrders = await Order.find({ orderBy: distributorId })
      .sort({ createdAt: -1 })
      .limit(7)
      .populate("orderBy", "companyName")
      .populate("orderItems.product", "code")
      .select("-po -invoice -updatedAt -__v");

    // Distributor profile information ———————————————————————————————————//
    const distributor = await Distributor.findById(distributorId).select(
      "companyName companyEmail companyNumber",
    );

    return ApiResponse(
      200,
      {
        dashboardCard,
        OrderOverViewGraph,
        OrderByStatusGraph,
        recentOrders,
        popularProducts,
        lastOrder: recentOrders[0],
        distributor,
      },
      "Dashboard data",
    );
  } catch (error) {
    return ApiResponse(500, error, "Internal server error");
  }
}
