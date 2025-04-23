import EventDispatcher from "../@shared/event-dispatcher";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLogHandler from "./handler/send-console-log-address.handler";
import EnviaConsoleLog1Handler from "./handler/send-console-log1.event";
import EnviaConsoleLog2Handler from "./handler/send-console-log2.handler";

describe("Customer Domain Events", () => {
    it("should register handlers for CustomerCreatedEvent", () => {
      const dispatcher = new EventDispatcher();
      const handler1 = new EnviaConsoleLog1Handler();
      const handler2 = new EnviaConsoleLog2Handler();
  
      dispatcher.register("CustomerCreatedEvent", handler1);
      dispatcher.register("CustomerCreatedEvent", handler2);
  
      expect(dispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
      expect(dispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
      expect(dispatcher.getEventHandlers["CustomerCreatedEvent"]).toContain(handler1);
      expect(dispatcher.getEventHandlers["CustomerCreatedEvent"]).toContain(handler2);
    });
  
    it("should notify all CustomerCreatedEvent handlers", () => {
      const dispatcher = new EventDispatcher();
      const handler1 = new EnviaConsoleLog1Handler();
      const handler2 = new EnviaConsoleLog2Handler();
  
      const spy1 = jest.spyOn(handler1, "handle");
      const spy2 = jest.spyOn(handler2, "handle");
  
      dispatcher.register("CustomerCreatedEvent", handler1);
      dispatcher.register("CustomerCreatedEvent", handler2);
  
      const event = new CustomerCreatedEvent({
        id: "123",
        name: "Alguem Teste FullCycle"
      });
  
      dispatcher.notify(event);
  
      expect(spy1).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
    });
  
    it("should notify CustomerAddressChangedEvent handler", () => {
      const dispatcher = new EventDispatcher();
      const handler = new EnviaConsoleLogHandler();
      const spy = jest.spyOn(handler, "handle");
  
      dispatcher.register("CustomerAddressChangedEvent", handler);
  
      const event = new CustomerAddressChangedEvent({
        id: "123",
        name: "Alguem Teste FullCycle",
        address: {
          street: "Rua do Wesley",
          number: "999",
          city: "Sao Paulo - SP",
          zip: "12345-678"
        }
      });
  
      dispatcher.notify(event);
  
      expect(spy).toHaveBeenCalled();
    });
  });