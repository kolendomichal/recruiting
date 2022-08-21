import { ServiceTypes } from "../shared/constants";
import { Order } from "../Domain/Order";
import { isNullOrUndefined } from "../shared/utils";
import { PriceRule } from "./PriceRule";

export class VideoRecordingWithBlurayPackagePriceRule extends PriceRule {
  apply(order: Order): void {
    const videoRecording = order.getProduct(ServiceTypes.VideoRecording);
    const blurayPackage = order.getProduct(ServiceTypes.BlurayPackage);

    if (isNullOrUndefined(videoRecording) && !isNullOrUndefined(blurayPackage)) 
    {
      order.addTotalDiscount(blurayPackage.getPrice());
    }
  }
}
