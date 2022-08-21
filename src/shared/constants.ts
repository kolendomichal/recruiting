export namespace ServiceYears {
  export const _2020 = 2020;
  export const _2021 = 2021;
  export const _2022 = 2022;
  export type ServiceYear = typeof _2020 | typeof _2021 | typeof _2022;
}

export namespace ServiceTypes {
  export const Photography = "Photography";
  export const VideoRecording = "VideoRecording";
  export const BlurayPackage = "BlurayPackage";
  export const TwoDayEvent = "TwoDayEvent";
  export const WeddingSession = "WeddingSession";
  export const VideoRecordingPhotographyPackage = "VideoRecordingPhotographyPackage";
  export const WeddingSessionPackage = "WeddingSessionPackage";

  export type ServiceType =
    | typeof Photography
    | typeof VideoRecording
    | typeof BlurayPackage
    | typeof TwoDayEvent
    | typeof WeddingSession
    | typeof VideoRecordingPhotographyPackage
    | typeof WeddingSessionPackage;
}
