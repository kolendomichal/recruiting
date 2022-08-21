import { Actions } from "./shared/actions";
import { ServiceTypes, ServiceYears } from "./shared/constants";
import { Order } from "./Domain/Order";
import { Product } from "./Domain/Product";
import { PriceRuleEngine } from "./PriceRuleEngine/PriceRuleEngine";
import { getServicePrice } from "./shared/priceDictionary";

const relatedServices: Record<ServiceTypes.ServiceType, Array<ServiceTypes.ServiceType>> = {
  BlurayPackage: [ServiceTypes.VideoRecording],
  TwoDayEvent: [ServiceTypes.Photography, ServiceTypes.VideoRecording],
  Photography: [],
  VideoRecording: [],
  WeddingSession: [],
  VideoRecordingPhotographyPackage: [],
  WeddingSessionPackage: []
}

type Action = {
  type: Actions.ActionTypes;
  service: ServiceTypes.ServiceType;
};

export const updateSelectedServices = (
    previouslySelectedServices: ServiceTypes.ServiceType[],
    action: Action
): ServiceTypes.ServiceType[] => {
  const serviceType = action.service;
  switch (action.type) {
    case Actions.SELECT:
      const relatedServiceTypes = relatedServices[serviceType];

      if (relatedServiceTypes.length !== 0) 
      {
        if (previouslySelectedServices.some((x) => relatedServiceTypes.includes(x))) {
          return [...previouslySelectedServices, serviceType];
        }
        return previouslySelectedServices;
      }

      if (!previouslySelectedServices.includes(serviceType)) {
        return [...previouslySelectedServices, serviceType];
      }

      return previouslySelectedServices;
    case Actions.DESELECT:
      previouslySelectedServices = previouslySelectedServices.filter((service) => service !== serviceType);

      // https://github.com/microsoft/TypeScript/issues/32811
      for (const key in relatedServices) {
        let relatedServicesExist = relatedServices[key].length !== 0;
        if (relatedServicesExist 
              && previouslySelectedServices.includes(key as ServiceTypes.ServiceType) 
              && !relatedServices[key].some((x: ServiceTypes.ServiceType) => previouslySelectedServices.includes(x))) 
        {
          previouslySelectedServices = previouslySelectedServices.filter((service) => service !== key);
        }
      };

      return previouslySelectedServices;
    default:
      return previouslySelectedServices;
  }
};

export const calculatePrice = (
  selectedServices: ServiceTypes.ServiceType[],
  selectedYear: ServiceYears.ServiceYear
) => {
  const order = new Order(selectedYear);
  const ruleEngine = new PriceRuleEngine();

  selectedServices.forEach((serviceType) => {
    let price = getServicePrice(serviceType, selectedYear);
    let product = new Product(price, serviceType);
    order.addProduct(product);
  });

  ruleEngine.applyRules(order);

  return {
    basePrice: order.getBasePrice(),
    finalPrice: order.getBasePrice() - order.getTotalDiscount(),
  };
};