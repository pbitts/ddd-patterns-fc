"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("../entity/order"));
const uuid_1 = require("uuid");
class OrderService {
    static placeOrder(customer, items) {
        if (items.length === 0) {
            throw new Error("Order must have at least one item");
        }
        const order = new order_1.default((0, uuid_1.v4)(), customer.id, items);
        customer.addRewardPoints(order.total() / 2);
        return order;
    }
    static total(orders) {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }
}
exports.default = OrderService;
