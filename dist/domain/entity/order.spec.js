"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("./order"));
const order_item_1 = __importDefault(require("./order_item"));
describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new order_1.default("", "123", []);
        }).toThrowError("Id is required");
    });
    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new order_1.default("123", "", []);
        }).toThrowError("CustomerId is required");
    });
    it("should throw error when items is empty", () => {
        expect(() => {
            let order = new order_1.default("123", "123", []);
        }).toThrowError("Items are required");
    });
    it("should calculate total", () => {
        const item = new order_item_1.default("i1", "Item 1", 100, "p1", 2);
        const item2 = new order_item_1.default("i2", "Item 2", 200, "p2", 2);
        const order = new order_1.default("o1", "c1", [item]);
        let total = order.total();
        expect(order.total()).toBe(200);
        const order2 = new order_1.default("o1", "c1", [item, item2]);
        total = order2.total();
        expect(total).toBe(600);
    });
    it("should throw error if the item qte is less or equal zero 0", () => {
        expect(() => {
            const item = new order_item_1.default("i1", "Item 1", 100, "p1", 0);
            const order = new order_1.default("o1", "c1", [item]);
        }).toThrowError("Quantity must be greater than 0");
    });
});
