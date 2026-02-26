import connect from "../db/connect";
import Order from "../models/order";

export class OrderService {
  static async createOrder(data) {
    return await Order.create(data);
  }
  static async getAllOrders(filter = {}, options = {}, select = "") {
    await connect();
    const { skip, limit } = options;
    const [orders, total] = await Promise.all([
      Order.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip || 0)
        .limit(limit || 0)
        .populate("orderBy", "companyName companyEmail companyNumber")
        .populate("orderItems.product", "code description")
        .select(select),
      Order.countDocuments(filter),
    ]);
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
}
