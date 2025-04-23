"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductService {
    static increasePrice(products, percentage) {
        products.forEach((product) => {
            product.changePrice((product.price * percentage) / 100 + product.price);
        });
        return products;
    }
}
exports.default = ProductService;
