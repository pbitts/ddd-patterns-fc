"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("../entity/customer"));
const order_1 = __importDefault(require("../entity/order"));
const order_item_1 = __importDefault(require("../entity/order_item"));
const order_service_1 = __importDefault(require("./order.service"));
describe("Order service unit tets", () => {
    it("should place an order", () => {
        const customer = new customer_1.default("c1", "Customer 1");
        const item1 = new order_item_1.default("i1", "Item 1", 10, "p1", 1);
        const order = order_service_1.default.placeOrder(customer, [item1]);
        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });
    it("should get total of all orders", () => {
        const item1 = new order_item_1.default("i1", "Item 1", 100, "p1", 1);
        const item2 = new order_item_1.default("i2", "Item 2", 200, "p2", 2);
        const order = new order_1.default("o1", "c1", [item1]);
        const order2 = new order_1.default("o2", "c1", [item2]);
        const total = order_service_1.default.total([order, order2]);
        expect(total).toBe(500);
    });
});
