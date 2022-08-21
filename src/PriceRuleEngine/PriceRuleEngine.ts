import { Order } from "../Domain/Order";
import { PriceRule } from "../PriceRule/PriceRule";
import { PhotographyVideoRecordingPackagePriceRule } from "../PriceRule/PhotographyVideoRecordingPackagePriceRule";
import { WeddingSessionPhotographyVideoRecordingPriceRule } from "../PriceRule/WeddingSessionPhotographyVideoRecordingPriceRule";
import { VideoRecordingWithBlurayPackagePriceRule } from "../PriceRule/VideoRecordingWithBlurayPackagePriceRule";

export class PriceRuleEngine {
  private readonly rules: Array<PriceRule> = new Array();

  constructor() {
    this.rules.push(new PhotographyVideoRecordingPackagePriceRule());
    this.rules.push(new WeddingSessionPhotographyVideoRecordingPriceRule());
    this.rules.push(new VideoRecordingWithBlurayPackagePriceRule());
  }

  public applyRules(order: Order): void {
    this.rules.forEach(rule => {
        rule.apply(order);
    });
  }
}
