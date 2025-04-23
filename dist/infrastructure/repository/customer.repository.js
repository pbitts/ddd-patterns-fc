"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("../../domain/entity/customer"));
const address_1 = __importDefault(require("../../domain/entity/address"));
const customer_model_1 = __importDefault(require("../db/sequelize/model/customer.model"));
class CustomerRepository {
    async create(entity) {
        await customer_model_1.default.create({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zipcode: entity.Address.zip,
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        });
    }
    async update(entity) {
        await customer_model_1.default.update({
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zipcode: entity.Address.zip,
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        }, {
            where: {
                id: entity.id,
            },
        });
    }
    async find(id) {
        let customerModel;
        try {
            customerModel = await customer_model_1.default.findOne({
                where: {
                    id,
                },
                rejectOnEmpty: true,
            });
        }
        catch (error) {
            throw new Error("Customer not found");
        }
        const customer = new customer_1.default(id, customerModel.name);
        const address = new address_1.default(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city);
        customer.changeAddress(address);
        return customer;
    }
    async findAll() {
        const customerModels = await customer_model_1.default.findAll();
        const customers = customerModels.map((customerModels) => {
            let customer = new customer_1.default(customerModels.id, customerModels.name);
            customer.addRewardPoints(customerModels.rewardPoints);
            const address = new address_1.default(customerModels.street, customerModels.number, customerModels.zipcode, customerModels.city);
            customer.changeAddress(address);
            if (customerModels.active) {
                customer.activate();
            }
            return customer;
        });
        return customers;
    }
}
exports.default = CustomerRepository;
