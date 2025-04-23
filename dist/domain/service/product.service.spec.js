"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../entity/product"));
const product_service_1 = __importDefault(require("./product.service"));
describe("Product service unit tests", () => {
    it("should change the prices of all products", () => {
        const product1 = new product_1.default("product1", "Product 1", 10);
        const product2 = new product_1.default("product2", "Product 2", 20);
        const products = [product1, product2];
        product_service_1.default.increasePrice(products, 100);
        expect(product1.price).toBe(20);
        expect(product2.price).toBe(40);
    });
});
