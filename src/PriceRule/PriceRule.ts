import { Order } from "../Domain/Order";

export abstract class PriceRule {
    abstract apply(order: Order): void
};

