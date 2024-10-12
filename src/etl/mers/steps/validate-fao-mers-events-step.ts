import { z } from "zod";
import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterFetchingFaoMersEventsStep,
  CountryPopulationDataAfterFetchingFaoMersEventsStep,
  EstimateFieldsAfterFetchingFaoMersEventsStep,
  FaoMersEventAfterFetchingFaoMersEventsStep,
  MacroSampleFrameFieldsAfterFetchingFaoMersEventsStep,
  SourceFieldsAfterFetchingFaoMersEventsStep,
  StudyFieldsAfterFetchingFaoMersEventsStep,
  WhoCaseDataAfterFetchingFaoMersEventsStep,
  YearlyCamelPopulationDataAfterFetchingFaoMersEventsStep
} from "./fetch-fao-mers-events-step.js";
import { MersEventType } from "../../../storage/types.js";

export enum RawFaoMersEventDiagnosisStatus {
  'Confirmed' = 'Confirmed',
  'Denied' = 'Denied'
}

export enum RawFaoMersEventDiagnosisSource {
  'WHO' = 'WHO',
  'National authorities' = 'National authorities',
  'WOAH (former OIE)' = 'WOAH (former OIE)',
  'Publications' = 'Publications',
  'Media' = 'Media',
  'FAO Field Officer' = 'FAO Field Officer'
}

export enum RawFaoMersEventAnimalType {
  'Domestic' = 'Domestic',
  'Wild' = 'Wild'
}

export enum RawFaoMersEventAnimalSpecies {
  'Camelidae (Unidentified)' = 'Camelidae (Unidentified)',
  'Bat' = 'Bat'
}

interface FaoMersEventAfterValidatingFaoMersEventsStepBase {
  "Diagnosis.status": RawFaoMersEventDiagnosisStatus;
  "Diagnosis.source": RawFaoMersEventDiagnosisSource;
  "Country": string;
  "Admin.level.1": string;
  "Locality": string;
  "Latitude": number;
  "Longitude": number;
  "Observation.date..dd.mm.yyyy.": string | null;
  "Report.date..dd.mm.yyyy.": string;
}

type AnimalFaoMersEventAfterValidatingFaoMersEventsStep = FaoMersEventAfterValidatingFaoMersEventsStepBase & {
  type: MersEventType.ANIMAL;
  "Animal.type": RawFaoMersEventAnimalType;
  "Species": RawFaoMersEventAnimalSpecies;
}

type HumanFaoMersEventAfterValidatingFaoMersEventsStep = FaoMersEventAfterValidatingFaoMersEventsStepBase & {
  type: MersEventType.HUMAN;
  "Humans.affected": number;
  "Human.deaths": number;
}

export type EstimateFieldsAfterValidatingFaoMersEventsStep = EstimateFieldsAfterFetchingFaoMersEventsStep;
export type SourceFieldsAfterValidatingFaoMersEventsStep = SourceFieldsAfterFetchingFaoMersEventsStep;
export type StudyFieldsAfterValidatingFaoMersEventsStep = StudyFieldsAfterFetchingFaoMersEventsStep;
export type CountryFieldsAfterValidatingFaoMersEventsStep = CountryFieldsAfterFetchingFaoMersEventsStep;
export type MacroSampleFrameFieldsAfterValidatingFaoMersEventsStep = MacroSampleFrameFieldsAfterFetchingFaoMersEventsStep;
export type FaoMersEventAfterValidatingFaoMersEventsStep = 
  | AnimalFaoMersEventAfterValidatingFaoMersEventsStep
  | HumanFaoMersEventAfterValidatingFaoMersEventsStep;
export type YearlyCamelPopulationDataAfterValidatingFaoMersEventsStep = YearlyCamelPopulationDataAfterFetchingFaoMersEventsStep;
export type CountryPopulationDataAfterValidatingFaoMersEventsStep = CountryPopulationDataAfterFetchingFaoMersEventsStep;
export type WhoCaseDataAfterValidatingFaoMersEventsStep = WhoCaseDataAfterFetchingFaoMersEventsStep;

