import { ObjectId } from "mongodb";
import { WHORegion } from "../lib/who-regions";
import { UNRegion } from "../lib/un-regions";
import { GBDSubRegion, GBDSuperRegion } from "../lib/gbd-regions";
import { ThreeLetterIsoCountryCode, TwoLetterIsoCountryCode } from "../lib/geocoding-api/country-codes";

export enum Arbovirus {
  ZIKV = "ZIKV",
  DENV = "DENV",
  CHIKV = "CHIKV",
  YF = "YF",
  WNV = "WNV",
  MAYV = "MAYV"
}

export enum Month {
  JANUARY = "JANUARY",
  FEBRUARY = "FEBRUARY",
  MARCH = "MARCH",
  APRIL = "APRIL",
  MAY = "MAY",
  JUNE = "JUNE",
  JULY = "JULY",
  AUGUST = "AUGUST",
  SEPTEMBER = "SEPTEMBER",
  OCTOBER = "OCTOBER",
  NOVEMBER = "NOVEMBER",
  DECEMBER = "DECEMBER"
}

export const isArbovirus = (arbovirus: string): arbovirus is Arbovirus => Object.values(Arbovirus).some((element) => element === arbovirus);

export interface ArbovirusEstimateDocument {
  _id: ObjectId;
  sex: string | undefined;
  ageMinimum: number | undefined;
  ageMaximum: number | undefined;
  ageGroup: string | undefined;
  assayOther: string | undefined;
  producer: string | undefined;
  producerOther: string | undefined;
  sampleFrame: string | undefined;
  sameFrameTargetGroup: string | undefined;
  sampleSize: number;
  serotype: string[];
  sampleNumerator: number | undefined;
  inclusionCriteria: string | undefined;
  pathogen: Arbovirus;
  pediatricAgeGroup: string | undefined;
  seroprevalence: number;
  seroprevalenceStudy95CILower: number | undefined;
  seroprevalenceStudy95CIUpper: number | undefined;
  seroprevalenceCalculated95CILower: number | undefined;
  seroprevalenceCalculated95CIUpper: number | undefined;
  country: string;
  countryAlphaTwoCode: string;
  countryAlphaThreeCode: string;
  state: string | undefined;
  city: string | undefined;
  antibodies: string[] | undefined;
  latitude: number;
  longitude: number;
  sampleStartDate: Date | undefined;
  sampleEndDate: Date | undefined;
  assay: string | undefined;
  unRegion: UNRegion | undefined;
  url: string | undefined;
  sourceSheetId: string | undefined;
  antigen: string | undefined;
  whoRegion: string | undefined;
  sourceSheetName: string | undefined;
  estimateId: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export interface ArbovirusEnvironmentalSuitabilityStatsEntryDocument {
  _id: ObjectId;
  countryAlphaThreeCode: string;
  countryAlphaTwoCode: string;
  countryName: string;
  zikaData: {
    minimumValue: number;
    maximumValue: number;
    valueRange: number;
    meanValue: number;
    medianValue: number;
    ninetyPercentOfValuesAreBelowThisValue: number;
  },
  dengue2015Data: {
    minimumValue: number;
    maximumValue: number;
    valueRange: number;
    meanValue: number;
    medianValue: number;
    ninetyPercentOfValuesAreBelowThisValue: number;
  },
  dengue2050Data: {
    minimumValue: number;
    maximumValue: number;
    valueRange: number;
    meanValue: number;
    medianValue: number;
    ninetyPercentOfValuesAreBelowThisValue: number;
  },
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMemberDocument {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string | undefined;
  twitterUrl: string | undefined;
  linkedinUrl: string | undefined;
  teams: Array<{
    label: string,
    sortOrder: number,
  }>;
  affiliations: Array<{
    label: string;
  }>;
  arbotrackerContributorFlag: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SarsCov2EstimateDocument {
  _id: ObjectId;
  riskOfBias: string | undefined;
  antibodies: string[];
  isotypes: string[];
  isWHOUnityAligned: boolean;
  testType: string[];
  ageGroup: string | undefined;
  sex: string | undefined;
  studyName: string;
  sourceType: string | undefined;
  populationGroup: string | undefined;
  latitude: number;
  longitude: number;
  whoRegion: WHORegion | undefined;
  unRegion: UNRegion | undefined;
  gbdSuperRegion: GBDSuperRegion | undefined;
  gbdSubRegion: GBDSubRegion | undefined;
  country: string;
  countryAlphaTwoCode: string;
  countryAlphaThreeCode: string;
  state: string | undefined;
  county: string | undefined;
  city: string | undefined;
  scope: string | undefined;
  samplingEndDate: Date | undefined;
  samplingStartDate: Date | undefined;
  samplingMidDate: Date | undefined;
  publicationDate: Date | undefined;
  countryPeopleVaccinatedPerHundred: number | undefined;
  countryPeopleFullyVaccinatedPerHundred: number | undefined;
  countryPositiveCasesPerMillionPeople: number | undefined;
  countryPopulation: number | undefined;
  denominatorValue: number | undefined;
  numeratorValue: number | undefined;
  seroprevalence: number | undefined;
  estimateName: string | undefined;
  partitionKey: number;
  url: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export enum MersEstimateType {
  HUMAN_VIRAL = 'HUMAN_VIRAL',
  ANIMAL_VIRAL = 'ANIMAL_VIRAL',
  HUMAN_SEROPREVALENCE = 'HUMAN_SEROPREVALENCE',
  ANIMAL_SEROPREVALENCE = 'ANIMAL_SEROPREVALENCE',
}

export enum MersSubGroupingVariable {
  PRIMARY = 'PRIMARY',
  ANIMAL_SPECIES = 'ANIMAL_SPECIES',
  TEST_USED = 'TEST_USED',
  GEOGRAPHICAL_AREA = 'GEOGRAPHICAL_AREA',
  TIME_FRAME = 'TIME_FRAME',
  SAMPLE_TYPE = 'SAMPLE_TYPE',
  OCCUPATION = 'OCCUPATION',
  EXPOSURE_LEVEL = 'EXPOSURE_LEVEL',
  NOMADISM = 'NOMADISM',
  ANIMAL_SOURCE_LOCATION = 'ANIMAL_SOURCE_LOCATION',
  ANIMAL_SAMPLING_CONTEXT = 'ANIMAL_SAMPLING_CONTEXT',
  TRAVEL = 'TRAVEL',
  AGE = 'AGE',
  SEX = 'SEX',
}

export const isMersSubGroupingVariable = (subGroupingVariable: string): subGroupingVariable is MersSubGroupingVariable => 
  Object.values(MersSubGroupingVariable).some((element) => element === subGroupingVariable);

export enum MersAnimalSpecies {
  CAMEL = "CAMEL",
  SHEEP = "SHEEP",
  GOAT = "GOAT",
  CATTLE = "CATTLE",
  BAT = "BAT",
  DONKEY = "DONKEY",
  WATER_BUFFALO = "WATER_BUFFALO",
  BABOON = "BABOON",
}

export enum MersAnimalType {
  DOMESTIC = "DOMESTIC",
  WILD = "WILD",
}

export const isMersAnimalType = (animalType: string): animalType is MersAnimalType =>
  Object.values(MersAnimalType).some((element) => element === animalType);

export enum Clade {
  A = 'A',
  B = 'B',
  C1 = 'C1',
  C2 = 'C2',
  C = 'C'
}

const isClade = (clade: string): clade is Clade =>
  Object.values(Clade).some((value) => value === clade);

export enum GenomeSequenced {
  FULL_LENGTH = 'FULL_LENGTH',
  PARTIAL_S_GENE = 'PARTIAL_S_GENE',
  PARTIAL_N_GENE = 'PARTIAL_N_GENE'
}

const isGenomeSequenced = (genomeSequenced: string): genomeSequenced is GenomeSequenced =>
  Object.values(GenomeSequenced).some((value) => value === genomeSequenced);

export interface MersEstimateDocumentBase {
  _id: ObjectId;
  estimateId: string;
  subGroupingVariable: MersSubGroupingVariable;
  city: string | undefined;
  state: string | undefined;
  district: string | undefined;
  country: string;
  countryAlphaTwoCode: string;
  countryAlphaThreeCode: string;
  whoRegion: WHORegion | undefined;
  unRegion: UNRegion | undefined;
  latitude: number;
  longitude: number;
  firstAuthorFullName: string;
  sourcePublicationYear: number;
  sourceUrl: string;
  sourceType: string;
  sourceTitle: string;
  insitutution: string | undefined;
  studyInclusionCriteria: string | undefined;
  studyExclusionCriteria: string | undefined;
  sensitivity: number | undefined;
  sensitivity95CILower: number | undefined;
  sensitivity95CIUpper: number | undefined;
  sensitivityDenominator: number | undefined;
  specificity: number | undefined;
  specificity95CILower: number | undefined;
  specificity95CIUpper: number | undefined;
  specificityDenominator: number | undefined;
  sampleDenominator: number | undefined;
  sampleNumerator: number | undefined;
  assay: string[];
  specimenType: string[];
  sex: string | undefined;
  socioeconomicStatus: string | undefined;
  exposureToCamels: string | undefined;
  isotypes: string[];
  antigen: string[];
  samplingStartDate: Date | undefined;
  samplingEndDate: Date | undefined;
  samplingMidDate: Date | undefined;
  samplingMethod: string | undefined;
  geographicScope: string | undefined;
  testProducer: string[];
  testProducerOther: string | undefined;
  testValidation: string[];
  testValidatedOn: string | undefined;
  positiveCutoff: string | undefined;
  symptomPrevalenceOfPositives: number | undefined;
  symptomDefinition: string | undefined;
  sequencingDone: boolean;
  clade: Clade[];
  accessionNumbers: string | undefined;
  genomeSequenced: GenomeSequenced[];
  createdAt: Date;
  updatedAt: Date;
}

export type HumanMersSeroprevalenceEstimateDocument = MersEstimateDocumentBase & {
  type: MersEstimateType.HUMAN_SEROPREVALENCE;
  seroprevalence: number;
  seroprevalence95CILower: number | undefined;
  seroprevalence95CIUpper: number | undefined;
  seroprevalenceCalculated95CILower: number;
  seroprevalenceCalculated95CIUpper: number;
  ageGroup: string[];
  sampleFrame: string | undefined;
  humanCountriesOfTravel: Array<{
    country: string;
    countryAlphaTwoCode: TwoLetterIsoCountryCode;
    countryAlphaThreeCode: ThreeLetterIsoCountryCode;
  }>
}

export type HumanMersViralEstimateDocument = MersEstimateDocumentBase & {
  type: MersEstimateType.HUMAN_VIRAL;
  positivePrevalence: number;
  positivePrevalence95CILower: number | undefined;
  positivePrevalence95CIUpper: number | undefined;
  positivePrevalenceCalculated95CILower: number;
  positivePrevalenceCalculated95CIUpper: number;
  ageGroup: string[];
  sampleFrame: string | undefined;
  humanCountriesOfTravel: Array<{
    country: string;
    countryAlphaTwoCode: TwoLetterIsoCountryCode;
    countryAlphaThreeCode: ThreeLetterIsoCountryCode;
  }>
}

export type AnimalMersSeroprevalenceEstimateDocument = MersEstimateDocumentBase & {
  type: MersEstimateType.ANIMAL_SEROPREVALENCE;
  seroprevalence: number;
  seroprevalence95CILower: number | undefined;
  seroprevalence95CIUpper: number | undefined;
  seroprevalenceCalculated95CILower: number;
  seroprevalenceCalculated95CIUpper: number;
  animalSpecies: MersAnimalSpecies;
  animalType: MersAnimalType[];
  animalDetectionSettings: string[];
  animalPurpose: string | undefined;
  animalImportedOrLocal: string | undefined;
  animalAgeGroup: string[];
  animalCountriesOfImport: Array<{
    country: string;
    countryAlphaTwoCode: TwoLetterIsoCountryCode;
    countryAlphaThreeCode: ThreeLetterIsoCountryCode;
  }>
}

export type AnimalMersViralEstimateDocument = MersEstimateDocumentBase & {
  type: MersEstimateType.ANIMAL_VIRAL;
  positivePrevalence: number;
  positivePrevalence95CILower: number | undefined;
  positivePrevalence95CIUpper: number | undefined;
  positivePrevalenceCalculated95CILower: number;
  positivePrevalenceCalculated95CIUpper: number;
  animalSpecies: MersAnimalSpecies;
  animalType: MersAnimalType[];
  animalDetectionSettings: string[];
  animalPurpose: string | undefined;
  animalImportedOrLocal: string | undefined;
  animalAgeGroup: string[];
  animalCountriesOfImport: Array<{
    country: string;
    countryAlphaTwoCode: TwoLetterIsoCountryCode;
    countryAlphaThreeCode: ThreeLetterIsoCountryCode;
  }>
}

export type MersEstimateDocument = 
  | HumanMersSeroprevalenceEstimateDocument
  | HumanMersViralEstimateDocument
  | AnimalMersSeroprevalenceEstimateDocument
  | AnimalMersViralEstimateDocument;

type PrimaryMersEstimateInformation = (
  | Omit<HumanMersSeroprevalenceEstimateDocument, 'createdAt'|'updatedAt'>
  | Omit<HumanMersViralEstimateDocument, 'createdAt'|'updatedAt'>
  | Omit<AnimalMersSeroprevalenceEstimateDocument, 'createdAt'|'updatedAt'>
  | Omit<AnimalMersViralEstimateDocument, 'createdAt'|'updatedAt'>
) & {
  id: ObjectId;
  createdAt: undefined;
  updatedAt: undefined;
};

interface MersSubEstimateInformationBase {
  sampleDenominator: number | undefined;
  sampleNumerator: number | undefined;
}

type MersSeroprevalenceSubEstimateInformation = MersSubEstimateInformationBase & {
  seroprevalence: number;
  seroprevalence95CILower: number | undefined;
  seroprevalence95CIUpper: number | undefined;
  seroprevalenceCalculated95CILower: number;
  seroprevalenceCalculated95CIUpper: number;
}


type MersViralSubEstimateInformation = MersSubEstimateInformationBase & {
  positivePrevalence: number;
  positivePrevalence95CILower: number | undefined;
  positivePrevalence95CIUpper: number | undefined;
  positivePrevalenceCalculated95CILower: number;
  positivePrevalenceCalculated95CIUpper: number;
}

type MersSubEstimateInformation = 
  | MersSeroprevalenceSubEstimateInformation
  | MersViralSubEstimateInformation;

export const isMersSeroprevalenceSubEstimateInformation = (subestimate: MersSubEstimateInformation): subestimate is Extract<typeof subestimate, { seroprevalence: number} > => {
  return 'seroprevalence' in subestimate && typeof subestimate['seroprevalence'] === 'number';
}

export const isMersViralSubEstimateInformation = (subestimate: MersSubEstimateInformation): subestimate is Extract<typeof subestimate, { positivePrevalence: number} > => {
  return 'positivePrevalence' in subestimate && typeof subestimate['positivePrevalence'] === 'number';
}

export interface MersSubEstimateBase {
  id: string;
  estimateId: string;
  estimateInfo: MersSubEstimateInformation;
}

type MersGeographicalAreaSubEstimate = MersSubEstimateBase & {
  city: string | undefined;
  state: string | undefined;
  district: string | undefined;
  country: string;
  countryAlphaTwoCode: string;
  countryAlphaThreeCode: string;
  latitude: number;
  longitude: number;
  whoRegion: WHORegion | undefined;
  unRegion: UNRegion | undefined;
  geographicScope: string | undefined;
}

type HumanMersAgeGroupSubEstimate = MersSubEstimateBase & {
  ageGroup: string[];
  ageGroupLabel: string;
}

type AnimalMersAgeGroupSubEstimate = MersSubEstimateBase & {
  animalAgeGroup: string[];
  animalAgeGroupLabel: string;
}

type MersAgeGroupSubEstimate = HumanMersAgeGroupSubEstimate | AnimalMersAgeGroupSubEstimate;

export const isHumanMersAgeGroupSubEstimate = (subestimate: MersAgeGroupSubEstimate): subestimate is Extract<MersAgeGroupSubEstimate, { ageGroup: string[] }> => {
  return 'ageGroup' in subestimate && Array.isArray(subestimate['ageGroup'])
}

export const isAnimalMersAgeGroupSubEstimate = (subestimate: MersAgeGroupSubEstimate): subestimate is Extract<MersAgeGroupSubEstimate, { animalAgeGroup: string[] }> => {
  return 'animalAgeGroup' in subestimate && Array.isArray(subestimate['animalAgeGroup'])
}

type MersTestUsedSubEstimate = MersSubEstimateBase & {
  assay: string[];
}

type MersAnimalSpeciesSubEstimate = MersSubEstimateBase & {
  animalSpecies: MersAnimalSpecies;
}

type MersSexSubEstimate = MersSubEstimateBase & {
  sex: string;
}

type MersTimeFrameSubEstimate = MersSubEstimateBase & {
  samplingStartDate: Date;
  samplingEndDate: Date;
}

type MersSampleTypeSubEstimate = MersSubEstimateBase & {
  specimenType: string[];
}

type MersOccupationSubEstimate = MersSubEstimateBase & {
  occupation: string;
  sampleFrame: string | undefined;
  exposureToCamels: string | undefined;
}

type MersAnimalSourceLocationSubEstimate = MersSubEstimateBase & {
  animalImportedOrLocal: string;
  animalCountriesOfImport: Array<{
    country: string;
    countryAlphaTwoCode: TwoLetterIsoCountryCode;
    countryAlphaThreeCode: ThreeLetterIsoCountryCode;
  }>
}

type MersAnimalSamplingContextSubEstimate = MersSubEstimateBase & {
  animalDetectionSettings: string[];
}

type MersCamelExposureLevelSubEstimate = MersSubEstimateBase & {
  details: string;
  sampleFrame: string;
  exposureToCamels: string;
}

type MersNomadismSubEstimate = MersSubEstimateBase & {
  details: string;
}

type MersHumanCountriesOfTravelSubEstimate = MersSubEstimateBase & {
  humanCountriesOfTravel: Array<{
    country: string;
    countryAlphaTwoCode: TwoLetterIsoCountryCode;
    countryAlphaThreeCode: ThreeLetterIsoCountryCode;
  }>
}

export interface MersPrimaryEstimateDocument {
  _id: ObjectId;
  estimateId: string;
  primaryEstimateInfo: PrimaryMersEstimateInformation;
  geographicalAreaSubestimates: MersGeographicalAreaSubEstimate[];
  ageGroupSubestimates: MersAgeGroupSubEstimate[];
  testUsedSubestimates: MersTestUsedSubEstimate[];
  animalSpeciesSubestimates: MersAnimalSpeciesSubEstimate[];
  sexSubestimates: MersSexSubEstimate[];
  timeFrameSubestimates: MersTimeFrameSubEstimate[];
  sampleTypeSubestimates: MersSampleTypeSubEstimate[];
  occupationSubestimates: MersOccupationSubEstimate[];
  animalSourceLocationSubestimates: MersAnimalSourceLocationSubEstimate[];
  animalSamplingContextSubestimates: MersAnimalSamplingContextSubEstimate[];
  camelExposureLevelSubestimates: MersCamelExposureLevelSubEstimate[];
  nomadismSubestimates: MersNomadismSubEstimate[];
  humanCountriesOfTravelSubestimates: MersHumanCountriesOfTravelSubEstimate[];
  createdAt: Date;
  updatedAt: Date;
}

export enum MersDiagnosisStatus {
  CONFIRMED = "CONFIRMED",
  DENIED = "DENIED"
}

export enum MersDiagnosisSource {
  WORLD_ORGANISATION_FOR_ANIMAL_HEALTH = "WORLD_ORGANISATION_FOR_ANIMAL_HEALTH",
  WORLD_HEALTH_ORGANIZATION = "WORLD_HEALTH_ORGANIZATION",
  NATIONAL_AUTHORITIES = "NATIONAL_AUTHORITIES",
  PUBLICATIONS = "PUBLICATIONS",
  MEDIA = "MEDIA",
  FAO_FIELD_OFFICER = "FAO_FIELD_OFFICER"
}

export enum MersEventAnimalType {
  DOMESTIC = "DOMESTIC",
  WILD = "WILD"
}

export enum MersEventAnimalSpecies {
  CAMEL = "CAMEL",
  BAT = "BAT",
  GOAT = "GOAT",
  CATTLE = "CATTLE",
  SHEEP = "SHEEP",
  DONKEY = "DONKEY",
  WATER_BUFFALO = "WATER_BUFFALO",
  BABOON = "BABOON",
}

export enum MersEventType {
  HUMAN = "HUMAN",
  ANIMAL = "ANIMAL"
}

export interface MersEstimateFilterOptionsDocument {
  _id: ObjectId;
  sourceType: string[];
  ageGroup: string[];
  assay: string[];
  specimenType: string[];
  sex: string[];
  isotypes: string[];
  samplingMethod: string[];
  geographicScope: string[];
  animalDetectionSettings: string[];
  animalPurpose: string[];
  animalImportedOrLocal: string[];
  sampleFrame: string[];
  exposureToCamels: string[];
  antigen: string[];
  testProducer: string[];
  testValidation: string[];
  clade: Clade[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SarsCov2CountryDataDocument {
  _id: ObjectId;
  population: number | undefined;
  peopleVaccinatedPerHundred: number | undefined;
  peopleFullyVaccinatedPerHundred: number | undefined;
  positiveCasesPerMillionPeople: number | undefined;
  alphaTwoCode: string;
  alphaThreeCode: string;
  whoRegion: WHORegion | undefined;
  unRegion: UNRegion | undefined;
  gbdSuperRegion: GBDSuperRegion | undefined;
  gbdSubRegion: GBDSubRegion | undefined;
  month: Month;
  year: number;
  partitionKey: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum CachedMapboxApiResponseStatus {
  SUCCESSFUL_RESPONSE = "SUCCESSFUL_RESPONSE",
  FAILED_RESPONSE = "FAILED_RESPONSE",
}

export interface FaoMersEventDocumentBase {
  _id: ObjectId;
  partitionKey: number;
  diagnosisStatus: MersDiagnosisStatus;
  diagnosisSource: MersDiagnosisSource;
  country: string;
  state: string;
  city: string;
  latitude: number;
  longitude: number;
  observationDate: Date | undefined;
  reportDate: Date;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  countryAlphaThreeCode: ThreeLetterIsoCountryCode;
  whoRegion: WHORegion | undefined;
  unRegion: UNRegion | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export type FaoMersAnimalEventDocument = FaoMersEventDocumentBase & {
  type: MersEventType.ANIMAL;
  humansAffected: undefined;
  humanDeaths: undefined;
  animalType: MersEventAnimalType;
  animalSpecies: MersEventAnimalSpecies;
}

export type FaoMersHumanEventDocument = FaoMersEventDocumentBase & {
  type: MersEventType.HUMAN;
  humansAffected: number;
  humanDeaths: number;
  animalType: undefined;
  animalSpecies: undefined;
}

export type FaoMersEventDocument =
  | FaoMersAnimalEventDocument
  | FaoMersHumanEventDocument;

export enum MersMacroSampleFrame {
  'HIGH_RISK_OCCUPATIONALLY_EXPOSED_TO_DROMEDARY_CAMELS' = 'HIGH_RISK_OCCUPATIONALLY_EXPOSED_TO_DROMEDARY_CAMELS',
  'HIGH_RISK_NOT_OCCUPATIONALLY_EXPOSED_TO_DROMEDARY_CAMELS' = 'HIGH_RISK_NOT_OCCUPATIONALLY_EXPOSED_TO_DROMEDARY_CAMELS',
  'GENERAL_POPULATION' = 'GENERAL_POPULATION',
  'UNCATEGORIZED' = 'UNCATEGORIZED'
}

export interface MersMacroSampleFrameDocument {
  _id: ObjectId;
  macroSampleFrame: MersMacroSampleFrame;
  sampleFrames: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FaoYearlyCamelPopulationDataDocument {
  _id: ObjectId;
  partitionKey: number;
  countryAlphaThreeCode: ThreeLetterIsoCountryCode;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  countryName: string;
  whoRegion: WHORegion | undefined;
  unRegion: UNRegion | undefined;
  year: number;
  camelCount: number;
  camelCountPerCapita: number | undefined;
  note: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CachedMapboxApiResponseDocumentBase {
  _id: ObjectId;
  mapboxSearchText: string;
  countryCode: string;
  geocoderDataType: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CachedMapboxApiSuccessResponseDocument extends CachedMapboxApiResponseDocumentBase {
  status: CachedMapboxApiResponseStatus.SUCCESSFUL_RESPONSE,
  centerCoordinates: {
    longitude: number;
    latitude: number;
  };
  boundingBox: {
    longitudeMinimum: number;
    latitudeMinimum: number;
    longitudeMaximum: number;
    latitudeMaximum: number;
  } | undefined;
  text: string | undefined;
  matchingText: string | undefined;
  regionName: string | undefined;
}

interface CachedMapboxApiFailureResponseDocument extends CachedMapboxApiResponseDocumentBase {
  status: CachedMapboxApiResponseStatus.FAILED_RESPONSE,
}

export type CachedMapboxApiResponseDocument = CachedMapboxApiSuccessResponseDocument | CachedMapboxApiFailureResponseDocument;