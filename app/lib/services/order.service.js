import connect from "../db/connect";
import mongoose from "mongoose";
import Order from "../models/order";
import Distributor from "../models/distributor";
import Product from "../models/product";

export class OrderService {
  static async getOrderStatusCounts() {
    await connect();
    const [pending, processed, readyToShip, received, allTotal] =
      await Promise.all([
        Order.countDocuments({ status: "PENDING" }),
        Order.countDocuments({ status: "IN PROCESS" }),
        Order.countDocuments({ status: "READY-TO-SHIP" }),
        Order.countDocuments({ status: "RECEIVED" }),
        Order.countDocuments(),
      ]);
    return {
      pending,
      processed,
      readyToShip,
      received,

      allTotal,
    };
  }
  static async createOrder(data) {
    return await Order.create(data);
  }

  static async createOrderWithDistributor(orderData, distributorData, isNewDistributor) {
    await connect();
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      let targetDistributorId = orderData.orderBy;
      
      if (isNewDistributor) {
        const newDist = await Distributor.create([distributorData], { session });
        targetDistributorId = newDist[0]._id;
      }
      
      const order = await Order.create([{
        ...orderData,
        orderBy: targetDistributorId
      }], { session });
      
      await session.commitTransaction();
      session.endSession();
      
      return { order: order[0], distributorId: targetDistributorId };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
  static async getAllOrders(filter = {}, options = {}, select = "") {
    await connect();
    const { skip, limit } = options;
    const [rawOrders, total] = await Promise.all([
      Order.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip || 0)
        .limit(limit || 0)
        .populate("orderBy", "companyName companyEmail companyNumber")
        .populate("orderItems.product", "code description"),
      Order.countDocuments(filter),
    ]);

    const orders = rawOrders.map((order) => {
      const obj = order.toObject();
      const hasQc = !!(obj.qc && Object.keys(obj.qc).length > 0);
      return { ...obj, qc: hasQc };
    });

    return { orders, total };
  }
  static async getOrderById(id) {
    return await Order.findById(id)
      .populate("orderItems.product")
      .populate("orderBy", "companyName companyEmail companyNumber");
  }
  static async updateOrder(id, data) {
    return await Order.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
  static async deleteOrder(id) {
    return await Order.findByIdAndDelete(id);
  }
  static async updateQc(orderId, qcData) {
    return await Order.findByIdAndUpdate(
      orderId,
      { $set: { qc: qcData } },
      { new: true, runValidators: true },
    );
  }
}
