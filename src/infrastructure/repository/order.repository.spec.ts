import { Sequelize } from "sequelize-typescript";
import OrderRepository from "./order.repository";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import CustomerModel from "../db/sequelize/model/customer.model";
import ProductModel from "../db/sequelize/model/product.model";

import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import Product from "../../domain/entity/product";

let sequelize: Sequelize;

describe("OrderRepository test", () => {
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      OrderModel,
      OrderItemModel,
      CustomerModel,
      ProductModel,
    ]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customer = new Customer("c1", "Customer 1");
    customer.changeAddress(new Address("Street", 1, "Zip", "City"));
    await CustomerModel.create({
      id: customer.id,
      name: customer.name,
      street: customer.Address.street,
      number: customer.Address.number,
      zipcode: customer.Address.zip,
      city: customer.Address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });

    const product = new Product("p1", "Product 1", 100);
    await ProductModel.create({ id: product.id, name: product.name, price: product.price });

    const item = new OrderItem("i1", product.name, product.price, product.id, 2);
    const order = new Order("o1", customer.id, [item]);

    const repository = new OrderRepository();
    await repository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: "o1" },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toMatchObject({
      id: "o1",
      customer_id: "c1",
      total: 200,
      items: [
        {
          id: "i1",
          name: "Product 1",
          price: 100,
          quantity: 2,
          order_id: "o1",
          product_id: "p1",
        },
      ],
    });
  });

  it("should update an order", async () => {
    // Preparar cenário inicial
    const customer = new Customer("c1", "Customer 1");
    customer.changeAddress(new Address("Street", 1, "Zip", "City"));
    await CustomerModel.create({
      id: customer.id,
      name: customer.name,
      street: customer.Address.street,
      number: customer.Address.number,
      zipcode: customer.Address.zip,
      city: customer.Address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });

    const product = new Product("p1", "Product 1", 100);
    await ProductModel.create({ id: product.id, name: product.name, price: product.price });

    const item = new OrderItem("i1", product.name, product.price, product.id, 2);
    const order = new Order("o1", customer.id, [item]);

    const repository = new OrderRepository();
    await repository.create(order);

    // Atualiza com novos itens
    const newItem = new OrderItem("i2", product.name, product.price, product.id, 1);
    const updatedOrder = new Order("o1", customer.id, [newItem]);
    await repository.update(updatedOrder);

    const updatedModel = await OrderModel.findOne({ where: { id: "o1" }, include: ["items"] });

    expect(updatedModel.total).toBe(100);
    expect(updatedModel.items.length).toBe(1);
    expect(updatedModel.items[0].id).toBe("i2");
  });

  it("should find an order", async () => {
    const customer = new Customer("c1", "Customer 1");
    customer.changeAddress(new Address("Street", 1, "Zip", "City"));
    await CustomerModel.create({
      id: customer.id,
      name: customer.name,
      street: customer.Address.street,
      number: customer.Address.number,
      zipcode: customer.Address.zip,
      city: customer.Address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });

    const product = new Product("p1", "Product 1", 50);
    await ProductModel.create({ id: product.id, name: product.name, price: product.price });

    const item = new OrderItem("i1", product.name, product.price, product.id, 3);
    const order = new Order("o1", customer.id, [item]);

    const repository = new OrderRepository();
    await repository.create(order);

    const foundOrder = await repository.find("o1");

    expect(foundOrder.id).toBe("o1");
    expect(foundOrder.total()).toBe(150);
    expect(foundOrder.items.length).toBe(1);
  });

  it("should find all orders", async () => {
    const customer = new Customer("c1", "Customer 1");
    customer.changeAddress(new Address("Street", 1, "Zip", "City"));
    await CustomerModel.create({
      id: customer.id,
      name: customer.name,
      street: customer.Address.street,
      number: customer.Address.number,
      zipcode: customer.Address.zip,
      city: customer.Address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });

    const product = new Product("p1", "Product 1", 80);
    await ProductModel.create({ id: product.id, name: product.name, price: product.price });

    const item1 = new OrderItem("i1", product.name, product.price, product.id, 1);
    const item2 = new OrderItem("i2", product.name, product.price, product.id, 2);

    const order1 = new Order("o1", customer.id, [item1]);
    const order2 = new Order("o2", customer.id, [item2]);

    const repository = new OrderRepository();
    await repository.create(order1);
    await repository.create(order2);

    const orders = await repository.findAll();

    expect(orders.length).toBe(2);
    expect(orders[0].id).toBe("o1");
    expect(orders[1].id).toBe("o2");
  });
});
