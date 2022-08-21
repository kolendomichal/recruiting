import { ServiceTypes } from "../shared/constants";

export class Product {
  constructor(
    private readonly price: number,
    private readonly serviceType: ServiceTypes.ServiceType
  ) {
    this.price = price;
    this.serviceType = serviceType;
  }

  public getPrice(): number {
    return this.price;
  }

  public getServiceType(): ServiceTypes.ServiceType {
    return this.serviceType;
  }
}
