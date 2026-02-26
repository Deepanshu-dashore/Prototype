import connect from "../db/connect";
import Warehouse from "../models/warehouse";
import { comparePasswords, hashPassword } from "../security/passwordHasher";
import jwt from "jsonwebtoken";
import { sanitizeText } from "../security/sanitizer";

export class WarehouseService {
  static async create(name, password) {
    await connect();
    const isExistWarehouse = await Warehouse.findOne({ name });
    if (isExistWarehouse) {
      throw new Error("Warehouse already exists");
    }
    const hashedPassword = await hashPassword(password);
    const warehouse = await Warehouse.create({
      name,
      password: hashedPassword,
    });
    return warehouse;
  }
  static async login(name, password) {
    await connect();
    const warehouse = await Warehouse.findOne({ name });
    if (!warehouse) {
      return { exist: false };
    }
    const isPasswordValid = await comparePasswords(
      sanitizeText(password),
      warehouse.password,
    );
    if (!isPasswordValid) {
      return { passwordValid: false };
    }
    const token = jwt.sign(
      { id: warehouse._id, role: "warehouse" },
      process.env.JWT_SECRET || "secret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" },
    );
    return { warehouse, token };
  }
}
