import connect from "@/app/lib/db/connect";
import roleVerify from "@/app/lib/middlewares/roleVerify";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import Distributor from "@/app/lib/models/distributor";
import Order from "@/app/lib/models/order";
import Product from "@/app/lib/models/product";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export async function GET() {
  const user = await verifyJWT();
  if (!user) {
    return ApiResponse(401, false, "Unauthorized");
  }
  if (!roleVerify(["admin"], user)) {
    return ApiResponse(403, false, "Forbidden");
  }
  try {
    await connect();
    // admin dashbord card data --
    const dashboardCard = {
      totalOrders: 0,
      totalPendingOrders: 0,
      totalProducts: 0,
      totalDistributors: 0,
    };
    dashboardCard.totalOrders = await Order.countDocuments();
    dashboardCard.totalProducts = await Product.countDocuments();
    dashboardCard.totalDistributors = await Distributor.countDocuments();
    dashboardCard.totalPendingOrders = await Order.countDocuments({
      status: "PENDING",
    });

    // Order overview graph --
    const OrderOverViewGraph = await Order.aggregate([
      {
        $group: {
          _id: {
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
        },
      },
    ]);

    // Order by status graph --
    const OrderByStatusGraph = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    //  Recent orders
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
      },
      "Dashboard data",
    );
  } catch (error) {
    return ApiResponse(500, error, "Internal server error");
  }
}
