import connect from "../db/connect";
import MarketingAsset from "../models/marketingMatrial";

export class MarketingAssetService {
  static async createMarketingAsset(marketingAsset) {
    await connect();
    return await MarketingAsset.create(marketingAsset);
  }

  static async getAllMarketingAssets(filter = {}) {
    await connect();
    const totalYoutube = await MarketingAsset.countDocuments({
      type: "youtube",
    });
    const totalSocialPost = await MarketingAsset.countDocuments({
      type: "social_post",
    });
    const totalCaseStudy = await MarketingAsset.countDocuments({
      type: "case_study",
    });
    const totalPlaybook = await MarketingAsset.countDocuments({
      type: "playbook",
    });
    const data = await MarketingAsset.find(filter)
      .lean()
      .sort({ createdAt: -1 });
    return {
      totalYoutube,
      totalSocialPost,
      totalCaseStudy,
      totalPlaybook,
      data,
    };
  }

  static async getMarketingAssetById(id) {
    await connect();
    return await MarketingAsset.findById(id);
  }

  static async updateMarketingAsset(id, marketingAsset) {
    await connect();
    return await MarketingAsset.findByIdAndUpdate(id, marketingAsset, {
      new: true,
    });
  }

  static async deleteMarketingAsset(id) {
    await connect();
    return await MarketingAsset.findByIdAndDelete(id);
  }
}
