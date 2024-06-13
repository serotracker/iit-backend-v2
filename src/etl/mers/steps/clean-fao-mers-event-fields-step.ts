import { assertNever } from "assert-never";
import { MongoClient } from "mongodb";
import {
  EstimateFieldsAfterValidatingFaoMersEventsStep,
  FaoMersEventAfterValidatingFaoMersEventsStep,
  RawFaoMersEventAnimalSpecies,
  RawFaoMersEventAnimalType,
  RawFaoMersEventDiagnosisSource,
  RawFaoMersEventDiagnosisStatus
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
export type FaoMersEventAfterCleaningFaoMersEventFieldsStep = 
  | AnimalFaoMersEventAfterCleaningFaoMersEventFieldsStep
  | HumanFaoMersEventAfterCleaningFaoMersEventFieldsStep;

interface CleanFaoMersEventFieldsStepInput {
  allEstimates: EstimateFieldsAfterValidatingFaoMersEventsStep[];
  allFaoMersEvents: FaoMersEventAfterValidatingFaoMersEventsStep[];
  mongoClient: MongoClient;
}

interface CleanFaoMersEventFieldsStepOutput {
  allEstimates: EstimateFieldsAfterCleaningFaoMersEventFieldsStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningFaoMersEventFieldsStep[];
  mongoClient: MongoClient;
}

const cleanFaoMersEventBase = (event: FaoMersEventAfterValidatingFaoMersEventsStep): FaoMersEventAfterCleaningFaoMersEventFieldsStepBase => ({
  diagnosisStatus: diagnosisStatusCleaningMap[event['Diagnosis.status']],
  diagnosisSource: diagnosisSourceCleaningMap[event['Diagnosis.source']],
  country: event['Country'],
  state: event['Admin.level.1'],
  city: event['Locality'],
  latitude: event['Latitude'],
  longitude: event['Longitude'],
  observationDate: event['Observation.date..dd.mm.yyyy.'] ?? undefined,
  reportDate: event['Report.date..dd.mm.yyyy.']
})

export const cleanFaoMersEventFieldsStep = (input: CleanFaoMersEventFieldsStepInput): CleanFaoMersEventFieldsStepOutput => {
  console.log(`Running step: cleanFaoMersEventFieldsStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates,
    allFaoMersEvents: input.allFaoMersEvents.map((event) => {
      if(event.type === MersEventType.HUMAN) {
        return {
          ...cleanFaoMersEventBase(event),
          type: MersEventType.HUMAN,
          humansAffected: event['Humans.affected'],
          humanDeaths: event['Human.deaths']
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
    mongoClient: input.mongoClient
  };
};
