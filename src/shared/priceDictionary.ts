import { ServiceTypes, ServiceYears } from "./constants";

type PriceDictionary = {
  [key in ServiceTypes.ServiceType]: { [key in ServiceYears.ServiceYear]: number } | number;
};

const PriceDict: PriceDictionary = {
  Photography: {
    2020: 1700,
    2021: 1800,
    2022: 1900
  },
  VideoRecording: {
    2020: 1700,
    2021: 1800,
    2022: 1900
  },
  WeddingSession: 600,
  BlurayPackage: 300,
  TwoDayEvent: 400,
  VideoRecordingPhotographyPackage: {
    2020: 2200,
    2021: 2300,
    2022: 2500
  },
  WeddingSessionPackage: 300
};

export const getServicePrice = (
  serviceType: ServiceTypes.ServiceType,
  selectedYear: ServiceYears.ServiceYear
): number => {
  let price = PriceDict[serviceType];
  price = typeof price !== "number" ? price[selectedYear] : price;
  return price;
};
