import connect from "../db/connect";
import Distributor from "../models/distributor";
import { ApiResponse } from "../utils/apiResponse";

export class DistributorService {
  //
  //Distributor servies
  //
  static async createDistributor(data) {
    await connect();
    const distributor = await Distributor.create(data);
    return distributor;
  }

  static async deleteDistributor(id) {
    await connect();
    const distributor = await Distributor.findByIdAndDelete(id);
    return distributor;
  }

  static async updateDistributor(id, data) {
    await connect();
    const distributor = await Distributor.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return distributor;
  }

  static async getDistributor(id) {
    await connect();
    const distributor = await Distributor.findById(id);
    return distributor;
  }

  static async getDistributorByEmail(email) {
    await connect();
    const distributor = await Distributor.findOne({
      companyEmail: email,
    }).select(
      " -createdAt -updatedAt -__v -history -shippingAddress -registeredAddress -billingAddress",
    );
    return distributor;
  }

  static async getAllDistributors(filter = {}, projection = {}) {
    await connect();
    const distributors = await Distributor.find(filter, projection);
    return distributors;
  }
}
