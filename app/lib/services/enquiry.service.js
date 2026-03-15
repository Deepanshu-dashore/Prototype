import connect from "../db/connect";
import { Enquiry } from "../models/enquiry";

export class EnquiryService {
  static async createEnquiry(payload) {
    await connect();
    return await Enquiry.create(payload);
  }

  static async getAllEnquiries(query) {
    await connect();
    const { page = 1, limit = 10, search = "" } = query;
    const skip = (page - 1) * limit;

    const pipeline = [];

    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { fullName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { productOfInterest: { $regex: search, $options: "i" } },
          ],
        },
      });
    }

    pipeline.push({ $sort: { createdAt: -1 } });

    pipeline.push({
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: skip }, { $limit: Number(limit) }],
      },
    });

    const result = await Enquiry.aggregate(pipeline);

    const totalItems = result[0].metadata[0]?.total || 0;
    const enquiries = result[0].data;

    return {
      enquiries,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: Number(page),
    };
  }

  static async getEnquiryById(id) {
    await connect();
    return await Enquiry.findById(id);
  }

  static async updateEnquiry(id, payload) {
    await connect();
    return await Enquiry.findByIdAndUpdate(id, payload, { new: true });
  }

  static async deleteEnquiry(id) {
    await connect();
    return await Enquiry.findByIdAndDelete(id);
  }
}
