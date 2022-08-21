import { ServiceTypes, ServiceYears } from "../shared/constants";
import { Product } from "./Product";

export class Order {
  private readonly products: Array<Product>;
  private basePrice: number;
  private totalDiscount: number;

  constructor(private readonly serviceYear: ServiceYears.ServiceYear) {
    this.products = new Array();
    this.basePrice = 0;
    this.totalDiscount = 0;
    this.serviceYear = serviceYear;
  }

  public addProduct(product: Product): void {
    this.products.push(product);
    this.basePrice = this.basePrice + product.getPrice();
  }

  public getProduct(name: ServiceTypes.ServiceType): Product | undefined {
    return this.products.find((x) => x.getServiceType() === name);
  }

  public getBasePrice(): number {
    return this.basePrice;
  }

  public setBasePrice(value: number): void {
    this.basePrice = value;
  }

  public getTotalDiscount(): number {
    return this.totalDiscount;
  }

  public addTotalDiscount(value: number): void {
    this.totalDiscount += value;
  }

  public getServiceYear(): ServiceYears.ServiceYear {
    return this.serviceYear;
  }
}
