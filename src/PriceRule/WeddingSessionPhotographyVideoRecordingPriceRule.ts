import { ServiceTypes, ServiceYears } from "../shared/constants";
import { Order } from "../Domain/Order";
import { getServicePrice } from "../shared/priceDictionary";
import { isNullOrUndefined } from "../shared/utils";
import { PriceRule } from "./PriceRule";

export class WeddingSessionPhotographyVideoRecordingPriceRule extends PriceRule {
  apply(order: Order): void {
    const photography = order.getProduct(ServiceTypes.Photography);
    const videoRecording = order.getProduct(ServiceTypes.VideoRecording);
    const weddingSession = order.getProduct(ServiceTypes.WeddingSession);
    
    const priceRuleValid =(!isNullOrUndefined(photography) || !isNullOrUndefined(videoRecording)) && !isNullOrUndefined(weddingSession);
    
    if (priceRuleValid) {
      let weddingSessionDiscount = order.getServiceYear() === ServiceYears._2022 && !isNullOrUndefined(photography)
          ? weddingSession.getPrice()
          : getServicePrice(ServiceTypes.WeddingSessionPackage, order.getServiceYear());
      
      order.addTotalDiscount(weddingSessionDiscount);
    }
  }
}
