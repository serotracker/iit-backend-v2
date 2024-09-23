import { assertNever } from "assert-never";
import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterValidatingFaoMersEventsStep,
  CountryPopulationDataAfterValidatingFaoMersEventsStep,
  EstimateFieldsAfterValidatingFaoMersEventsStep,
  FaoMersEventAfterValidatingFaoMersEventsStep,
  MacroSampleFrameFieldsAfterValidatingFaoMersEventsStep,
  RawFaoMersEventAnimalSpecies,
  RawFaoMersEventAnimalType,
  RawFaoMersEventDiagnosisSource,
  RawFaoMersEventDiagnosisStatus,
  SourceFieldsAfterValidatingFaoMersEventsStep,
  StudyFieldsAfterValidatingFaoMersEventsStep,
  YearlyCamelPopulationDataAfterValidatingFaoMersEventsStep
} from "./validate-fao-mers-events-step.js";
import {
  MersDiagnosisSource,
  MersDiagnosisStatus,
  MersEventAnimalSpecies,
  MersEventAnimalType,
  MersEventType
} from "../../../storage/types.js";

const diagnosisStatusCleaningMap: { [key in RawFaoMersEventDiagnosisStatus ]: MersDiagnosisStatus } = {
  [RawFaoMersEventDiagnosisStatus.Confirmed]: MersDiagnosisStatus.CONFIRMED,
  [RawFaoMersEventDiagnosisStatus.Denied]: MersDiagnosisStatus.DENIED
}

const diagnosisSourceCleaningMap: { [key in RawFaoMersEventDiagnosisSource]: MersDiagnosisSource } = {
  [RawFaoMersEventDiagnosisSource.WHO]: MersDiagnosisSource.WORLD_HEALTH_ORGANIZATION,
  [RawFaoMersEventDiagnosisSource["National authorities"]]: MersDiagnosisSource.NATIONAL_AUTHORITIES,
  [RawFaoMersEventDiagnosisSource["WOAH (former OIE)"]]: MersDiagnosisSource.WORLD_ORGANISATION_FOR_ANIMAL_HEALTH,
  [RawFaoMersEventDiagnosisSource.Publications]: MersDiagnosisSource.PUBLICATIONS,
  [RawFaoMersEventDiagnosisSource.Media]: MersDiagnosisSource.MEDIA,
  [RawFaoMersEventDiagnosisSource["FAO Field Officer"]]: MersDiagnosisSource.FAO_FIELD_OFFICER
}

const animalTypeCleaningMap: { [key in RawFaoMersEventAnimalType ]: MersEventAnimalType } = {
  [RawFaoMersEventAnimalType.Domestic]: MersEventAnimalType.DOMESTIC,
  [RawFaoMersEventAnimalType.Wild]: MersEventAnimalType.WILD,
}

const animalSpeciesCleaningMap: { [key in RawFaoMersEventAnimalSpecies ]: MersEventAnimalSpecies } = {
  [RawFaoMersEventAnimalSpecies["Camelidae (Unidentified)"]]: MersEventAnimalSpecies.CAMEL,
  [RawFaoMersEventAnimalSpecies.Bat]: MersEventAnimalSpecies.BAT,
}

interface FaoMersEventAfterCleaningFaoMersEventFieldsStepBase {
  diagnosisStatus: MersDiagnosisStatus;
  diagnosisSource: MersDiagnosisSource;
  country: string;
  state: string;
  city: string;
  latitude: number;
  longitude: number;
  observationDate: string | undefined;
  reportDate: string;
}

export type AnimalFaoMersEventAfterCleaningFaoMersEventFieldsStep = FaoMersEventAfterCleaningFaoMersEventFieldsStepBase & {
  type: MersEventType.ANIMAL;
  animalType: MersEventAnimalType;
  animalSpecies: MersEventAnimalSpecies;
}

export type HumanFaoMersEventAfterCleaningFaoMersEventFieldsStep = FaoMersEventAfterCleaningFaoMersEventFieldsStepBase & {
  type: MersEventType.HUMAN;
  humansAffected: number;
  humanDeaths: number;
}