interface ValidateFaoMersEventsStepInput {
  allEstimates: EstimateFieldsAfterFetchingFaoMersEventsStep[];
  allSources: SourceFieldsAfterFetchingFaoMersEventsStep[];
  allStudies: StudyFieldsAfterFetchingFaoMersEventsStep[];
  allCountries: CountryFieldsAfterFetchingFaoMersEventsStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterFetchingFaoMersEventsStep[];
  allFaoMersEvents: FaoMersEventAfterFetchingFaoMersEventsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterFetchingFaoMersEventsStep[];
  countryPopulationData: CountryPopulationDataAfterFetchingFaoMersEventsStep[];
  whoCaseData: WhoCaseDataAfterFetchingFaoMersEventsStep[];
  mongoClient: MongoClient;
}

interface ValidateFaoMersEventsStepOutput {
  allEstimates: EstimateFieldsAfterValidatingFaoMersEventsStep[];
  allSources: SourceFieldsAfterValidatingFaoMersEventsStep[];
  allStudies: StudyFieldsAfterValidatingFaoMersEventsStep[];
  allCountries: CountryFieldsAfterValidatingFaoMersEventsStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterValidatingFaoMersEventsStep[];
  allFaoMersEvents: FaoMersEventAfterValidatingFaoMersEventsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterValidatingFaoMersEventsStep[];
  countryPopulationData: CountryPopulationDataAfterValidatingFaoMersEventsStep[];
  whoCaseData: WhoCaseDataAfterValidatingFaoMersEventsStep[];
  mongoClient: MongoClient;
}

export const validateFaoMersEventsStep = (input: ValidateFaoMersEventsStepInput): ValidateFaoMersEventsStepOutput => {
  console.log(`Running step: validateFaoMersEventsStep. Remaining estimates: ${input.allEstimates.length}`);

  const zodFaoMersEventObject = z.object({
    "Diagnosis.status": z
      .nativeEnum(RawFaoMersEventDiagnosisStatus),
    "Diagnosis.source": z
      .nativeEnum(RawFaoMersEventDiagnosisSource),
    "Country": z
      .string(),
    "Admin.level.1": z
      .string(),
    "Locality": z
      .string(),
    "Latitude": z
      .string()
      .transform((latitude) => parseFloat(latitude)),
    "Longitude": z
      .string()
      .transform((longitude) => parseFloat(longitude)),
    "Observation.date..dd.mm.yyyy.": z
      .optional(z.string().nullable())
      .transform((observationDate) => observationDate ?? null),
    "Report.date..dd.mm.yyyy.": z
      .string()
  });

  const zodHumanFaoMersEventObject = zodFaoMersEventObject.and(
    z.object({
    "Humans.affected": z
      .string()
      .transform((element) => parseFloat(element)),
    "Human.deaths": z
      .string()
      .transform((element) => parseFloat(element)),
  }));

  const zodAnimalFaoMersEventObject = zodFaoMersEventObject.and(
    z.object({
      "Animal.type": z
        .nativeEnum(RawFaoMersEventAnimalType),
      "Species": z
        .nativeEnum(RawFaoMersEventAnimalSpecies),
  }));

  const allFaoMersEvents = input.allFaoMersEvents.map((faoMersEvent) => {
    let animalFaoEventParsingError: unknown = undefined;
    let humanFaoEventParsingError: unknown = undefined;

    try {
      const animalFaoMersEvent = zodAnimalFaoMersEventObject.parse(faoMersEvent);

      return {
        type: MersEventType.ANIMAL as const,
        ...animalFaoMersEvent
      };
    } catch( error ) { animalFaoEventParsingError = error; }

    try {
      const humanFaoMersEvent = zodHumanFaoMersEventObject.parse(faoMersEvent);

      return {
        type: MersEventType.HUMAN as const,
        ...humanFaoMersEvent
      };
    } catch( error ) { humanFaoEventParsingError = error; }

    console.error(animalFaoEventParsingError);
    console.error(humanFaoEventParsingError);

    throw animalFaoEventParsingError;
  });

  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    whoCaseData: input.whoCaseData,
    mongoClient: input.mongoClient
  };
};
