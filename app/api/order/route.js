import connect from "@/app/lib/db/connect";
import { verifyDistributorJWT } from "@/app/lib/middlewares/verifyDistibutorJwt";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { verifyWarehouseJWT } from "@/app/lib/middlewares/verifyWarehouseJwt";
import { CloudneryService } from "@/app/lib/services/cloudnery.service";
import { OrderService } from "@/app/lib/services/order.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { mail } from "@/app/lib/utils/mail";
import { orderConfirmationTemplate } from "@/app/lib/utils/mailFormtes";
import mongoose from "mongoose";

export async function GET(request) {
  const user = await verifyJWT();
  const warehouse = await verifyWarehouseJWT();
  if (!user?.id && !warehouse?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  await connect();
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const skip = (page - 1) * limit;

    let filter = {};
    if (status && status !== "ALL") {
      filter.status = status;
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        // Set to end of the day
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }

    if (search) {
      // First, find any distributors that match the search string
      const Distributor =
        mongoose.models.Distributor || mongoose.model("Distributor");
      const matchingDistributors = await Distributor.find({
        $or: [
          { companyName: { $regex: search, $options: "i" } },
          { companyEmail: { $regex: search, $options: "i" } },
          { companyNumber: { $regex: search, $options: "i" } },
          { contactPersonName: { $regex: search, $options: "i" } },
        ],
      }).select("_id");

      const distributorIds = matchingDistributors.map((d) => d._id);

      filter.$or = [
        { po: { $regex: search, $options: "i" } },
        { invoice: { $regex: search, $options: "i" } },
        // Safely search _id by converting it to string first inside the query
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$_id" },
              regex: search,
              options: "i",
            },
          },
        },
      ];

      // If we found matching distributors, include orders from them
      if (distributorIds.length > 0) {
        filter.$or.push({ orderBy: { $in: distributorIds } });
      }
    }

    const { orders, total } = await OrderService.getAllOrders(filter, {
      skip,
      limit,
    });

    // Fetch status-wise counts for cards
    const { pending, processed, readyToShip, received, allTotal } =
      await OrderService.getOrderStatusCounts();

    return ApiResponse(
      200,
      {
        orders,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        statusCounts: {
          PENDING: pending,
          "IN PROCESS": processed,
          "READY-TO-SHIP": readyToShip,
          RECEIVED: received,

          TOTAL: allTotal,
        },
      },
      "Orders fetched successfully",
    );
  } catch (error) {
    console.log("Error fetching orders: ", error);
    return ApiResponse(500, null, "Error fetching orders: " + error.message);
  }
}

export async function POST(request) {
  let user = await verifyDistributorJWT();
  let isAdmin = false;
  if (!user?.id) {
    user = await verifyJWT();
    if (user?.id) {
      isAdmin = true;
    } else {
      return ApiResponse(401, null, "Unauthorized request");
    }
  }
  await connect();
  try {
    const formData = await request.formData();
    const poFile = formData.get("purchaseOrder");
    const orderItemsStr = formData.get("orderItems");
    const instructions = formData.get("instructions");
    const poNumber = formData.get("po") || "";

    let targetDistributorId = user.id;
    if (isAdmin) {
      targetDistributorId = formData.get("distributorId");
      if (!targetDistributorId) {
        return ApiResponse(400, null, "Distributor selection is required");
      }
    }

    let orderItems = [];
    if (orderItemsStr) {
      try {
        orderItems = JSON.parse(orderItemsStr);
      } catch (e) {
        return ApiResponse(400, null, "Invalid order items format");
      }
    }

    if (orderItems.length === 0) {
      return ApiResponse(
        400,
        null,
        "Please add at least one product to your order",
      );
    }

    let documents = [];
    if (poFile && poFile.size > 0) {
      const uploadResult = await CloudneryService.upload(
        poFile,
        "po",
        "raw",
        "pdf",
      );
      if (!uploadResult) {
        return ApiResponse(500, null, "Failed to upload PO document");
      }
      documents = [
        {
          url: uploadResult.url,
          id: uploadResult.id,
          name: "po",
          resource_type: "raw",
        },
      ];
    } else if (!isAdmin) {
      return ApiResponse(400, null, "Purchase Order Document required");
    }

    const MongofyId = new mongoose.Types.ObjectId(targetDistributorId);
    const order = await OrderService.createOrder({
      orderBy: MongofyId,
      documents,
      orderItems,
      po: poNumber ? String(poNumber).trim() : "",
      instructions: instructions ? String(instructions).trim() : "",
    });

    if (!order) {
      return ApiResponse(404, null, "Order not created");
    }

    // Fetch distributor and product details for the email
    const DistributorModel =
      mongoose.models.Distributor || mongoose.model("Distributor");
    const ProductModel = mongoose.models.Product || mongoose.model("Product");

    const [distributor, ...products] = await Promise.all([
      DistributorModel.findById(targetDistributorId),
      ...orderItems.map((item) => ProductModel.findById(item.product)),
    ]);

    const distributorEmail =
      distributor?.companyEmail || distributor?.contactPersonEmail;
    const orderItemsWithProducts = orderItems.map((item, idx) => ({
      ...item,
      product: products[idx],
    }));

    const adminEmail = process.env.ADMIN_EMAIL || "brendan@ccmatting.ie";
    const saleEmail =
      process.env.ORDER_EMAIL_FROM ||
      process.env.ORDER_EMAIL ||
      "orders@ccmatting.ie";

    // Email to Admin/Sales
    const adminEmailHtml = orderConfirmationTemplate({
      order,
      distributor,
      supportEmail: saleEmail,
      orderItems: orderItemsWithProducts,
      title: "New order Received Take action",
      message:
        "A new order has been received from a distributor and requires your attention.",
    });

    await mail({
      from: process.env.EMAIL_FROM,
      to: [adminEmail, saleEmail],
      subject: `ORD-${String(order._id).slice(-6).toUpperCase()} - New Order Received`,
      body: adminEmailHtml,
    });

    // Email to Distributor
    if (distributorEmail) {
      const distributorEmailHtml = orderConfirmationTemplate({
        order,
        distributor,
        supportEmail: saleEmail,
        orderItems: orderItemsWithProducts,
        title: "Your order has been received successfully",
        message:
          "Thank you for your order. We have received it and it is now being processed.",
      });

      await mail({
        from: process.env.ORDER_EMAIL_FROM || process.env.EMAIL_FROM,
        to: distributorEmail,
        subject: `ORD-${String(order._id).slice(-6).toUpperCase()} - Order Received Successfully`,
        body: distributorEmailHtml,
      });
    }

    return ApiResponse(200, order, "Order created successfully");
  } catch (error) {
    console.error("Error creating order:", error);
    return ApiResponse(500, null, "Error creating order: " + error.message);
  }
}