export type EstimateFieldsAfterCleaningFaoMersEventFieldsStep = EstimateFieldsAfterValidatingFaoMersEventsStep;
export type SourceFieldsAfterCleaningFaoMersEventFieldsStep = SourceFieldsAfterValidatingFaoMersEventsStep;
export type StudyFieldsAfterCleaningFaoMersEventFieldsStep = StudyFieldsAfterValidatingFaoMersEventsStep;
export type CountryFieldsAfterCleaningFaoMersEventFieldsStep = CountryFieldsAfterValidatingFaoMersEventsStep;
export type MacroSampleFrameFieldsAfterCleaningFaoMersEventFieldsStep = MacroSampleFrameFieldsAfterValidatingFaoMersEventsStep;
export type FaoMersEventAfterCleaningFaoMersEventFieldsStep = 
  | AnimalFaoMersEventAfterCleaningFaoMersEventFieldsStep
  | HumanFaoMersEventAfterCleaningFaoMersEventFieldsStep;

export type YearlyCamelPopulationDataAfterCleaningFaoMersEventFieldsStep = YearlyCamelPopulationDataAfterValidatingFaoMersEventsStep;
export type CountryPopulationDataAfterCleaningFaoMersEventFieldsStep = CountryPopulationDataAfterValidatingFaoMersEventsStep;

interface CleanFaoMersEventFieldsStepInput {
  allEstimates: EstimateFieldsAfterValidatingFaoMersEventsStep[];
  allSources: SourceFieldsAfterValidatingFaoMersEventsStep[];
  allStudies: StudyFieldsAfterValidatingFaoMersEventsStep[];
  allCountries: CountryFieldsAfterValidatingFaoMersEventsStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterValidatingFaoMersEventsStep[];
  allFaoMersEvents: FaoMersEventAfterValidatingFaoMersEventsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterValidatingFaoMersEventsStep[];
  countryPopulationData: CountryPopulationDataAfterValidatingFaoMersEventsStep[];
  mongoClient: MongoClient;
}

interface CleanFaoMersEventFieldsStepOutput {
  allEstimates: EstimateFieldsAfterCleaningFaoMersEventFieldsStep[];
  allSources: SourceFieldsAfterCleaningFaoMersEventFieldsStep[];
  allStudies: StudyFieldsAfterCleaningFaoMersEventFieldsStep[];
  allCountries: CountryFieldsAfterCleaningFaoMersEventFieldsStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterCleaningFaoMersEventFieldsStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningFaoMersEventFieldsStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningFaoMersEventFieldsStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningFaoMersEventFieldsStep[];
  mongoClient: MongoClient;
}

const cleanFaoMersEventBase = (event: FaoMersEventAfterValidatingFaoMersEventsStep): FaoMersEventAfterCleaningFaoMersEventFieldsStepBase => ({
  diagnosisStatus: diagnosisStatusCleaningMap[event['Diagnosis.status']],
  diagnosisSource: diagnosisSourceCleaningMap[event['Diagnosis.source']],
  country: event['Country'],
  state: event['Admin.level.1'],
  city: event['Locality'],
  latitude: !Number.isNaN(event['Latitude']) ? event['Latitude'] : 0,
  longitude: !Number.isNaN(event['Longitude']) ? event['Longitude'] : 0,
  observationDate: event['Observation.date..dd.mm.yyyy.'] ?? undefined,
  reportDate: event['Report.date..dd.mm.yyyy.']
})

export const cleanFaoMersEventFieldsStep = (input: CleanFaoMersEventFieldsStepInput): CleanFaoMersEventFieldsStepOutput => {
  console.log(`Running step: cleanFaoMersEventFieldsStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents.map((event) => {
      if(event.type === MersEventType.HUMAN) {
        return {
          ...cleanFaoMersEventBase(event),
          type: MersEventType.HUMAN,
          humansAffected: !Number.isNaN(event['Humans.affected']) ? event['Humans.affected'] : 0,
          humanDeaths: !Number.isNaN(event['Human.deaths']) ? event['Human.deaths'] : 0,
        }
      }
      if(event.type === MersEventType.ANIMAL) {
        return {
          ...cleanFaoMersEventBase(event),
          type: MersEventType.ANIMAL,
          animalType: animalTypeCleaningMap[event['Animal.type']],
          animalSpecies: animalSpeciesCleaningMap[event['Species']]
        }
      }

      assertNever(event);
    }),
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};
