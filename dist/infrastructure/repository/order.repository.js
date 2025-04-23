"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_item_model_1 = __importDefault(require("../db/sequelize/model/order-item.model"));
const order_model_1 = __importDefault(require("../db/sequelize/model/order.model"));
class OrderRepository {
    async create(entity) {
        await order_model_1.default.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            })),
        }, {
            include: [{ model: order_item_model_1.default }],
        });
    }
}
exports.default = OrderRepository;
