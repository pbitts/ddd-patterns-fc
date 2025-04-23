"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const product_1 = __importDefault(require("../../domain/entity/product"));
const product_model_1 = __importDefault(require("../db/sequelize/model/product.model"));
const product_repository_1 = __importDefault(require("./product.repository"));
describe("Product repository test", () => {
    let sequileze;
    beforeEach(async () => {
        sequileze = new sequelize_typescript_1.Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequileze.addModels([product_model_1.default]);
        await sequileze.sync();
    });
    afterEach(async () => {
        await sequileze.close();
    });
    it("should create a product", async () => {
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("1", "Product 1", 100);
        await productRepository.create(product);
        const productModel = await product_model_1.default.findOne({ where: { id: "1" } });
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100,
        });
    });
    it("should update a product", async () => {
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("1", "Product 1", 100);
        await productRepository.create(product);
        const productModel = await product_model_1.default.findOne({ where: { id: "1" } });
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100,
        });
        product.changeName("Product 2");
        product.changePrice(200);
        await productRepository.update(product);
        const productModel2 = await product_model_1.default.findOne({ where: { id: "1" } });
        expect(productModel2.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 2",
            price: 200,
        });
    });
    it("should find a product", async () => {
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("1", "Product 1", 100);
        await productRepository.create(product);
        const productModel = await product_model_1.default.findOne({ where: { id: "1" } });
        const foundProduct = await productRepository.find("1");
        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price,
        });
    });
    it("should find all products", async () => {
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("1", "Product 1", 100);
        await productRepository.create(product);
        const product2 = new product_1.default("2", "Product 2", 200);
        await productRepository.create(product2);
        const foundProducts = await productRepository.findAll();
        const products = [product, product2];
        expect(products).toEqual(foundProducts);
    });
});
