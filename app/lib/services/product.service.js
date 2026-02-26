export class ProductService {
  static async createProduct(data) {
    return await Product.create(data);
  }
  static async getAllProducts() {
    return await Product.find();
  }
  static async getProductById(id) {
    return await Product.findById(id);
  }
  static async updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
  static async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}
