"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderItem {
    constructor(id, name, price, productId, quantity) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;
        this._total = this.total();
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get productId() {
        return this._productId;
    }
    get quantity() {
        return this._quantity;
    }
    get price() {
        return this._price;
    }
    total() {
        return this._price * this._quantity;
    }
}
exports.default = OrderItem;
