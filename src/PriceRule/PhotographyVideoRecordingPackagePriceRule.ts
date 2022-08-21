import { ServiceTypes } from "../shared/constants";
import { Order } from "../Domain/Order";
import { isNullOrUndefined } from "../shared/utils";
import { PriceRule } from "./PriceRule";
import { getServicePrice } from "../shared/priceDictionary";

export class PhotographyVideoRecordingPackagePriceRule extends PriceRule {
  apply(order: Order): void {
    const photography = order.getProduct(ServiceTypes.Photography);
    const videoRecording = order.getProduct(ServiceTypes.VideoRecording);

    if (!isNullOrUndefined(photography) && !isNullOrUndefined(videoRecording)) {
      let basePrice = photography.getPrice() + videoRecording.getPrice();
      let VideoRecordingPhotographyPackagePrice = getServicePrice(ServiceTypes.VideoRecordingPhotographyPackage, order.getServiceYear());
      order.addTotalDiscount(basePrice - VideoRecordingPhotographyPackagePrice);
    }
  }
}
