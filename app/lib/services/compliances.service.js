import connect from "../db/connect";
import { Compliance } from "../models/compliances";

export class ComplianceService {
  static async createCompliance(data) {
    await connect();
    return await Compliance.create(data);
  }

  static async getAllCompliances(filter = {}) {
    await connect();
    return await Compliance.find(filter).lean().sort({ createdAt: -1 });
  }

  static async getComplianceById(id) {
    await connect();
    return await Compliance.findById(id);
  }

  static async updateCompliance(id, data) {
    await connect();
    return await Compliance.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteCompliance(id) {
    await connect();
    return await Compliance.findByIdAndDelete(id);
  }
}
