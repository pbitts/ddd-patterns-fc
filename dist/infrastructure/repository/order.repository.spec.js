"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const customer_1 = __importDefault(require("../../domain/entity/customer"));
const address_1 = __importDefault(require("../../domain/entity/address"));
const customer_model_1 = __importDefault(require("../db/sequelize/model/customer.model"));
const customer_repository_1 = __importDefault(require("./customer.repository"));
const order_item_model_1 = __importDefault(require("../db/sequelize/model/order-item.model"));
const product_model_1 = __importDefault(require("../db/sequelize/model/product.model"));
const product_repository_1 = __importDefault(require("./product.repository"));
const product_1 = __importDefault(require("../../domain/entity/product"));
const order_item_1 = __importDefault(require("../../domain/entity/order_item"));
const order_1 = __importDefault(require("../../domain/entity/order"));
const order_model_1 = __importDefault(require("../db/sequelize/model/order.model"));
const order_repository_1 = __importDefault(require("./order.repository"));
describe("Order repository test", () => {
    let sequelize;
    beforeEach(async () => {
        sequelize = new sequelize_typescript_1.Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([
            customer_model_1.default,
            order_model_1.default,
            order_item_model_1.default,
            product_model_1.default,
        ]);
        await sequelize.sync();
    });
    afterEach(async () => {
        await sequelize.close();
    });
    it("should create a new order", async () => {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("123", "Customer 1");
        const address = new address_1.default("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("123", "Product 1", 10);
        await productRepository.create(product);
        const orderItem = new order_item_1.default("1", product.name, product.price, product.id, 2);
        const order = new order_1.default("123", "123", [orderItem]);
        const orderRepository = new order_repository_1.default();
        await orderRepository.create(order);
        const orderModel = await order_model_1.default.findOne({
            where: { id: order.id },
            include: ["items"],
        });
        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });
    });
});
