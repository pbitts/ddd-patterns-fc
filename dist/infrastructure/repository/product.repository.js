"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../../domain/entity/product"));
const product_model_1 = __importDefault(require("../db/sequelize/model/product.model"));
class ProductRepository {
    async create(entity) {
        await product_model_1.default.create({
            id: entity.id,
            name: entity.name,
            price: entity.price,
        });
    }
    async update(entity) {
        await product_model_1.default.update({
            name: entity.name,
            price: entity.price,
        }, {
            where: {
                id: entity.id,
            },
        });
    }
    async find(id) {
        const productModel = await product_model_1.default.findOne({ where: { id } });
        return new product_1.default(productModel.id, productModel.name, productModel.price);
    }
    async findAll() {
        const productModels = await product_model_1.default.findAll();
        return productModels.map((productModel) => new product_1.default(productModel.id, productModel.name, productModel.price));
    }
}
exports.default = ProductRepository;
