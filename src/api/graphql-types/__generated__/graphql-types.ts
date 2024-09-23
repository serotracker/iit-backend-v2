import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Affiliation = {
  __typename?: 'Affiliation';
  label: Scalars['String']['output'];
};

export type AnimalMersAgeGroupSubEstimate = MersSubEstimateInterface & {
  __typename?: 'AnimalMersAgeGroupSubEstimate';
  animalAgeGroup: Array<Scalars['String']['output']>;
  animalAgeGroupLabel: Scalars['String']['output'];
  estimateId: Scalars['String']['output'];
  estimateInfo: MersSubEstimateInformation;
  id: Scalars['String']['output'];
};

export type AnimalMersEstimate = MersEstimateInterface & {
  __typename?: 'AnimalMersEstimate';
  animalDetectionSettings: Array<Scalars['String']['output']>;
  animalImportedOrLocal?: Maybe<Scalars['String']['output']>;
  animalPurpose?: Maybe<Scalars['String']['output']>;
  animalSpecies: MersAnimalSpecies;
  animalType: Array<MersAnimalType>;
  assay: Array<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country: Scalars['String']['output'];
  countryAlphaThreeCode: Scalars['String']['output'];
  countryAlphaTwoCode: Scalars['String']['output'];
  estimateId: Scalars['String']['output'];
  firstAuthorFullName: Scalars['String']['output'];
  geographicScope?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  insitutution?: Maybe<Scalars['String']['output']>;
  isotypes: Array<Scalars['String']['output']>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  sampleDenominator?: Maybe<Scalars['Int']['output']>;
  sampleNumerator?: Maybe<Scalars['Int']['output']>;
  samplingEndDate?: Maybe<Scalars['String']['output']>;
  samplingMethod?: Maybe<Scalars['String']['output']>;
  samplingMidDate?: Maybe<Scalars['String']['output']>;
  samplingStartDate?: Maybe<Scalars['String']['output']>;
  sensitivity?: Maybe<Scalars['Float']['output']>;
  sensitivity95CILower?: Maybe<Scalars['Float']['output']>;
  sensitivity95CIUpper?: Maybe<Scalars['Float']['output']>;
  sensitivityDenominator?: Maybe<Scalars['Int']['output']>;
  seroprevalence: Scalars['Float']['output'];
  seroprevalence95CILower?: Maybe<Scalars['Float']['output']>;
  seroprevalence95CIUpper?: Maybe<Scalars['Float']['output']>;
  sex?: Maybe<Scalars['String']['output']>;
  sourceTitle: Scalars['String']['output'];
  sourceType: Scalars['String']['output'];
  sourceUrl: Scalars['String']['output'];
  specificity?: Maybe<Scalars['Float']['output']>;
  specificity95CILower?: Maybe<Scalars['Float']['output']>;
  specificity95CIUpper?: Maybe<Scalars['Float']['output']>;
  specificityDenominator?: Maybe<Scalars['Int']['output']>;
  specimenType?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  studyExclusionCriteria?: Maybe<Scalars['String']['output']>;
  studyInclusionCriteria?: Maybe<Scalars['String']['output']>;
  testProducer: Array<Scalars['String']['output']>;
  testValidation: Array<Scalars['String']['output']>;
  type: MersEstimateType;
  unRegion?: Maybe<UnRegion>;
  whoRegion?: Maybe<WhoRegion>;
};

export type AnimalMersEvent = MersEventInterface & {
  __typename?: 'AnimalMersEvent';
  animalSpecies: MersEventAnimalSpecies;
  animalType: MersEventAnimalType;
  city: Scalars['String']['output'];
  country: CountryIdentifiers;
  diagnosisSource: MersDiagnosisSource;
  diagnosisStatus: MersDiagnosisStatus;
  id: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  observationDate?: Maybe<Scalars['String']['output']>;
  reportDate: Scalars['String']['output'];
  state: Scalars['String']['output'];
  type: MersEventType;
  unRegion?: Maybe<UnRegion>;
  whoRegion?: Maybe<WhoRegion>;
};

export type AnimalMersViralEstimate = MersEstimateInterface & {
  __typename?: 'AnimalMersViralEstimate';
  animalDetectionSettings: Array<Scalars['String']['output']>;
  animalImportedOrLocal?: Maybe<Scalars['String']['output']>;
  animalPurpose?: Maybe<Scalars['String']['output']>;
  animalSpecies: MersAnimalSpecies;
  animalType: Array<MersAnimalType>;
  assay: Array<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country: Scalars['String']['output'];
  countryAlphaThreeCode: Scalars['String']['output'];
  countryAlphaTwoCode: Scalars['String']['output'];
  estimateId: Scalars['String']['output'];
  firstAuthorFullName: Scalars['String']['output'];
  geographicScope?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  insitutution?: Maybe<Scalars['String']['output']>;
  isotypes: Array<Scalars['String']['output']>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  positivePrevalence: Scalars['Float']['output'];
  positivePrevalence95CILower?: Maybe<Scalars['Float']['output']>;
  positivePrevalence95CIUpper?: Maybe<Scalars['Float']['output']>;
  sampleDenominator?: Maybe<Scalars['Int']['output']>;
  sampleNumerator?: Maybe<Scalars['Int']['output']>;
  samplingEndDate?: Maybe<Scalars['String']['output']>;
  samplingMethod?: Maybe<Scalars['String']['output']>;
  samplingMidDate?: Maybe<Scalars['String']['output']>;
  samplingStartDate?: Maybe<Scalars['String']['output']>;
  sensitivity?: Maybe<Scalars['Float']['output']>;
  sensitivity95CILower?: Maybe<Scalars['Float']['output']>;
  sensitivity95CIUpper?: Maybe<Scalars['Float']['output']>;
  sensitivityDenominator?: Maybe<Scalars['Int']['output']>;
  sex?: Maybe<Scalars['String']['output']>;
  sourceTitle: Scalars['String']['output'];
  sourceType: Scalars['String']['output'];
  sourceUrl: Scalars['String']['output'];
  specificity?: Maybe<Scalars['Float']['output']>;
  specificity95CILower?: Maybe<Scalars['Float']['output']>;
  specificity95CIUpper?: Maybe<Scalars['Float']['output']>;
  specificityDenominator?: Maybe<Scalars['Int']['output']>;
  specimenType?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  studyExclusionCriteria?: Maybe<Scalars['String']['output']>;
  studyInclusionCriteria?: Maybe<Scalars['String']['output']>;
  testProducer: Array<Scalars['String']['output']>;
  testValidation: Array<Scalars['String']['output']>;
  type: MersEstimateType;
  unRegion?: Maybe<UnRegion>;
  whoRegion?: Maybe<WhoRegion>;
};

export enum Arbovirus {
  Chikv = 'CHIKV',
  Denv = 'DENV',
  Mayv = 'MAYV',
  Wnv = 'WNV',
  Yf = 'YF',
  Zikv = 'ZIKV'
}

export type ArbovirusDataStatistics = {
  __typename?: 'ArbovirusDataStatistics';
  countryCount: Scalars['Int']['output'];
  estimateCount: Scalars['Int']['output'];
  patricipantCount: Scalars['Int']['output'];
  sourceCount: Scalars['Int']['output'];
};

export type ArbovirusEnvironmentalSuitabilityDataEntry = {
  __typename?: 'ArbovirusEnvironmentalSuitabilityDataEntry';
  countryAlphaThreeCode: Scalars['String']['output'];
  countryAlphaTwoCode: Scalars['String']['output'];
  countryName: Scalars['String']['output'];
  dengue2015Data: ArbovirusEnvironmentalSuitabilityDataSubEntry;
  dengue2050Data: ArbovirusEnvironmentalSuitabilityDataSubEntry;
  id: Scalars['String']['output'];
  zikaData: ArbovirusEnvironmentalSuitabilityDataSubEntry;
};

export type ArbovirusEnvironmentalSuitabilityDataSubEntry = {
  __typename?: 'ArbovirusEnvironmentalSuitabilityDataSubEntry';
  maximumValue: Scalars['Float']['output'];
  meanValue: Scalars['Float']['output'];
  medianValue: Scalars['Float']['output'];
  minimumValue: Scalars['Float']['output'];
  ninetyPercentOfValuesAreBelowThisValue: Scalars['Float']['output'];
  valueRange: Scalars['Float']['output'];
};

export type ArbovirusEstimate = {
  __typename?: 'ArbovirusEstimate';
  ageGroup?: Maybe<Scalars['String']['output']>;
  ageMaximum?: Maybe<Scalars['Int']['output']>;
  ageMinimum?: Maybe<Scalars['Int']['output']>;
  antibodies: Array<Scalars['String']['output']>;
  antigen?: Maybe<Scalars['String']['output']>;
  assay?: Maybe<Scalars['String']['output']>;
  assayOther?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country: Scalars['String']['output'];
  countryAlphaThreeCode: Scalars['String']['output'];
  countryAlphaTwoCode: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  estimateId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  inclusionCriteria?: Maybe<Scalars['String']['output']>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  pathogen: Arbovirus;
  pediatricAgeGroup?: Maybe<Scalars['String']['output']>;
  producer?: Maybe<Scalars['String']['output']>;
  producerOther?: Maybe<Scalars['String']['output']>;
  sameFrameTargetGroup?: Maybe<Scalars['String']['output']>;
  sampleEndDate?: Maybe<Scalars['String']['output']>;
  sampleFrame?: Maybe<Scalars['String']['output']>;
  sampleNumerator?: Maybe<Scalars['Int']['output']>;
  sampleSize: Scalars['Int']['output'];
  sampleStartDate?: Maybe<Scalars['String']['output']>;
  seroprevalence: Scalars['Float']['output'];
  seroprevalenceCalculated95CILower?: Maybe<Scalars['Float']['output']>;
  seroprevalenceCalculated95CIUpper?: Maybe<Scalars['Float']['output']>;
  seroprevalenceStudy95CILower?: Maybe<Scalars['Float']['output']>;
  seroprevalenceStudy95CIUpper?: Maybe<Scalars['Float']['output']>;
  serotype: Array<Scalars['String']['output']>;
  sex?: Maybe<Scalars['String']['output']>;
  sourceSheetId?: Maybe<Scalars['String']['output']>;
  sourceSheetName?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  unRegion?: Maybe<UnRegion>;
  url?: Maybe<Scalars['String']['output']>;
  whoRegion?: Maybe<Scalars['String']['output']>;
};

export type ArbovirusFilterOptions = {
  __typename?: 'ArbovirusFilterOptions';
  ageGroup: Array<Scalars['String']['output']>;
  antibody: Array<Scalars['String']['output']>;
  assay: Array<Scalars['String']['output']>;
  country: Array<Scalars['String']['output']>;
  countryIdentifiers: Array<CountryIdentifiers>;
  pathogen: Array<Scalars['String']['output']>;
  pediatricAgeGroup: Array<Scalars['String']['output']>;
  producer: Array<Scalars['String']['output']>;
  sampleFrame: Array<Scalars['String']['output']>;
  serotype: Array<Scalars['String']['output']>;
  sex: Array<Scalars['String']['output']>;
  unRegion: Array<Scalars['String']['output']>;
  whoRegion: Array<Scalars['String']['output']>;
};

export enum Clade {
  A = 'A',
  B = 'B',
  C = 'C',
  C1 = 'C1',
  C2 = 'C2'
}

export type CountryIdentifiers = {
  __typename?: 'CountryIdentifiers';
  alphaThreeCode: Scalars['String']['output'];
  alphaTwoCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type FaoMersEventFilterOptions = {
  __typename?: 'FaoMersEventFilterOptions';
  animalSpecies: Array<MersEventAnimalSpecies>;
  animalType: Array<MersEventAnimalType>;
  diagnosisSource: Array<MersDiagnosisSource>;
};

export enum GbdSubRegion {
  CentralEuropeEasternEuropeAndCentralAsiaSubregionCentralAsia = 'CENTRAL_EUROPE_EASTERN_EUROPE_AND_CENTRAL_ASIA_SUBREGION_CENTRAL_ASIA',
  CentralEuropeEasternEuropeAndCentralAsiaSubregionCentralEurope = 'CENTRAL_EUROPE_EASTERN_EUROPE_AND_CENTRAL_ASIA_SUBREGION_CENTRAL_EUROPE',
  CentralEuropeEasternEuropeAndCentralAsiaSubregionEasternEurope = 'CENTRAL_EUROPE_EASTERN_EUROPE_AND_CENTRAL_ASIA_SUBREGION_EASTERN_EUROPE',
  HighIncomeSubregionAsiaPacific = 'HIGH_INCOME_SUBREGION_ASIA_PACIFIC',
  HighIncomeSubregionAustralasia = 'HIGH_INCOME_SUBREGION_AUSTRALASIA',
  HighIncomeSubregionNorthAmerica = 'HIGH_INCOME_SUBREGION_NORTH_AMERICA',
  HighIncomeSubregionSouthernLatinAmerica = 'HIGH_INCOME_SUBREGION_SOUTHERN_LATIN_AMERICA',
  HighIncomeSubregionWesternEurope = 'HIGH_INCOME_SUBREGION_WESTERN_EUROPE',
  LatinAmericaAndCaribbeanSubregionAndean = 'LATIN_AMERICA_AND_CARIBBEAN_SUBREGION_ANDEAN',
  LatinAmericaAndCaribbeanSubregionCaribbean = 'LATIN_AMERICA_AND_CARIBBEAN_SUBREGION_CARIBBEAN',
  LatinAmericaAndCaribbeanSubregionCentral = 'LATIN_AMERICA_AND_CARIBBEAN_SUBREGION_CENTRAL',
  LatinAmericaAndCaribbeanSubregionTropical = 'LATIN_AMERICA_AND_CARIBBEAN_SUBREGION_TROPICAL',
  NorthAfricaAndMiddleEastSubregionNorthAfricaAndMiddleEast = 'NORTH_AFRICA_AND_MIDDLE_EAST_SUBREGION_NORTH_AFRICA_AND_MIDDLE_EAST',
  SouthAsiaSubregionSouthAsia = 'SOUTH_ASIA_SUBREGION_SOUTH_ASIA',
  SouthEastAsiaEastAsiaAndOceaniaSubregionEastAsia = 'SOUTH_EAST_ASIA_EAST_ASIA_AND_OCEANIA_SUBREGION_EAST_ASIA',
  SouthEastAsiaEastAsiaAndOceaniaSubregionOceania = 'SOUTH_EAST_ASIA_EAST_ASIA_AND_OCEANIA_SUBREGION_OCEANIA',
  SouthEastAsiaEastAsiaAndOceaniaSubregionSouthEastAsia = 'SOUTH_EAST_ASIA_EAST_ASIA_AND_OCEANIA_SUBREGION_SOUTH_EAST_ASIA',
  SubSaharanAfricaSubregionCentral = 'SUB_SAHARAN_AFRICA_SUBREGION_CENTRAL',
  SubSaharanAfricaSubregionEastern = 'SUB_SAHARAN_AFRICA_SUBREGION_EASTERN',
  SubSaharanAfricaSubregionSouthern = 'SUB_SAHARAN_AFRICA_SUBREGION_SOUTHERN',
  SubSaharanAfricaSubregionWestern = 'SUB_SAHARAN_AFRICA_SUBREGION_WESTERN'
}

export enum GbdSuperRegion {
  CentralEuropeEasternEuropeAndCentralAsia = 'CENTRAL_EUROPE_EASTERN_EUROPE_AND_CENTRAL_ASIA',
  HighIncome = 'HIGH_INCOME',
  LatinAmericaAndCaribbean = 'LATIN_AMERICA_AND_CARIBBEAN',
  NorthAfricaAndMiddleEast = 'NORTH_AFRICA_AND_MIDDLE_EAST',
  SouthAsia = 'SOUTH_ASIA',
  SouthEastAsiaEastAsiaAndOceania = 'SOUTH_EAST_ASIA_EAST_ASIA_AND_OCEANIA',
  SubSaharanAfrica = 'SUB_SAHARAN_AFRICA'
}

export enum GenomeSequenced {
  FullLength = 'FULL_LENGTH',
  PartialNGene = 'PARTIAL_N_GENE',
  PartialSGene = 'PARTIAL_S_GENE'
}

export type HumanMersAgeGroupSubEstimate = MersSubEstimateInterface & {
  __typename?: 'HumanMersAgeGroupSubEstimate';
  ageGroup: Array<Scalars['String']['output']>;
  ageGroupLabel: Scalars['String']['output'];
  estimateId: Scalars['String']['output'];
  estimateInfo: MersSubEstimateInformation;
  id: Scalars['String']['output'];
};

export type HumanMersEstimate = MersEstimateInterface & {
  __typename?: 'HumanMersEstimate';
  ageGroup: Array<Scalars['String']['output']>;
  assay: Array<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country: Scalars['String']['output'];
  countryAlphaThreeCode: Scalars['String']['output'];
  countryAlphaTwoCode: Scalars['String']['output'];
  estimateId: Scalars['String']['output'];
  firstAuthorFullName: Scalars['String']['output'];
  geographicScope?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  insitutution?: Maybe<Scalars['String']['output']>;
  isotypes: Array<Scalars['String']['output']>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  sampleDenominator?: Maybe<Scalars['Int']['output']>;
  sampleFrame?: Maybe<Scalars['String']['output']>;
  sampleNumerator?: Maybe<Scalars['Int']['output']>;
  samplingEndDate?: Maybe<Scalars['String']['output']>;
  samplingMethod?: Maybe<Scalars['String']['output']>;
  samplingMidDate?: Maybe<Scalars['String']['output']>;
  samplingStartDate?: Maybe<Scalars['String']['output']>;
  sensitivity?: Maybe<Scalars['Float']['output']>;
  sensitivity95CILower?: Maybe<Scalars['Float']['output']>;
  sensitivity95CIUpper?: Maybe<Scalars['Float']['output']>;
  sensitivityDenominator?: Maybe<Scalars['Int']['output']>;
  seroprevalence: Scalars['Float']['output'];
  seroprevalence95CILower?: Maybe<Scalars['Float']['output']>;
  seroprevalence95CIUpper?: Maybe<Scalars['Float']['output']>;
  sex?: Maybe<Scalars['String']['output']>;
  sourceTitle: Scalars['String']['output'];
  sourceType: Scalars['String']['output'];
  sourceUrl: Scalars['String']['output'];
  specificity?: Maybe<Scalars['Float']['output']>;
  specificity95CILower?: Maybe<Scalars['Float']['output']>;
  specificity95CIUpper?: Maybe<Scalars['Float']['output']>;
  specificityDenominator?: Maybe<Scalars['Int']['output']>;
  specimenType?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  studyExclusionCriteria?: Maybe<Scalars['String']['output']>;
  studyInclusionCriteria?: Maybe<Scalars['String']['output']>;
  testProducer: Array<Scalars['String']['output']>;
  testValidation: Array<Scalars['String']['output']>;
  type: MersEstimateType;
  unRegion?: Maybe<UnRegion>;
  whoRegion?: Maybe<WhoRegion>;
};

export type HumanMersEvent = MersEventInterface & {
  __typename?: 'HumanMersEvent';
  city: Scalars['String']['output'];
  country: CountryIdentifiers;
  diagnosisSource: MersDiagnosisSource;
  diagnosisStatus: MersDiagnosisStatus;
  humanDeaths: Scalars['Int']['output'];
  humansAffected: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  observationDate?: Maybe<Scalars['String']['output']>;
  reportDate: Scalars['String']['output'];
  state: Scalars['String']['output'];
  type: MersEventType;
  unRegion?: Maybe<UnRegion>;
  whoRegion?: Maybe<WhoRegion>;
};

export type HumanMersViralEstimate = MersEstimateInterface & {
  __typename?: 'HumanMersViralEstimate';
  ageGroup: Array<Scalars['String']['output']>;
  assay: Array<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country: Scalars['String']['output'];
  countryAlphaThreeCode: Scalars['String']['output'];
  countryAlphaTwoCode: Scalars['String']['output'];
  estimateId: Scalars['String']['output'];
  firstAuthorFullName: Scalars['String']['output'];
  geographicScope?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  insitutution?: Maybe<Scalars['String']['output']>;
  isotypes: Array<Scalars['String']['output']>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  positivePrevalence: Scalars['Float']['output'];
  positivePrevalence95CILower?: Maybe<Scalars['Float']['output']>;
  positivePrevalence95CIUpper?: Maybe<Scalars['Float']['output']>;
  sampleDenominator?: Maybe<Scalars['Int']['output']>;
  sampleFrame?: Maybe<Scalars['String']['output']>;
  sampleNumerator?: Maybe<Scalars['Int']['output']>;
  samplingEndDate?: Maybe<Scalars['String']['output']>;
  samplingMethod?: Maybe<Scalars['String']['output']>;
  samplingMidDate?: Maybe<Scalars['String']['output']>;
  samplingStartDate?: Maybe<Scalars['String']['output']>;
  sensitivity?: Maybe<Scalars['Float']['output']>;
  sensitivity95CILower?: Maybe<Scalars['Float']['output']>;
  sensitivity95CIUpper?: Maybe<Scalars['Float']['output']>;
  sensitivityDenominator?: Maybe<Scalars['Int']['output']>;
  sex?: Maybe<Scalars['String']['output']>;
  sourceTitle: Scalars['String']['output'];
  sourceType: Scalars['String']['output'];
  sourceUrl: Scalars['String']['output'];
  specificity?: Maybe<Scalars['Float']['output']>;
  specificity95CILower?: Maybe<Scalars['Float']['output']>;
  specificity95CIUpper?: Maybe<Scalars['Float']['output']>;
  specificityDenominator?: Maybe<Scalars['Int']['output']>;
  specimenType?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  studyExclusionCriteria?: Maybe<Scalars['String']['output']>;
  studyInclusionCriteria?: Maybe<Scalars['String']['output']>;
  testProducer: Array<Scalars['String']['output']>;
  testValidation: Array<Scalars['String']['output']>;
  type: MersEstimateType;
  unRegion?: Maybe<UnRegion>;
  whoRegion?: Maybe<WhoRegion>;
};

export type MersAgeGroupSubEstimate = AnimalMersAgeGroupSubEstimate | HumanMersAgeGroupSubEstimate;

export type MersAnimalSamplingContextSubEstimate = MersSubEstimateInterface & {
  __typename?: 'MersAnimalSamplingContextSubEstimate';
  animalDetectionSettings: Array<Scalars['String']['output']>;
  estimateId: Scalars['String']['output'];
  estimateInfo: MersSubEstimateInformation;
  id: Scalars['String']['output'];
};

export type MersAnimalSourceLocationSubEstimate = MersSubEstimateInterface & {
  __typename?: 'MersAnimalSourceLocationSubEstimate';
  animalCountriesOfImport: Array<CountryIdentifiers>;
  /** @deprecated use animalCountriesOfImport instead */
  animalCountryOfImport: Scalars['String']['output'];
  /** @deprecated use animalCountriesOfImport instead */
  animalCountryOfImportAlphaThreeCode: Scalars['String']['output'];
  /** @deprecated use animalCountriesOfImport instead */
  animalCountryOfImportAlphaTwoCode: Scalars['String']['output'];
  animalImportedOrLocal: Scalars['String']['output'];
  estimateId: Scalars['String']['output'];
  estimateInfo: MersSubEstimateInformation;
  id: Scalars['String']['output'];
};

export enum MersAnimalSpecies {
  Baboon = 'BABOON',
  Bat = 'BAT',
  Camel = 'CAMEL',
  Cattle = 'CATTLE',
  Donkey = 'DONKEY',
  Goat = 'GOAT',
  Sheep = 'SHEEP',
  WaterBuffalo = 'WATER_BUFFALO'
}

export type MersAnimalSpeciesSubEstimate = MersSubEstimateInterface & {
  __typename?: 'MersAnimalSpeciesSubEstimate';
  animalSpecies: MersAnimalSpecies;
  estimateId: Scalars['String']['output'];
  estimateInfo: MersSubEstimateInformation;
  id: Scalars['String']['output'];
};

export enum MersAnimalType {
  Domestic = 'DOMESTIC',
  Wild = 'WILD'
}

export type MersCamelExposureLevelSubEstimate = MersSubEstimateInterface & {
  __typename?: 'MersCamelExposureLevelSubEstimate';
  details: Scalars['String']['output'];
  estimateId: Scalars['String']['output'];
  estimateInfo: MersSubEstimateInformation;
  exposureToCamels: Scalars['String']['output'];
  id: Scalars['String']['output'];
  sampleFrame: Scalars['String']['output'];
};

export enum MersDiagnosisSource {
  FaoFieldOfficer = 'FAO_FIELD_OFFICER',
  Media = 'MEDIA',
  NationalAuthorities = 'NATIONAL_AUTHORITIES',
  Publications = 'PUBLICATIONS',
  WorldHealthOrganization = 'WORLD_HEALTH_ORGANIZATION',
  WorldOrganisationForAnimalHealth = 'WORLD_ORGANISATION_FOR_ANIMAL_HEALTH'
}

export enum MersDiagnosisStatus {
  Confirmed = 'CONFIRMED',
  Denied = 'DENIED'
}

export type MersEstimate = {
  __typename?: 'MersEstimate';
  city?: Maybe<Scalars['String']['output']>;
  country: Scalars['String']['output'];
  countryAlphaThreeCode: Scalars['String']['output'];
  countryAlphaTwoCode: Scalars['String']['output'];
  estimateId: Scalars['String']['output'];
  firstAuthorFullName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  insitutution?: Maybe<Scalars['String']['output']>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  seroprevalence: Scalars['Float']['output'];
  sourceTitle: Scalars['String']['output'];
  sourceType: Scalars['String']['output'];
  sourceUrl: Scalars['String']['output'];
  state?: Maybe<Scalars['String']['output']>;
  unRegion?: Maybe<UnRegion>;
  whoRegion?: Maybe<WhoRegion>;
};

export type MersEstimateFilterOptions = {
  __typename?: 'MersEstimateFilterOptions';
  ageGroup: Array<Scalars['String']['output']>;
  animalDetectionSettings: Array<Scalars['String']['output']>;
  animalImportedOrLocal: Array<Scalars['String']['output']>;
  animalPurpose: Array<Scalars['String']['output']>;
  antigen: Array<Scalars['String']['output']>;
  assay: Array<Scalars['String']['output']>;
  clade: Array<Clade>;
  exposureToCamels: Array<Scalars['String']['output']>;
  geographicScope: Array<Scalars['String']['output']>;
  isotypes: Array<Scalars['String']['output']>;
  sampleFrame: Array<Scalars['String']['output']>;
  samplingMethod: Array<Scalars['String']['output']>;
  sex: Array<Scalars['String']['output']>;
  sourceType: Array<Scalars['String']['output']>;
  specimenType: Array<Scalars['String']['output']>;
  testProducer: Array<Scalars['String']['output']>;
  testValidation: Array<Scalars['String']['output']>;
};

export type MersEstimateInterface = {
  assay: Array<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country: Scalars['String']['output'];
  countryAlphaThreeCode: Scalars['String']['output'];
  countryAlphaTwoCode: Scalars['String']['output'];
  estimateId: Scalars['String']['output'];
  firstAuthorFullName: Scalars['String']['output'];
  geographicScope?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  insitutution?: Maybe<Scalars['String']['output']>;
  isotypes: Array<Scalars['String']['output']>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  sampleDenominator?: Maybe<Scalars['Int']['output']>;
  sampleNumerator?: Maybe<Scalars['Int']['output']>;
  samplingEndDate?: Maybe<Scalars['String']['output']>;
  samplingMethod?: Maybe<Scalars['String']['output']>;
  samplingMidDate?: Maybe<Scalars['String']['output']>;
  samplingStartDate?: Maybe<Scalars['String']['output']>;
  sensitivity?: Maybe<Scalars['Float']['output']>;
  sensitivity95CILower?: Maybe<Scalars['Float']['output']>;
  sensitivity95CIUpper?: Maybe<Scalars['Float']['output']>;
  sensitivityDenominator?: Maybe<Scalars['Int']['output']>;
  sex?: Maybe<Scalars['String']['output']>;
  sourceTitle: Scalars['String']['output'];
  sourceType: Scalars['String']['output'];
  sourceUrl: Scalars['String']['output'];
  specificity?: Maybe<Scalars['Float']['output']>;
  specificity95CILower?: Maybe<Scalars['Float']['output']>;
  specificity95CIUpper?: Maybe<Scalars['Float']['output']>;
  specificityDenominator?: Maybe<Scalars['Int']['output']>;
  specimenType?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  studyExclusionCriteria?: Maybe<Scalars['String']['output']>;
  studyInclusionCriteria?: Maybe<Scalars['String']['output']>;
  testProducer: Array<Scalars['String']['output']>;
  testValidation: Array<Scalars['String']['output']>;
  type: MersEstimateType;
  unRegion?: Maybe<UnRegion>;
  whoRegion?: Maybe<WhoRegion>;
};

export enum MersEstimateType {
  AnimalSeroprevalence = 'ANIMAL_SEROPREVALENCE',
  AnimalViral = 'ANIMAL_VIRAL',
  HumanSeroprevalence = 'HUMAN_SEROPREVALENCE',
  HumanViral = 'HUMAN_VIRAL'
}

export type MersEstimate_V2 = AnimalMersEstimate | AnimalMersViralEstimate | HumanMersEstimate | HumanMersViralEstimate;

export type MersEvent = AnimalMersEvent | HumanMersEvent;

export enum MersEventAnimalSpecies {
  Baboon = 'BABOON',
  Bat = 'BAT',
  Camel = 'CAMEL',
  Cattle = 'CATTLE',
  Donkey = 'DONKEY',
  Goat = 'GOAT',
  Sheep = 'SHEEP',
  WaterBuffalo = 'WATER_BUFFALO'
}

export enum MersEventAnimalType {
  Domestic = 'DOMESTIC',
  Wild = 'WILD'
}

export type MersEventInterface = {
  city: Scalars['String']['output'];
  country: CountryIdentifiers;
  diagnosisSource: MersDiagnosisSource;
  diagnosisStatus: MersDiagnosisStatus;
  id: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  observationDate?: Maybe<Scalars['String']['output']>;
  reportDate: Scalars['String']['output'];
  state: Scalars['String']['output'];
  type: MersEventType;
  unRegion?: Maybe<UnRegion>;
  whoRegion?: Maybe<WhoRegion>;
};

export enum MersEventType {
  Animal = 'ANIMAL',
  Human = 'HUMAN'
}

export type MersFilterOptions = {
  __typename?: 'MersFilterOptions';
  countryIdentifiers: Array<CountryIdentifiers>;
  unRegion: Array<UnRegion>;
  whoRegion: Array<WhoRegion>;
};

export type MersGeographicalAreaSubEstimate = MersSubEstimateInterface & {
  __typename?: 'MersGeographicalAreaSubEstimate';
  city?: Maybe<Scalars['String']['output']>;
  country: Scalars['String']['output'];
  countryAlphaThreeCode: Scalars['String']['output'];
  countryAlphaTwoCode: Scalars['String']['output'];
  district?: Maybe<Scalars['String']['output']>;
  estimateId: Scalars['String']['output'];
  estimateInfo: MersSubEstimateInformation;
  geographicScope?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  state?: Maybe<Scalars['String']['output']>;
  unRegion?: Maybe<UnRegion>;
  whoRegion?: Maybe<WhoRegion>;
};

export type MersHumanCountriesOfTravelSubEstimate = MersSubEstimateInterface & {
  __typename?: 'MersHumanCountriesOfTravelSubEstimate';
  estimateId: Scalars['String']['output'];
  estimateInfo: MersSubEstimateInformation;
  humanCountriesOfTravel: Array<CountryIdentifiers>;
  id: Scalars['String']['output'];
};

export type MersMacroSampleFrame = {
  __typename?: 'MersMacroSampleFrame';
  id: Scalars['String']['output'];
  macroSampleFrame: MersMacroSampleFrameType;
  sampleFrames: Array<Scalars['String']['output']>;
};

export enum MersMacroSampleFrameType {
  GeneralPopulation = 'GENERAL_POPULATION',
  HighRiskNotOccupationallyExposedToDromedaryCamels = 'HIGH_RISK_NOT_OCCUPATIONALLY_EXPOSED_TO_DROMEDARY_CAMELS',
  HighRiskOccupationallyExposedToDromedaryCamels = 'HIGH_RISK_OCCUPATIONALLY_EXPOSED_TO_DROMEDARY_CAMELS',
  Uncategorized = 'UNCATEGORIZED'
}

export type MersNomadismSubEstimate = MersSubEstimateInterface & {
  __typename?: 'MersNomadismSubEstimate';
  details: Scalars['String']['output'];
  estimateId: Scalars['String']['output'];
  estimateInfo: MersSubEstimateInformation;
  id: Scalars['String']['output'];
};

export type MersOccupationSubEstimate = MersSubEstimateInterface & {
  __typename?: 'MersOccupationSubEstimate';
  estimateId: Scalars['String']['output'];
  estimateInfo: MersSubEstimateInformation;
  exposureToCamels?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  occupation: Scalars['String']['output'];
  sampleFrame?: Maybe<Scalars['String']['output']>;
};

export type MersPrimaryEstimate = {
  __typename?: 'MersPrimaryEstimate';
  ageGroupSubestimates: Array<MersAgeGroupSubEstimate>;
  animalSamplingContextSubestimates: Array<MersAnimalSamplingContextSubEstimate>;
  animalSourceLocationSubestimates: Array<MersAnimalSourceLocationSubEstimate>;
  animalSpeciesSubestimates: Array<MersAnimalSpeciesSubEstimate>;
  camelExposureLevelSubestimates: Array<MersCamelExposureLevelSubEstimate>;
  estimateId: Scalars['String']['output'];
  geographicalAreaSubestimates: Array<MersGeographicalAreaSubEstimate>;
  humanCountriesOfTravelSubestimates: Array<MersHumanCountriesOfTravelSubEstimate>;
  id: Scalars['String']['output'];
  nomadismSubestimates: Array<MersNomadismSubEstimate>;
  occupationSubestimates: Array<MersOccupationSubEstimate>;
  primaryEstimateInfo: PrimaryMersEstimateInformation;
  sampleTypeSubestimates: Array<MersSampleTypeSubEstimate>;
  sexSubestimates: Array<MersSexSubEstimate>;
  testUsedSubestimates: Array<MersTestUsedSubEstimate>;
  timeFrameSubestimates: Array<MersTimeFrameSubEstimate>;
};

export type MersSampleTypeSubEstimate = MersSubEstimateInterface & {
  __typename?: 'MersSampleTypeSubEstimate';
  estimateId: Scalars['String']['output'];
  estimateInfo: MersSubEstimateInformation;
  id: Scalars['String']['output'];
  specimenType: Array<Scalars['String']['output']>;
};

export type MersSeroprevalenceSubEstimateInformation = MersSubEstimateInformationInterface & {
  __typename?: 'MersSeroprevalenceSubEstimateInformation';
  sampleDenominator?: Maybe<Scalars['Int']['output']>;
  sampleNumerator?: Maybe<Scalars['Int']['output']>;
  seroprevalence: Scalars['Float']['output'];
  seroprevalence95CILower?: Maybe<Scalars['Float']['output']>;
  seroprevalence95CIUpper?: Maybe<Scalars['Float']['output']>;
  seroprevalenceCalculated95CILower: Scalars['Float']['output'];
  seroprevalenceCalculated95CIUpper: Scalars['Float']['output'];
};

export type MersSexSubEstimate = MersSubEstimateInterface & {
  __typename?: 'MersSexSubEstimate';
  estimateId: Scalars['String']['output'];
  estimateInfo: MersSubEstimateInformation;
  id: Scalars['String']['output'];
  sex: Scalars['String']['output'];
};

export type MersSubEstimateInformation = MersSeroprevalenceSubEstimateInformation | MersViralSubEstimateInformation;

export type MersSubEstimateInformationInterface = {
  sampleDenominator?: Maybe<Scalars['Int']['output']>;
  sampleNumerator?: Maybe<Scalars['Int']['output']>;
};

export type MersSubEstimateInterface = {
  estimateId: Scalars['String']['output'];
  estimateInfo: MersSubEstimateInformation;
  id: Scalars['String']['output'];
};

export type MersTestUsedSubEstimate = MersSubEstimateInterface & {
  __typename?: 'MersTestUsedSubEstimate';
  assay: Array<Scalars['String']['output']>;
  estimateId: Scalars['String']['output'];
  estimateInfo: MersSubEstimateInformation;
  id: Scalars['String']['output'];
};

export type MersTimeFrameSubEstimate = MersSubEstimateInterface & {
  __typename?: 'MersTimeFrameSubEstimate';
  estimateId: Scalars['String']['output'];
  estimateInfo: MersSubEstimateInformation;
  id: Scalars['String']['output'];
  samplingEndDate: Scalars['String']['output'];
  samplingStartDate: Scalars['String']['output'];
};

export type MersViralSubEstimateInformation = MersSubEstimateInformationInterface & {
  __typename?: 'MersViralSubEstimateInformation';
  positivePrevalence: Scalars['Float']['output'];
  positivePrevalence95CILower?: Maybe<Scalars['Float']['output']>;
  positivePrevalence95CIUpper?: Maybe<Scalars['Float']['output']>;
  positivePrevalenceCalculated95CILower: Scalars['Float']['output'];
  positivePrevalenceCalculated95CIUpper: Scalars['Float']['output'];
  sampleDenominator?: Maybe<Scalars['Int']['output']>;
  sampleNumerator?: Maybe<Scalars['Int']['output']>;
};

export enum Month {
  April = 'APRIL',
  August = 'AUGUST',
  December = 'DECEMBER',
  February = 'FEBRUARY',
  January = 'JANUARY',
  July = 'JULY',
  June = 'JUNE',
  March = 'MARCH',
  May = 'MAY',
  November = 'NOVEMBER',
  October = 'OCTOBER',
  September = 'SEPTEMBER'
}

export type MonthlySarsCov2CountryInformationEntry = {
  __typename?: 'MonthlySarsCov2CountryInformationEntry';
  alphaThreeCode: Scalars['String']['output'];
  alphaTwoCode: Scalars['String']['output'];
  gbdSubRegion?: Maybe<GbdSubRegion>;
  gbdSuperRegion?: Maybe<GbdSuperRegion>;
  month: Month;
  peopleFullyVaccinatedPerHundred?: Maybe<Scalars['Float']['output']>;
  peopleVaccinatedPerHundred?: Maybe<Scalars['Float']['output']>;
  population?: Maybe<Scalars['Int']['output']>;
  positiveCasesPerMillionPeople?: Maybe<Scalars['Float']['output']>;
  unRegion?: Maybe<UnRegion>;
  whoRegion?: Maybe<WhoRegion>;
  year: Scalars['Int']['output'];
};

export type PartitionedFaoMersEventsInput = {
  partitionKey: Scalars['Int']['input'];
};

export type PartitionedFeoMersEventsOutput = {
  __typename?: 'PartitionedFeoMersEventsOutput';
  mersEvents: Array<MersEvent>;
  partitionKey: Scalars['Int']['output'];
};

export type PartitionedMonthlySarsCov2CountryInformationInput = {
  partitionKey: Scalars['Int']['input'];
};

export type PartitionedMonthlySarsCov2CountryInformationOutput = {
  __typename?: 'PartitionedMonthlySarsCov2CountryInformationOutput';
  monthlySarsCov2CountryInformation: Array<MonthlySarsCov2CountryInformationEntry>;
  partitionKey: Scalars['Int']['output'];
};

export type PartitionedSarsCov2EstimatesInput = {
  partitionKey: Scalars['Int']['input'];
};

export type PartitionedSarsCov2EstimatesOutput = {
  __typename?: 'PartitionedSarsCov2EstimatesOutput';
  partitionKey: Scalars['Int']['output'];
  sarsCov2Estimates: Array<SarsCov2Estimate>;
};

export type PartitionedYearlyFaoCamelPopulationDataInput = {
  partitionKey: Scalars['Int']['input'];
};

export type PartitionedYearlyFaoCamelPopulationDataOutput = {
  __typename?: 'PartitionedYearlyFaoCamelPopulationDataOutput';
  partitionKey: Scalars['Int']['output'];
  yearlyFaoCamelPopulationData: Array<YearlyFaoCamelPopulationDataEntry>;
};

export type PrimaryAnimalMersSeroprevalenceEstimateInformation = PrimaryMersEstimateInformationInterface & {
  __typename?: 'PrimaryAnimalMersSeroprevalenceEstimateInformation';
  accessionNumbers?: Maybe<Scalars['String']['output']>;
  animalAgeGroup: Array<Scalars['String']['output']>;
  animalCountriesOfImport: Array<CountryIdentifiers>;
  animalDetectionSettings: Array<Scalars['String']['output']>;
  animalImportedOrLocal?: Maybe<Scalars['String']['output']>;
  animalPurpose?: Maybe<Scalars['String']['output']>;
  animalSpecies: MersAnimalSpecies;
  animalType: Array<MersAnimalType>;
  antigen: Array<Scalars['String']['output']>;
  assay: Array<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  clade: Array<Clade>;
  country: Scalars['String']['output'];
  countryAlphaThreeCode: Scalars['String']['output'];
  countryAlphaTwoCode: Scalars['String']['output'];
  district?: Maybe<Scalars['String']['output']>;
  estimateId: Scalars['String']['output'];
  exposureToCamels?: Maybe<Scalars['String']['output']>;
  firstAuthorFullName: Scalars['String']['output'];
  genomeSequenced: Array<GenomeSequenced>;
  geographicScope?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  insitutution?: Maybe<Scalars['String']['output']>;
  isotypes: Array<Scalars['String']['output']>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  positiveCutoff?: Maybe<Scalars['String']['output']>;
  sampleDenominator?: Maybe<Scalars['Int']['output']>;
  sampleNumerator?: Maybe<Scalars['Int']['output']>;
  samplingEndDate?: Maybe<Scalars['String']['output']>;
  samplingMethod?: Maybe<Scalars['String']['output']>;
  samplingMidDate?: Maybe<Scalars['String']['output']>;
  samplingStartDate?: Maybe<Scalars['String']['output']>;
  sensitivity?: Maybe<Scalars['Float']['output']>;
  sensitivity95CILower?: Maybe<Scalars['Float']['output']>;
  sensitivity95CIUpper?: Maybe<Scalars['Float']['output']>;
  sensitivityDenominator?: Maybe<Scalars['Int']['output']>;
  sequencingDone: Scalars['Boolean']['output'];
  seroprevalence: Scalars['Float']['output'];
  seroprevalence95CILower?: Maybe<Scalars['Float']['output']>;
  seroprevalence95CIUpper?: Maybe<Scalars['Float']['output']>;
  seroprevalenceCalculated95CILower: Scalars['Float']['output'];
  seroprevalenceCalculated95CIUpper: Scalars['Float']['output'];
  sex?: Maybe<Scalars['String']['output']>;
  socioeconomicStatus?: Maybe<Scalars['String']['output']>;
  sourcePublicationYear: Scalars['Int']['output'];
  sourceTitle: Scalars['String']['output'];
  sourceType: Scalars['String']['output'];
  sourceUrl: Scalars['String']['output'];
  specificity?: Maybe<Scalars['Float']['output']>;
  specificity95CILower?: Maybe<Scalars['Float']['output']>;
  specificity95CIUpper?: Maybe<Scalars['Float']['output']>;
  specificityDenominator?: Maybe<Scalars['Int']['output']>;
  specimenType: Array<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  studyExclusionCriteria?: Maybe<Scalars['String']['output']>;
  studyInclusionCriteria?: Maybe<Scalars['String']['output']>;
  symptomDefinition?: Maybe<Scalars['String']['output']>;
  symptomPrevalenceOfPositives?: Maybe<Scalars['Float']['output']>;
  testProducer: Array<Scalars['String']['output']>;
  testProducerOther?: Maybe<Scalars['String']['output']>;
  testValidatedOn?: Maybe<Scalars['String']['output']>;
  testValidation: Array<Scalars['String']['output']>;
  type: MersEstimateType;
  unRegion?: Maybe<UnRegion>;
  whoRegion?: Maybe<WhoRegion>;
};

export type PrimaryAnimalMersViralEstimateInformation = PrimaryMersEstimateInformationInterface & {
  __typename?: 'PrimaryAnimalMersViralEstimateInformation';
  accessionNumbers?: Maybe<Scalars['String']['output']>;
  animalAgeGroup: Array<Scalars['String']['output']>;
  animalCountriesOfImport: Array<CountryIdentifiers>;
  animalDetectionSettings: Array<Scalars['String']['output']>;
  animalImportedOrLocal?: Maybe<Scalars['String']['output']>;
  animalPurpose?: Maybe<Scalars['String']['output']>;
  animalSpecies: MersAnimalSpecies;
  animalType: Array<MersAnimalType>;
  antigen: Array<Scalars['String']['output']>;
  assay: Array<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  clade: Array<Clade>;
  country: Scalars['String']['output'];
  countryAlphaThreeCode: Scalars['String']['output'];
  countryAlphaTwoCode: Scalars['String']['output'];
  district?: Maybe<Scalars['String']['output']>;
  estimateId: Scalars['String']['output'];
  exposureToCamels?: Maybe<Scalars['String']['output']>;
  firstAuthorFullName: Scalars['String']['output'];
  genomeSequenced: Array<GenomeSequenced>;
  geographicScope?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  insitutution?: Maybe<Scalars['String']['output']>;
  isotypes: Array<Scalars['String']['output']>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  positiveCutoff?: Maybe<Scalars['String']['output']>;
  positivePrevalence: Scalars['Float']['output'];
  positivePrevalence95CILower?: Maybe<Scalars['Float']['output']>;
  positivePrevalence95CIUpper?: Maybe<Scalars['Float']['output']>;
  positivePrevalenceCalculated95CILower: Scalars['Float']['output'];
  positivePrevalenceCalculated95CIUpper: Scalars['Float']['output'];
  sampleDenominator?: Maybe<Scalars['Int']['output']>;
  sampleNumerator?: Maybe<Scalars['Int']['output']>;
  samplingEndDate?: Maybe<Scalars['String']['output']>;
  samplingMethod?: Maybe<Scalars['String']['output']>;
  samplingMidDate?: Maybe<Scalars['String']['output']>;
  samplingStartDate?: Maybe<Scalars['String']['output']>;
  sensitivity?: Maybe<Scalars['Float']['output']>;
  sensitivity95CILower?: Maybe<Scalars['Float']['output']>;
  sensitivity95CIUpper?: Maybe<Scalars['Float']['output']>;
  sensitivityDenominator?: Maybe<Scalars['Int']['output']>;
  sequencingDone: Scalars['Boolean']['output'];
  sex?: Maybe<Scalars['String']['output']>;
  socioeconomicStatus?: Maybe<Scalars['String']['output']>;
  sourcePublicationYear: Scalars['Int']['output'];
  sourceTitle: Scalars['String']['output'];
  sourceType: Scalars['String']['output'];
  sourceUrl: Scalars['String']['output'];
  specificity?: Maybe<Scalars['Float']['output']>;
  specificity95CILower?: Maybe<Scalars['Float']['output']>;
  specificity95CIUpper?: Maybe<Scalars['Float']['output']>;
  specificityDenominator?: Maybe<Scalars['Int']['output']>;
  specimenType: Array<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  studyExclusionCriteria?: Maybe<Scalars['String']['output']>;
  studyInclusionCriteria?: Maybe<Scalars['String']['output']>;
  symptomDefinition?: Maybe<Scalars['String']['output']>;
  symptomPrevalenceOfPositives?: Maybe<Scalars['Float']['output']>;
  testProducer: Array<Scalars['String']['output']>;
  testProducerOther?: Maybe<Scalars['String']['output']>;
  testValidatedOn?: Maybe<Scalars['String']['output']>;
  testValidation: Array<Scalars['String']['output']>;
  type: MersEstimateType;
  unRegion?: Maybe<UnRegion>;
  whoRegion?: Maybe<WhoRegion>;
};

export type PrimaryHumanMersSeroprevalenceEstimateInformation = PrimaryMersEstimateInformationInterface & {
  __typename?: 'PrimaryHumanMersSeroprevalenceEstimateInformation';
  accessionNumbers?: Maybe<Scalars['String']['output']>;
  ageGroup: Array<Scalars['String']['output']>;
  antigen: Array<Scalars['String']['output']>;
  assay: Array<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  clade: Array<Clade>;
  country: Scalars['String']['output'];
  countryAlphaThreeCode: Scalars['String']['output'];
  countryAlphaTwoCode: Scalars['String']['output'];
  district?: Maybe<Scalars['String']['output']>;
  estimateId: Scalars['String']['output'];
  exposureToCamels?: Maybe<Scalars['String']['output']>;
  firstAuthorFullName: Scalars['String']['output'];
  genomeSequenced: Array<GenomeSequenced>;
  geographicScope?: Maybe<Scalars['String']['output']>;
  humanCountriesOfTravel: Array<CountryIdentifiers>;
  id: Scalars['String']['output'];
  insitutution?: Maybe<Scalars['String']['output']>;
  isotypes: Array<Scalars['String']['output']>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  positiveCutoff?: Maybe<Scalars['String']['output']>;
  sampleDenominator?: Maybe<Scalars['Int']['output']>;
  sampleFrame?: Maybe<Scalars['String']['output']>;
  sampleNumerator?: Maybe<Scalars['Int']['output']>;
  samplingEndDate?: Maybe<Scalars['String']['output']>;
  samplingMethod?: Maybe<Scalars['String']['output']>;
  samplingMidDate?: Maybe<Scalars['String']['output']>;
  samplingStartDate?: Maybe<Scalars['String']['output']>;
  sensitivity?: Maybe<Scalars['Float']['output']>;
  sensitivity95CILower?: Maybe<Scalars['Float']['output']>;
  sensitivity95CIUpper?: Maybe<Scalars['Float']['output']>;
  sensitivityDenominator?: Maybe<Scalars['Int']['output']>;
  sequencingDone: Scalars['Boolean']['output'];
  seroprevalence: Scalars['Float']['output'];
  seroprevalence95CILower?: Maybe<Scalars['Float']['output']>;
  seroprevalence95CIUpper?: Maybe<Scalars['Float']['output']>;
  seroprevalenceCalculated95CILower: Scalars['Float']['output'];
  seroprevalenceCalculated95CIUpper: Scalars['Float']['output'];
  sex?: Maybe<Scalars['String']['output']>;
  socioeconomicStatus?: Maybe<Scalars['String']['output']>;
  sourcePublicationYear: Scalars['Int']['output'];
  sourceTitle: Scalars['String']['output'];
  sourceType: Scalars['String']['output'];
  sourceUrl: Scalars['String']['output'];
  specificity?: Maybe<Scalars['Float']['output']>;
  specificity95CILower?: Maybe<Scalars['Float']['output']>;
  specificity95CIUpper?: Maybe<Scalars['Float']['output']>;
  specificityDenominator?: Maybe<Scalars['Int']['output']>;
  specimenType: Array<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  studyExclusionCriteria?: Maybe<Scalars['String']['output']>;
  studyInclusionCriteria?: Maybe<Scalars['String']['output']>;
  symptomDefinition?: Maybe<Scalars['String']['output']>;
  symptomPrevalenceOfPositives?: Maybe<Scalars['Float']['output']>;
  testProducer: Array<Scalars['String']['output']>;
  testProducerOther?: Maybe<Scalars['String']['output']>;
  testValidatedOn?: Maybe<Scalars['String']['output']>;
  testValidation: Array<Scalars['String']['output']>;
  type: MersEstimateType;
  unRegion?: Maybe<UnRegion>;
  whoRegion?: Maybe<WhoRegion>;
};

export type PrimaryHumanMersViralEstimateInformation = PrimaryMersEstimateInformationInterface & {
  __typename?: 'PrimaryHumanMersViralEstimateInformation';
  accessionNumbers?: Maybe<Scalars['String']['output']>;
  ageGroup: Array<Scalars['String']['output']>;
  antigen: Array<Scalars['String']['output']>;
  assay: Array<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  clade: Array<Clade>;
  country: Scalars['String']['output'];
  countryAlphaThreeCode: Scalars['String']['output'];
  countryAlphaTwoCode: Scalars['String']['output'];
  district?: Maybe<Scalars['String']['output']>;
  estimateId: Scalars['String']['output'];
  exposureToCamels?: Maybe<Scalars['String']['output']>;
  firstAuthorFullName: Scalars['String']['output'];
  genomeSequenced: Array<GenomeSequenced>;
  geographicScope?: Maybe<Scalars['String']['output']>;
  humanCountriesOfTravel: Array<CountryIdentifiers>;
  id: Scalars['String']['output'];
  insitutution?: Maybe<Scalars['String']['output']>;
  isotypes: Array<Scalars['String']['output']>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  positiveCutoff?: Maybe<Scalars['String']['output']>;
  positivePrevalence: Scalars['Float']['output'];
  positivePrevalence95CILower?: Maybe<Scalars['Float']['output']>;
  positivePrevalence95CIUpper?: Maybe<Scalars['Float']['output']>;
  positivePrevalenceCalculated95CILower: Scalars['Float']['output'];
  positivePrevalenceCalculated95CIUpper: Scalars['Float']['output'];
  sampleDenominator?: Maybe<Scalars['Int']['output']>;
  sampleFrame?: Maybe<Scalars['String']['output']>;
  sampleNumerator?: Maybe<Scalars['Int']['output']>;
  samplingEndDate?: Maybe<Scalars['String']['output']>;
  samplingMethod?: Maybe<Scalars['String']['output']>;
  samplingMidDate?: Maybe<Scalars['String']['output']>;
  samplingStartDate?: Maybe<Scalars['String']['output']>;
  sensitivity?: Maybe<Scalars['Float']['output']>;
  sensitivity95CILower?: Maybe<Scalars['Float']['output']>;
  sensitivity95CIUpper?: Maybe<Scalars['Float']['output']>;
  sensitivityDenominator?: Maybe<Scalars['Int']['output']>;
  sequencingDone: Scalars['Boolean']['output'];
  sex?: Maybe<Scalars['String']['output']>;
  socioeconomicStatus?: Maybe<Scalars['String']['output']>;
  sourcePublicationYear: Scalars['Int']['output'];
  sourceTitle: Scalars['String']['output'];
  sourceType: Scalars['String']['output'];
  sourceUrl: Scalars['String']['output'];
  specificity?: Maybe<Scalars['Float']['output']>;
  specificity95CILower?: Maybe<Scalars['Float']['output']>;
  specificity95CIUpper?: Maybe<Scalars['Float']['output']>;
  specificityDenominator?: Maybe<Scalars['Int']['output']>;
  specimenType: Array<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  studyExclusionCriteria?: Maybe<Scalars['String']['output']>;
  studyInclusionCriteria?: Maybe<Scalars['String']['output']>;
  symptomDefinition?: Maybe<Scalars['String']['output']>;
  symptomPrevalenceOfPositives?: Maybe<Scalars['Float']['output']>;
  testProducer: Array<Scalars['String']['output']>;
  testProducerOther?: Maybe<Scalars['String']['output']>;
  testValidatedOn?: Maybe<Scalars['String']['output']>;
  testValidation: Array<Scalars['String']['output']>;
  type: MersEstimateType;
  unRegion?: Maybe<UnRegion>;
  whoRegion?: Maybe<WhoRegion>;
};

export type PrimaryMersEstimateInformation = PrimaryAnimalMersSeroprevalenceEstimateInformation | PrimaryAnimalMersViralEstimateInformation | PrimaryHumanMersSeroprevalenceEstimateInformation | PrimaryHumanMersViralEstimateInformation;

export type PrimaryMersEstimateInformationInterface = {
  accessionNumbers?: Maybe<Scalars['String']['output']>;
  antigen: Array<Scalars['String']['output']>;
  assay: Array<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  clade: Array<Clade>;
  country: Scalars['String']['output'];
  countryAlphaThreeCode: Scalars['String']['output'];
  countryAlphaTwoCode: Scalars['String']['output'];
  district?: Maybe<Scalars['String']['output']>;
  estimateId: Scalars['String']['output'];
  exposureToCamels?: Maybe<Scalars['String']['output']>;
  firstAuthorFullName: Scalars['String']['output'];
  genomeSequenced: Array<GenomeSequenced>;
  geographicScope?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  insitutution?: Maybe<Scalars['String']['output']>;
  isotypes: Array<Scalars['String']['output']>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  positiveCutoff?: Maybe<Scalars['String']['output']>;
  sampleDenominator?: Maybe<Scalars['Int']['output']>;
  sampleNumerator?: Maybe<Scalars['Int']['output']>;
  samplingEndDate?: Maybe<Scalars['String']['output']>;
  samplingMethod?: Maybe<Scalars['String']['output']>;
  samplingMidDate?: Maybe<Scalars['String']['output']>;
  samplingStartDate?: Maybe<Scalars['String']['output']>;
  sensitivity?: Maybe<Scalars['Float']['output']>;
  sensitivity95CILower?: Maybe<Scalars['Float']['output']>;
  sensitivity95CIUpper?: Maybe<Scalars['Float']['output']>;
  sensitivityDenominator?: Maybe<Scalars['Int']['output']>;
  sequencingDone: Scalars['Boolean']['output'];
  sex?: Maybe<Scalars['String']['output']>;
  socioeconomicStatus?: Maybe<Scalars['String']['output']>;
  sourcePublicationYear: Scalars['Int']['output'];
  sourceTitle: Scalars['String']['output'];
  sourceType: Scalars['String']['output'];
  sourceUrl: Scalars['String']['output'];
  specificity?: Maybe<Scalars['Float']['output']>;
  specificity95CILower?: Maybe<Scalars['Float']['output']>;
  specificity95CIUpper?: Maybe<Scalars['Float']['output']>;
  specificityDenominator?: Maybe<Scalars['Int']['output']>;
  specimenType: Array<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  studyExclusionCriteria?: Maybe<Scalars['String']['output']>;
  studyInclusionCriteria?: Maybe<Scalars['String']['output']>;
  symptomDefinition?: Maybe<Scalars['String']['output']>;
  symptomPrevalenceOfPositives?: Maybe<Scalars['Float']['output']>;
  testProducer: Array<Scalars['String']['output']>;
  testProducerOther?: Maybe<Scalars['String']['output']>;
  testValidatedOn?: Maybe<Scalars['String']['output']>;
  testValidation: Array<Scalars['String']['output']>;
  type: MersEstimateType;
  unRegion?: Maybe<UnRegion>;
  whoRegion?: Maybe<WhoRegion>;
};

export type Query = {
  __typename?: 'Query';
  allFaoMersEventPartitionKeys: Array<Scalars['Int']['output']>;
  allMonthlySarsCov2CountryInformationPartitionKeys: Array<Scalars['Int']['output']>;
  allSarsCov2EstimatePartitionKeys: Array<Scalars['Int']['output']>;
  arbovirusDataStatistics: ArbovirusDataStatistics;
  arbovirusEnviromentalSuitabilityData: Array<ArbovirusEnvironmentalSuitabilityDataEntry>;
  arbovirusEstimates: Array<ArbovirusEstimate>;
  arbovirusFilterOptions: ArbovirusFilterOptions;
  faoMersEventFilterOptions: FaoMersEventFilterOptions;
  groupedTeamMembers: Array<TeamMemberGroup>;
  mersEstimates: Array<MersEstimate>;
  mersEstimatesFilterOptions: MersEstimateFilterOptions;
  mersEstimates_V2: Array<MersEstimate_V2>;
  mersFilterOptions: MersFilterOptions;
  mersMacroSampleFrames: Array<MersMacroSampleFrame>;
  mersPrimaryEstimates: Array<MersPrimaryEstimate>;
  monthlySarsCov2CountryInformation: Array<MonthlySarsCov2CountryInformationEntry>;
  partitionedFaoMersEvents: PartitionedFeoMersEventsOutput;
  partitionedMonthlySarsCov2CountryInformation: PartitionedMonthlySarsCov2CountryInformationOutput;
  partitionedSarsCov2Estimates: PartitionedSarsCov2EstimatesOutput;
  partitionedYearlyFaoCamelPopulationData: PartitionedYearlyFaoCamelPopulationDataOutput;
  sarsCov2Estimates: Array<SarsCov2Estimate>;
  sarsCov2FilterOptions: SarsCov2FilterOptions;
  yearlyFaoCamelPopulationDataPartitionKeys: Array<Scalars['Int']['output']>;
};


export type QueryPartitionedFaoMersEventsArgs = {
  input: PartitionedFaoMersEventsInput;
};


export type QueryPartitionedMonthlySarsCov2CountryInformationArgs = {
  input: PartitionedMonthlySarsCov2CountryInformationInput;
};


export type QueryPartitionedSarsCov2EstimatesArgs = {
  input: PartitionedSarsCov2EstimatesInput;
};


export type QueryPartitionedYearlyFaoCamelPopulationDataArgs = {
  input: PartitionedYearlyFaoCamelPopulationDataInput;
};

export type SarsCov2Estimate = {
  __typename?: 'SarsCov2Estimate';
  ageGroup?: Maybe<Scalars['String']['output']>;
  antibodies: Array<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country: Scalars['String']['output'];
  countryAlphaThreeCode: Scalars['String']['output'];
  countryAlphaTwoCode: Scalars['String']['output'];
  countryPeopleFullyVaccinatedPerHundred?: Maybe<Scalars['Float']['output']>;
  countryPeopleVaccinatedPerHundred?: Maybe<Scalars['Float']['output']>;
  countryPositiveCasesPerMillionPeople?: Maybe<Scalars['Float']['output']>;
  denominatorValue?: Maybe<Scalars['Int']['output']>;
  estimateName?: Maybe<Scalars['String']['output']>;
  gbdSubRegion?: Maybe<GbdSubRegion>;
  gbdSuperRegion?: Maybe<GbdSuperRegion>;
  id: Scalars['String']['output'];
  isWHOUnityAligned: Scalars['Boolean']['output'];
  isotypes: Array<Scalars['String']['output']>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  numeratorValue?: Maybe<Scalars['Int']['output']>;
  populationGroup?: Maybe<Scalars['String']['output']>;
  publicationDate?: Maybe<Scalars['String']['output']>;
  riskOfBias?: Maybe<Scalars['String']['output']>;
  samplingEndDate?: Maybe<Scalars['String']['output']>;
  samplingMidDate?: Maybe<Scalars['String']['output']>;
  samplingStartDate?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Scalars['String']['output']>;
  seroprevalence?: Maybe<Scalars['Float']['output']>;
  sex?: Maybe<Scalars['String']['output']>;
  sourceType?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  studyName: Scalars['String']['output'];
  testType: Array<Scalars['String']['output']>;
  unRegion?: Maybe<UnRegion>;
  url?: Maybe<Scalars['String']['output']>;
  whoRegion?: Maybe<WhoRegion>;
};

export type SarsCov2FilterOptions = {
  __typename?: 'SarsCov2FilterOptions';
  ageGroup: Array<Scalars['String']['output']>;
  antibodies: Array<Scalars['String']['output']>;
  country: Array<Scalars['String']['output']>;
  countryIdentifiers: Array<CountryIdentifiers>;
  isotypes: Array<Scalars['String']['output']>;
  populationGroup: Array<Scalars['String']['output']>;
  riskOfBias: Array<Scalars['String']['output']>;
  scope: Array<Scalars['String']['output']>;
  sex: Array<Scalars['String']['output']>;
  sourceType: Array<Scalars['String']['output']>;
  testType: Array<Scalars['String']['output']>;
  unRegion: Array<UnRegion>;
  whoRegion: Array<WhoRegion>;
};

export type TeamMember = {
  __typename?: 'TeamMember';
  additionalSymbols: Array<TeamMemberSymbol>;
  affiliations: Array<Affiliation>;
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  linkedinUrl?: Maybe<Scalars['String']['output']>;
  twitterUrl?: Maybe<Scalars['String']['output']>;
};

export type TeamMemberGroup = {
  __typename?: 'TeamMemberGroup';
  label: Scalars['String']['output'];
  teamMembers: Array<TeamMember>;
};

export enum TeamMemberSymbol {
  ArbotrackerSymbol = 'ARBOTRACKER_SYMBOL'
}

export enum UnRegion {
  AustraliaAndNewZealand = 'AUSTRALIA_AND_NEW_ZEALAND',
  Caribbean = 'CARIBBEAN',
  CentralAmerica = 'CENTRAL_AMERICA',
  CentralAsia = 'CENTRAL_ASIA',
  EasternAfrica = 'EASTERN_AFRICA',
  EasternAsia = 'EASTERN_ASIA',
  EasternEurope = 'EASTERN_EUROPE',
  Melanesia = 'MELANESIA',
  Micronesia = 'MICRONESIA',
  MiddleAfrica = 'MIDDLE_AFRICA',
  NorthernAfrica = 'NORTHERN_AFRICA',
  NorthernAmerica = 'NORTHERN_AMERICA',
  NorthernEurope = 'NORTHERN_EUROPE',
  Polynesia = 'POLYNESIA',
  SouthernAfrica = 'SOUTHERN_AFRICA',
  SouthernAsia = 'SOUTHERN_ASIA',
  SouthernEurope = 'SOUTHERN_EUROPE',
  SouthAmerica = 'SOUTH_AMERICA',
  SouthEasternAsia = 'SOUTH_EASTERN_ASIA',
  WesternAfrica = 'WESTERN_AFRICA',
  WesternAsia = 'WESTERN_ASIA',
  WesternEurope = 'WESTERN_EUROPE'
}

export enum WhoRegion {
  Afr = 'AFR',
  Amr = 'AMR',
  Emr = 'EMR',
  Eur = 'EUR',
  Sear = 'SEAR',
  Wpr = 'WPR'
}

export type YearlyFaoCamelPopulationDataEntry = {
  __typename?: 'YearlyFaoCamelPopulationDataEntry';
  camelCount: Scalars['Int']['output'];
  camelCountPerCapita?: Maybe<Scalars['Float']['output']>;
  country: CountryIdentifiers;
  countryAlphaThreeCode: Scalars['String']['output'];
  id: Scalars['String']['output'];
  note: Scalars['String']['output'];
  unRegion?: Maybe<UnRegion>;
  whoRegion?: Maybe<WhoRegion>;
  year: Scalars['Int']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  MersAgeGroupSubEstimate: ( Omit<AnimalMersAgeGroupSubEstimate, 'estimateInfo'> & { estimateInfo: _RefType['MersSubEstimateInformation'] } ) | ( Omit<HumanMersAgeGroupSubEstimate, 'estimateInfo'> & { estimateInfo: _RefType['MersSubEstimateInformation'] } );
  MersEstimate_V2: ( AnimalMersEstimate ) | ( AnimalMersViralEstimate ) | ( HumanMersEstimate ) | ( HumanMersViralEstimate );
  MersEvent: ( AnimalMersEvent ) | ( HumanMersEvent );
  MersSubEstimateInformation: ( MersSeroprevalenceSubEstimateInformation ) | ( MersViralSubEstimateInformation );
  PrimaryMersEstimateInformation: ( PrimaryAnimalMersSeroprevalenceEstimateInformation ) | ( PrimaryAnimalMersViralEstimateInformation ) | ( PrimaryHumanMersSeroprevalenceEstimateInformation ) | ( PrimaryHumanMersViralEstimateInformation );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  MersEstimateInterface: ( AnimalMersEstimate ) | ( AnimalMersViralEstimate ) | ( HumanMersEstimate ) | ( HumanMersViralEstimate );
  MersEventInterface: ( AnimalMersEvent ) | ( HumanMersEvent );
  MersSubEstimateInformationInterface: ( MersSeroprevalenceSubEstimateInformation ) | ( MersViralSubEstimateInformation );
  MersSubEstimateInterface: ( Omit<AnimalMersAgeGroupSubEstimate, 'estimateInfo'> & { estimateInfo: _RefType['MersSubEstimateInformation'] } ) | ( Omit<HumanMersAgeGroupSubEstimate, 'estimateInfo'> & { estimateInfo: _RefType['MersSubEstimateInformation'] } ) | ( Omit<MersAnimalSamplingContextSubEstimate, 'estimateInfo'> & { estimateInfo: _RefType['MersSubEstimateInformation'] } ) | ( Omit<MersAnimalSourceLocationSubEstimate, 'estimateInfo'> & { estimateInfo: _RefType['MersSubEstimateInformation'] } ) | ( Omit<MersAnimalSpeciesSubEstimate, 'estimateInfo'> & { estimateInfo: _RefType['MersSubEstimateInformation'] } ) | ( Omit<MersCamelExposureLevelSubEstimate, 'estimateInfo'> & { estimateInfo: _RefType['MersSubEstimateInformation'] } ) | ( Omit<MersGeographicalAreaSubEstimate, 'estimateInfo'> & { estimateInfo: _RefType['MersSubEstimateInformation'] } ) | ( Omit<MersHumanCountriesOfTravelSubEstimate, 'estimateInfo'> & { estimateInfo: _RefType['MersSubEstimateInformation'] } ) | ( Omit<MersNomadismSubEstimate, 'estimateInfo'> & { estimateInfo: _RefType['MersSubEstimateInformation'] } ) | ( Omit<MersOccupationSubEstimate, 'estimateInfo'> & { estimateInfo: _RefType['MersSubEstimateInformation'] } ) | ( Omit<MersSampleTypeSubEstimate, 'estimateInfo'> & { estimateInfo: _RefType['MersSubEstimateInformation'] } ) | ( Omit<MersSexSubEstimate, 'estimateInfo'> & { estimateInfo: _RefType['MersSubEstimateInformation'] } ) | ( Omit<MersTestUsedSubEstimate, 'estimateInfo'> & { estimateInfo: _RefType['MersSubEstimateInformation'] } ) | ( Omit<MersTimeFrameSubEstimate, 'estimateInfo'> & { estimateInfo: _RefType['MersSubEstimateInformation'] } );
  PrimaryMersEstimateInformationInterface: ( PrimaryAnimalMersSeroprevalenceEstimateInformation ) | ( PrimaryAnimalMersViralEstimateInformation ) | ( PrimaryHumanMersSeroprevalenceEstimateInformation ) | ( PrimaryHumanMersViralEstimateInformation );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Affiliation: ResolverTypeWrapper<Affiliation>;
  AnimalMersAgeGroupSubEstimate: ResolverTypeWrapper<Omit<AnimalMersAgeGroupSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversTypes['MersSubEstimateInformation'] }>;
  AnimalMersEstimate: ResolverTypeWrapper<AnimalMersEstimate>;
  AnimalMersEvent: ResolverTypeWrapper<AnimalMersEvent>;
  AnimalMersViralEstimate: ResolverTypeWrapper<AnimalMersViralEstimate>;
  Arbovirus: Arbovirus;
  ArbovirusDataStatistics: ResolverTypeWrapper<ArbovirusDataStatistics>;
  ArbovirusEnvironmentalSuitabilityDataEntry: ResolverTypeWrapper<ArbovirusEnvironmentalSuitabilityDataEntry>;
  ArbovirusEnvironmentalSuitabilityDataSubEntry: ResolverTypeWrapper<ArbovirusEnvironmentalSuitabilityDataSubEntry>;
  ArbovirusEstimate: ResolverTypeWrapper<ArbovirusEstimate>;
  ArbovirusFilterOptions: ResolverTypeWrapper<ArbovirusFilterOptions>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Clade: Clade;
  CountryIdentifiers: ResolverTypeWrapper<CountryIdentifiers>;
  FaoMersEventFilterOptions: ResolverTypeWrapper<FaoMersEventFilterOptions>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GBDSubRegion: GbdSubRegion;
  GBDSuperRegion: GbdSuperRegion;
  GenomeSequenced: GenomeSequenced;
  HumanMersAgeGroupSubEstimate: ResolverTypeWrapper<Omit<HumanMersAgeGroupSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversTypes['MersSubEstimateInformation'] }>;
  HumanMersEstimate: ResolverTypeWrapper<HumanMersEstimate>;
  HumanMersEvent: ResolverTypeWrapper<HumanMersEvent>;
  HumanMersViralEstimate: ResolverTypeWrapper<HumanMersViralEstimate>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MersAgeGroupSubEstimate: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['MersAgeGroupSubEstimate']>;
  MersAnimalSamplingContextSubEstimate: ResolverTypeWrapper<Omit<MersAnimalSamplingContextSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversTypes['MersSubEstimateInformation'] }>;
  MersAnimalSourceLocationSubEstimate: ResolverTypeWrapper<Omit<MersAnimalSourceLocationSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversTypes['MersSubEstimateInformation'] }>;
  MersAnimalSpecies: MersAnimalSpecies;
  MersAnimalSpeciesSubEstimate: ResolverTypeWrapper<Omit<MersAnimalSpeciesSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversTypes['MersSubEstimateInformation'] }>;
  MersAnimalType: MersAnimalType;
  MersCamelExposureLevelSubEstimate: ResolverTypeWrapper<Omit<MersCamelExposureLevelSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversTypes['MersSubEstimateInformation'] }>;
  MersDiagnosisSource: MersDiagnosisSource;
  MersDiagnosisStatus: MersDiagnosisStatus;
  MersEstimate: ResolverTypeWrapper<MersEstimate>;
  MersEstimateFilterOptions: ResolverTypeWrapper<MersEstimateFilterOptions>;
  MersEstimateInterface: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MersEstimateInterface']>;
  MersEstimateType: MersEstimateType;
  MersEstimate_V2: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['MersEstimate_V2']>;
  MersEvent: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['MersEvent']>;
  MersEventAnimalSpecies: MersEventAnimalSpecies;
  MersEventAnimalType: MersEventAnimalType;
  MersEventInterface: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MersEventInterface']>;
  MersEventType: MersEventType;
  MersFilterOptions: ResolverTypeWrapper<MersFilterOptions>;
  MersGeographicalAreaSubEstimate: ResolverTypeWrapper<Omit<MersGeographicalAreaSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversTypes['MersSubEstimateInformation'] }>;
  MersHumanCountriesOfTravelSubEstimate: ResolverTypeWrapper<Omit<MersHumanCountriesOfTravelSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversTypes['MersSubEstimateInformation'] }>;
  MersMacroSampleFrame: ResolverTypeWrapper<MersMacroSampleFrame>;
  MersMacroSampleFrameType: MersMacroSampleFrameType;
  MersNomadismSubEstimate: ResolverTypeWrapper<Omit<MersNomadismSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversTypes['MersSubEstimateInformation'] }>;
  MersOccupationSubEstimate: ResolverTypeWrapper<Omit<MersOccupationSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversTypes['MersSubEstimateInformation'] }>;
  MersPrimaryEstimate: ResolverTypeWrapper<Omit<MersPrimaryEstimate, 'ageGroupSubestimates' | 'animalSamplingContextSubestimates' | 'animalSourceLocationSubestimates' | 'animalSpeciesSubestimates' | 'camelExposureLevelSubestimates' | 'geographicalAreaSubestimates' | 'humanCountriesOfTravelSubestimates' | 'nomadismSubestimates' | 'occupationSubestimates' | 'primaryEstimateInfo' | 'sampleTypeSubestimates' | 'sexSubestimates' | 'testUsedSubestimates' | 'timeFrameSubestimates'> & { ageGroupSubestimates: Array<ResolversTypes['MersAgeGroupSubEstimate']>, animalSamplingContextSubestimates: Array<ResolversTypes['MersAnimalSamplingContextSubEstimate']>, animalSourceLocationSubestimates: Array<ResolversTypes['MersAnimalSourceLocationSubEstimate']>, animalSpeciesSubestimates: Array<ResolversTypes['MersAnimalSpeciesSubEstimate']>, camelExposureLevelSubestimates: Array<ResolversTypes['MersCamelExposureLevelSubEstimate']>, geographicalAreaSubestimates: Array<ResolversTypes['MersGeographicalAreaSubEstimate']>, humanCountriesOfTravelSubestimates: Array<ResolversTypes['MersHumanCountriesOfTravelSubEstimate']>, nomadismSubestimates: Array<ResolversTypes['MersNomadismSubEstimate']>, occupationSubestimates: Array<ResolversTypes['MersOccupationSubEstimate']>, primaryEstimateInfo: ResolversTypes['PrimaryMersEstimateInformation'], sampleTypeSubestimates: Array<ResolversTypes['MersSampleTypeSubEstimate']>, sexSubestimates: Array<ResolversTypes['MersSexSubEstimate']>, testUsedSubestimates: Array<ResolversTypes['MersTestUsedSubEstimate']>, timeFrameSubestimates: Array<ResolversTypes['MersTimeFrameSubEstimate']> }>;
  MersSampleTypeSubEstimate: ResolverTypeWrapper<Omit<MersSampleTypeSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversTypes['MersSubEstimateInformation'] }>;
  MersSeroprevalenceSubEstimateInformation: ResolverTypeWrapper<MersSeroprevalenceSubEstimateInformation>;
  MersSexSubEstimate: ResolverTypeWrapper<Omit<MersSexSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversTypes['MersSubEstimateInformation'] }>;
  MersSubEstimateInformation: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['MersSubEstimateInformation']>;
  MersSubEstimateInformationInterface: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MersSubEstimateInformationInterface']>;
  MersSubEstimateInterface: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MersSubEstimateInterface']>;
  MersTestUsedSubEstimate: ResolverTypeWrapper<Omit<MersTestUsedSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversTypes['MersSubEstimateInformation'] }>;
  MersTimeFrameSubEstimate: ResolverTypeWrapper<Omit<MersTimeFrameSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversTypes['MersSubEstimateInformation'] }>;
  MersViralSubEstimateInformation: ResolverTypeWrapper<MersViralSubEstimateInformation>;
  Month: Month;
  MonthlySarsCov2CountryInformationEntry: ResolverTypeWrapper<MonthlySarsCov2CountryInformationEntry>;
  PartitionedFaoMersEventsInput: PartitionedFaoMersEventsInput;
  PartitionedFeoMersEventsOutput: ResolverTypeWrapper<Omit<PartitionedFeoMersEventsOutput, 'mersEvents'> & { mersEvents: Array<ResolversTypes['MersEvent']> }>;
  PartitionedMonthlySarsCov2CountryInformationInput: PartitionedMonthlySarsCov2CountryInformationInput;
  PartitionedMonthlySarsCov2CountryInformationOutput: ResolverTypeWrapper<PartitionedMonthlySarsCov2CountryInformationOutput>;
  PartitionedSarsCov2EstimatesInput: PartitionedSarsCov2EstimatesInput;
  PartitionedSarsCov2EstimatesOutput: ResolverTypeWrapper<PartitionedSarsCov2EstimatesOutput>;
  PartitionedYearlyFaoCamelPopulationDataInput: PartitionedYearlyFaoCamelPopulationDataInput;
  PartitionedYearlyFaoCamelPopulationDataOutput: ResolverTypeWrapper<PartitionedYearlyFaoCamelPopulationDataOutput>;
  PrimaryAnimalMersSeroprevalenceEstimateInformation: ResolverTypeWrapper<PrimaryAnimalMersSeroprevalenceEstimateInformation>;
  PrimaryAnimalMersViralEstimateInformation: ResolverTypeWrapper<PrimaryAnimalMersViralEstimateInformation>;
  PrimaryHumanMersSeroprevalenceEstimateInformation: ResolverTypeWrapper<PrimaryHumanMersSeroprevalenceEstimateInformation>;
  PrimaryHumanMersViralEstimateInformation: ResolverTypeWrapper<PrimaryHumanMersViralEstimateInformation>;
  PrimaryMersEstimateInformation: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['PrimaryMersEstimateInformation']>;
  PrimaryMersEstimateInformationInterface: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['PrimaryMersEstimateInformationInterface']>;
  Query: ResolverTypeWrapper<{}>;
  SarsCov2Estimate: ResolverTypeWrapper<SarsCov2Estimate>;
  SarsCov2FilterOptions: ResolverTypeWrapper<SarsCov2FilterOptions>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TeamMember: ResolverTypeWrapper<TeamMember>;
  TeamMemberGroup: ResolverTypeWrapper<TeamMemberGroup>;
  TeamMemberSymbol: TeamMemberSymbol;
  UNRegion: UnRegion;
  WHORegion: WhoRegion;
  YearlyFaoCamelPopulationDataEntry: ResolverTypeWrapper<YearlyFaoCamelPopulationDataEntry>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Affiliation: Affiliation;
  AnimalMersAgeGroupSubEstimate: Omit<AnimalMersAgeGroupSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversParentTypes['MersSubEstimateInformation'] };
  AnimalMersEstimate: AnimalMersEstimate;
  AnimalMersEvent: AnimalMersEvent;
  AnimalMersViralEstimate: AnimalMersViralEstimate;
  ArbovirusDataStatistics: ArbovirusDataStatistics;
  ArbovirusEnvironmentalSuitabilityDataEntry: ArbovirusEnvironmentalSuitabilityDataEntry;
  ArbovirusEnvironmentalSuitabilityDataSubEntry: ArbovirusEnvironmentalSuitabilityDataSubEntry;
  ArbovirusEstimate: ArbovirusEstimate;
  ArbovirusFilterOptions: ArbovirusFilterOptions;
  Boolean: Scalars['Boolean']['output'];
  CountryIdentifiers: CountryIdentifiers;
  FaoMersEventFilterOptions: FaoMersEventFilterOptions;
  Float: Scalars['Float']['output'];
  HumanMersAgeGroupSubEstimate: Omit<HumanMersAgeGroupSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversParentTypes['MersSubEstimateInformation'] };
  HumanMersEstimate: HumanMersEstimate;
  HumanMersEvent: HumanMersEvent;
  HumanMersViralEstimate: HumanMersViralEstimate;
  Int: Scalars['Int']['output'];
  MersAgeGroupSubEstimate: ResolversUnionTypes<ResolversParentTypes>['MersAgeGroupSubEstimate'];
  MersAnimalSamplingContextSubEstimate: Omit<MersAnimalSamplingContextSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversParentTypes['MersSubEstimateInformation'] };
  MersAnimalSourceLocationSubEstimate: Omit<MersAnimalSourceLocationSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversParentTypes['MersSubEstimateInformation'] };
  MersAnimalSpeciesSubEstimate: Omit<MersAnimalSpeciesSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversParentTypes['MersSubEstimateInformation'] };
  MersCamelExposureLevelSubEstimate: Omit<MersCamelExposureLevelSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversParentTypes['MersSubEstimateInformation'] };
  MersEstimate: MersEstimate;
  MersEstimateFilterOptions: MersEstimateFilterOptions;
  MersEstimateInterface: ResolversInterfaceTypes<ResolversParentTypes>['MersEstimateInterface'];
  MersEstimate_V2: ResolversUnionTypes<ResolversParentTypes>['MersEstimate_V2'];
  MersEvent: ResolversUnionTypes<ResolversParentTypes>['MersEvent'];
  MersEventInterface: ResolversInterfaceTypes<ResolversParentTypes>['MersEventInterface'];
  MersFilterOptions: MersFilterOptions;
  MersGeographicalAreaSubEstimate: Omit<MersGeographicalAreaSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversParentTypes['MersSubEstimateInformation'] };
  MersHumanCountriesOfTravelSubEstimate: Omit<MersHumanCountriesOfTravelSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversParentTypes['MersSubEstimateInformation'] };
  MersMacroSampleFrame: MersMacroSampleFrame;
  MersNomadismSubEstimate: Omit<MersNomadismSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversParentTypes['MersSubEstimateInformation'] };
  MersOccupationSubEstimate: Omit<MersOccupationSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversParentTypes['MersSubEstimateInformation'] };
  MersPrimaryEstimate: Omit<MersPrimaryEstimate, 'ageGroupSubestimates' | 'animalSamplingContextSubestimates' | 'animalSourceLocationSubestimates' | 'animalSpeciesSubestimates' | 'camelExposureLevelSubestimates' | 'geographicalAreaSubestimates' | 'humanCountriesOfTravelSubestimates' | 'nomadismSubestimates' | 'occupationSubestimates' | 'primaryEstimateInfo' | 'sampleTypeSubestimates' | 'sexSubestimates' | 'testUsedSubestimates' | 'timeFrameSubestimates'> & { ageGroupSubestimates: Array<ResolversParentTypes['MersAgeGroupSubEstimate']>, animalSamplingContextSubestimates: Array<ResolversParentTypes['MersAnimalSamplingContextSubEstimate']>, animalSourceLocationSubestimates: Array<ResolversParentTypes['MersAnimalSourceLocationSubEstimate']>, animalSpeciesSubestimates: Array<ResolversParentTypes['MersAnimalSpeciesSubEstimate']>, camelExposureLevelSubestimates: Array<ResolversParentTypes['MersCamelExposureLevelSubEstimate']>, geographicalAreaSubestimates: Array<ResolversParentTypes['MersGeographicalAreaSubEstimate']>, humanCountriesOfTravelSubestimates: Array<ResolversParentTypes['MersHumanCountriesOfTravelSubEstimate']>, nomadismSubestimates: Array<ResolversParentTypes['MersNomadismSubEstimate']>, occupationSubestimates: Array<ResolversParentTypes['MersOccupationSubEstimate']>, primaryEstimateInfo: ResolversParentTypes['PrimaryMersEstimateInformation'], sampleTypeSubestimates: Array<ResolversParentTypes['MersSampleTypeSubEstimate']>, sexSubestimates: Array<ResolversParentTypes['MersSexSubEstimate']>, testUsedSubestimates: Array<ResolversParentTypes['MersTestUsedSubEstimate']>, timeFrameSubestimates: Array<ResolversParentTypes['MersTimeFrameSubEstimate']> };
  MersSampleTypeSubEstimate: Omit<MersSampleTypeSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversParentTypes['MersSubEstimateInformation'] };
  MersSeroprevalenceSubEstimateInformation: MersSeroprevalenceSubEstimateInformation;
  MersSexSubEstimate: Omit<MersSexSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversParentTypes['MersSubEstimateInformation'] };
  MersSubEstimateInformation: ResolversUnionTypes<ResolversParentTypes>['MersSubEstimateInformation'];
  MersSubEstimateInformationInterface: ResolversInterfaceTypes<ResolversParentTypes>['MersSubEstimateInformationInterface'];
  MersSubEstimateInterface: ResolversInterfaceTypes<ResolversParentTypes>['MersSubEstimateInterface'];
  MersTestUsedSubEstimate: Omit<MersTestUsedSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversParentTypes['MersSubEstimateInformation'] };
  MersTimeFrameSubEstimate: Omit<MersTimeFrameSubEstimate, 'estimateInfo'> & { estimateInfo: ResolversParentTypes['MersSubEstimateInformation'] };
  MersViralSubEstimateInformation: MersViralSubEstimateInformation;
  MonthlySarsCov2CountryInformationEntry: MonthlySarsCov2CountryInformationEntry;
  PartitionedFaoMersEventsInput: PartitionedFaoMersEventsInput;
  PartitionedFeoMersEventsOutput: Omit<PartitionedFeoMersEventsOutput, 'mersEvents'> & { mersEvents: Array<ResolversParentTypes['MersEvent']> };
  PartitionedMonthlySarsCov2CountryInformationInput: PartitionedMonthlySarsCov2CountryInformationInput;
  PartitionedMonthlySarsCov2CountryInformationOutput: PartitionedMonthlySarsCov2CountryInformationOutput;
  PartitionedSarsCov2EstimatesInput: PartitionedSarsCov2EstimatesInput;
  PartitionedSarsCov2EstimatesOutput: PartitionedSarsCov2EstimatesOutput;
  PartitionedYearlyFaoCamelPopulationDataInput: PartitionedYearlyFaoCamelPopulationDataInput;
  PartitionedYearlyFaoCamelPopulationDataOutput: PartitionedYearlyFaoCamelPopulationDataOutput;
  PrimaryAnimalMersSeroprevalenceEstimateInformation: PrimaryAnimalMersSeroprevalenceEstimateInformation;
  PrimaryAnimalMersViralEstimateInformation: PrimaryAnimalMersViralEstimateInformation;
  PrimaryHumanMersSeroprevalenceEstimateInformation: PrimaryHumanMersSeroprevalenceEstimateInformation;
  PrimaryHumanMersViralEstimateInformation: PrimaryHumanMersViralEstimateInformation;
  PrimaryMersEstimateInformation: ResolversUnionTypes<ResolversParentTypes>['PrimaryMersEstimateInformation'];
  PrimaryMersEstimateInformationInterface: ResolversInterfaceTypes<ResolversParentTypes>['PrimaryMersEstimateInformationInterface'];
  Query: {};
  SarsCov2Estimate: SarsCov2Estimate;
  SarsCov2FilterOptions: SarsCov2FilterOptions;
  String: Scalars['String']['output'];
  TeamMember: TeamMember;
  TeamMemberGroup: TeamMemberGroup;
  YearlyFaoCamelPopulationDataEntry: YearlyFaoCamelPopulationDataEntry;
};

export type AffiliationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Affiliation'] = ResolversParentTypes['Affiliation']> = {
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnimalMersAgeGroupSubEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnimalMersAgeGroupSubEstimate'] = ResolversParentTypes['AnimalMersAgeGroupSubEstimate']> = {
  animalAgeGroup?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  animalAgeGroupLabel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateInfo?: Resolver<ResolversTypes['MersSubEstimateInformation'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnimalMersEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnimalMersEstimate'] = ResolversParentTypes['AnimalMersEstimate']> = {
  animalDetectionSettings?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  animalImportedOrLocal?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  animalPurpose?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  animalSpecies?: Resolver<ResolversTypes['MersAnimalSpecies'], ParentType, ContextType>;
  animalType?: Resolver<Array<ResolversTypes['MersAnimalType']>, ParentType, ContextType>;
  assay?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaThreeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaTwoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstAuthorFullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  geographicScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  insitutution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isotypes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sampleDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sampleNumerator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  samplingEndDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMidDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingStartDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sensitivity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivity95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivity95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivityDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  seroprevalence?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  seroprevalence95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seroprevalence95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sex?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  specificity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificity95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificity95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificityDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  specimenType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyExclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyInclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  testProducer?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  testValidation?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MersEstimateType'], ParentType, ContextType>;
  unRegion?: Resolver<Maybe<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnimalMersEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnimalMersEvent'] = ResolversParentTypes['AnimalMersEvent']> = {
  animalSpecies?: Resolver<ResolversTypes['MersEventAnimalSpecies'], ParentType, ContextType>;
  animalType?: Resolver<ResolversTypes['MersEventAnimalType'], ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['CountryIdentifiers'], ParentType, ContextType>;
  diagnosisSource?: Resolver<ResolversTypes['MersDiagnosisSource'], ParentType, ContextType>;
  diagnosisStatus?: Resolver<ResolversTypes['MersDiagnosisStatus'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  observationDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reportDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MersEventType'], ParentType, ContextType>;
  unRegion?: Resolver<Maybe<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnimalMersViralEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnimalMersViralEstimate'] = ResolversParentTypes['AnimalMersViralEstimate']> = {
  animalDetectionSettings?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  animalImportedOrLocal?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  animalPurpose?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  animalSpecies?: Resolver<ResolversTypes['MersAnimalSpecies'], ParentType, ContextType>;
  animalType?: Resolver<Array<ResolversTypes['MersAnimalType']>, ParentType, ContextType>;
  assay?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaThreeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaTwoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstAuthorFullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  geographicScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  insitutution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isotypes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  positivePrevalence?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  positivePrevalence95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  positivePrevalence95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sampleDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sampleNumerator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  samplingEndDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMidDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingStartDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sensitivity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivity95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivity95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivityDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sex?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  specificity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificity95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificity95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificityDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  specimenType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyExclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyInclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  testProducer?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  testValidation?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MersEstimateType'], ParentType, ContextType>;
  unRegion?: Resolver<Maybe<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArbovirusDataStatisticsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArbovirusDataStatistics'] = ResolversParentTypes['ArbovirusDataStatistics']> = {
  countryCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  estimateCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  patricipantCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sourceCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArbovirusEnvironmentalSuitabilityDataEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArbovirusEnvironmentalSuitabilityDataEntry'] = ResolversParentTypes['ArbovirusEnvironmentalSuitabilityDataEntry']> = {
  countryAlphaThreeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaTwoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dengue2015Data?: Resolver<ResolversTypes['ArbovirusEnvironmentalSuitabilityDataSubEntry'], ParentType, ContextType>;
  dengue2050Data?: Resolver<ResolversTypes['ArbovirusEnvironmentalSuitabilityDataSubEntry'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zikaData?: Resolver<ResolversTypes['ArbovirusEnvironmentalSuitabilityDataSubEntry'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArbovirusEnvironmentalSuitabilityDataSubEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArbovirusEnvironmentalSuitabilityDataSubEntry'] = ResolversParentTypes['ArbovirusEnvironmentalSuitabilityDataSubEntry']> = {
  maximumValue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  meanValue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  medianValue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  minimumValue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  ninetyPercentOfValuesAreBelowThisValue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  valueRange?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArbovirusEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArbovirusEstimate'] = ResolversParentTypes['ArbovirusEstimate']> = {
  ageGroup?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ageMaximum?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ageMinimum?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  antibodies?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  antigen?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  assay?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  assayOther?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaThreeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaTwoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  pathogen?: Resolver<ResolversTypes['Arbovirus'], ParentType, ContextType>;
  pediatricAgeGroup?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  producer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  producerOther?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sameFrameTargetGroup?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleEndDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleFrame?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleNumerator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sampleSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sampleStartDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  seroprevalence?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  seroprevalenceCalculated95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seroprevalenceCalculated95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seroprevalenceStudy95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seroprevalenceStudy95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  serotype?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  sex?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceSheetId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceSheetName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unRegion?: Resolver<Maybe<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArbovirusFilterOptionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArbovirusFilterOptions'] = ResolversParentTypes['ArbovirusFilterOptions']> = {
  ageGroup?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  antibody?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  assay?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  countryIdentifiers?: Resolver<Array<ResolversTypes['CountryIdentifiers']>, ParentType, ContextType>;
  pathogen?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  pediatricAgeGroup?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  producer?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  sampleFrame?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  serotype?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  sex?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  unRegion?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  whoRegion?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryIdentifiersResolvers<ContextType = any, ParentType extends ResolversParentTypes['CountryIdentifiers'] = ResolversParentTypes['CountryIdentifiers']> = {
  alphaThreeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  alphaTwoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FaoMersEventFilterOptionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['FaoMersEventFilterOptions'] = ResolversParentTypes['FaoMersEventFilterOptions']> = {
  animalSpecies?: Resolver<Array<ResolversTypes['MersEventAnimalSpecies']>, ParentType, ContextType>;
  animalType?: Resolver<Array<ResolversTypes['MersEventAnimalType']>, ParentType, ContextType>;
  diagnosisSource?: Resolver<Array<ResolversTypes['MersDiagnosisSource']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HumanMersAgeGroupSubEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['HumanMersAgeGroupSubEstimate'] = ResolversParentTypes['HumanMersAgeGroupSubEstimate']> = {
  ageGroup?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  ageGroupLabel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateInfo?: Resolver<ResolversTypes['MersSubEstimateInformation'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HumanMersEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['HumanMersEstimate'] = ResolversParentTypes['HumanMersEstimate']> = {
  ageGroup?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  assay?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaThreeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaTwoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstAuthorFullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  geographicScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  insitutution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isotypes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sampleDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sampleFrame?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleNumerator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  samplingEndDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMidDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingStartDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sensitivity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivity95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivity95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivityDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  seroprevalence?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  seroprevalence95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seroprevalence95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sex?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  specificity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificity95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificity95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificityDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  specimenType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyExclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyInclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  testProducer?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  testValidation?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MersEstimateType'], ParentType, ContextType>;
  unRegion?: Resolver<Maybe<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HumanMersEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['HumanMersEvent'] = ResolversParentTypes['HumanMersEvent']> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['CountryIdentifiers'], ParentType, ContextType>;
  diagnosisSource?: Resolver<ResolversTypes['MersDiagnosisSource'], ParentType, ContextType>;
  diagnosisStatus?: Resolver<ResolversTypes['MersDiagnosisStatus'], ParentType, ContextType>;
  humanDeaths?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  humansAffected?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  observationDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reportDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MersEventType'], ParentType, ContextType>;
  unRegion?: Resolver<Maybe<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HumanMersViralEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['HumanMersViralEstimate'] = ResolversParentTypes['HumanMersViralEstimate']> = {
  ageGroup?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  assay?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaThreeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaTwoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstAuthorFullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  geographicScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  insitutution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isotypes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  positivePrevalence?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  positivePrevalence95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  positivePrevalence95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sampleDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sampleFrame?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleNumerator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  samplingEndDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMidDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingStartDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sensitivity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivity95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivity95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivityDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sex?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  specificity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificity95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificity95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificityDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  specimenType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyExclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyInclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  testProducer?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  testValidation?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MersEstimateType'], ParentType, ContextType>;
  unRegion?: Resolver<Maybe<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MersAgeGroupSubEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersAgeGroupSubEstimate'] = ResolversParentTypes['MersAgeGroupSubEstimate']> = {
  __resolveType: TypeResolveFn<'AnimalMersAgeGroupSubEstimate' | 'HumanMersAgeGroupSubEstimate', ParentType, ContextType>;
};

export type MersAnimalSamplingContextSubEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersAnimalSamplingContextSubEstimate'] = ResolversParentTypes['MersAnimalSamplingContextSubEstimate']> = {
  animalDetectionSettings?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateInfo?: Resolver<ResolversTypes['MersSubEstimateInformation'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MersAnimalSourceLocationSubEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersAnimalSourceLocationSubEstimate'] = ResolversParentTypes['MersAnimalSourceLocationSubEstimate']> = {
  animalCountriesOfImport?: Resolver<Array<ResolversTypes['CountryIdentifiers']>, ParentType, ContextType>;
  animalCountryOfImport?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  animalCountryOfImportAlphaThreeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  animalCountryOfImportAlphaTwoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  animalImportedOrLocal?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateInfo?: Resolver<ResolversTypes['MersSubEstimateInformation'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MersAnimalSpeciesSubEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersAnimalSpeciesSubEstimate'] = ResolversParentTypes['MersAnimalSpeciesSubEstimate']> = {
  animalSpecies?: Resolver<ResolversTypes['MersAnimalSpecies'], ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateInfo?: Resolver<ResolversTypes['MersSubEstimateInformation'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MersCamelExposureLevelSubEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersCamelExposureLevelSubEstimate'] = ResolversParentTypes['MersCamelExposureLevelSubEstimate']> = {
  details?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateInfo?: Resolver<ResolversTypes['MersSubEstimateInformation'], ParentType, ContextType>;
  exposureToCamels?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sampleFrame?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MersEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersEstimate'] = ResolversParentTypes['MersEstimate']> = {
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaThreeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaTwoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstAuthorFullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  insitutution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  seroprevalence?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sourceTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unRegion?: Resolver<Maybe<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MersEstimateFilterOptionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersEstimateFilterOptions'] = ResolversParentTypes['MersEstimateFilterOptions']> = {
  ageGroup?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  animalDetectionSettings?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  animalImportedOrLocal?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  animalPurpose?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  antigen?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  assay?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  clade?: Resolver<Array<ResolversTypes['Clade']>, ParentType, ContextType>;
  exposureToCamels?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  geographicScope?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  isotypes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  sampleFrame?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMethod?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  sex?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  sourceType?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  specimenType?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  testProducer?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  testValidation?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MersEstimateInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersEstimateInterface'] = ResolversParentTypes['MersEstimateInterface']> = {
  __resolveType: TypeResolveFn<'AnimalMersEstimate' | 'AnimalMersViralEstimate' | 'HumanMersEstimate' | 'HumanMersViralEstimate', ParentType, ContextType>;
  assay?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaThreeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaTwoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstAuthorFullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  geographicScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  insitutution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isotypes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sampleDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sampleNumerator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  samplingEndDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMidDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingStartDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sensitivity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivity95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivity95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivityDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sex?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  specificity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificity95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificity95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificityDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  specimenType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyExclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyInclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  testProducer?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  testValidation?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MersEstimateType'], ParentType, ContextType>;
  unRegion?: Resolver<Maybe<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
};

export type MersEstimate_V2Resolvers<ContextType = any, ParentType extends ResolversParentTypes['MersEstimate_V2'] = ResolversParentTypes['MersEstimate_V2']> = {
  __resolveType: TypeResolveFn<'AnimalMersEstimate' | 'AnimalMersViralEstimate' | 'HumanMersEstimate' | 'HumanMersViralEstimate', ParentType, ContextType>;
};

export type MersEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersEvent'] = ResolversParentTypes['MersEvent']> = {
  __resolveType: TypeResolveFn<'AnimalMersEvent' | 'HumanMersEvent', ParentType, ContextType>;
};

export type MersEventInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersEventInterface'] = ResolversParentTypes['MersEventInterface']> = {
  __resolveType: TypeResolveFn<'AnimalMersEvent' | 'HumanMersEvent', ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['CountryIdentifiers'], ParentType, ContextType>;
  diagnosisSource?: Resolver<ResolversTypes['MersDiagnosisSource'], ParentType, ContextType>;
  diagnosisStatus?: Resolver<ResolversTypes['MersDiagnosisStatus'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  observationDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reportDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MersEventType'], ParentType, ContextType>;
  unRegion?: Resolver<Maybe<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
};

export type MersFilterOptionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersFilterOptions'] = ResolversParentTypes['MersFilterOptions']> = {
  countryIdentifiers?: Resolver<Array<ResolversTypes['CountryIdentifiers']>, ParentType, ContextType>;
  unRegion?: Resolver<Array<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  whoRegion?: Resolver<Array<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MersGeographicalAreaSubEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersGeographicalAreaSubEstimate'] = ResolversParentTypes['MersGeographicalAreaSubEstimate']> = {
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaThreeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaTwoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  district?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateInfo?: Resolver<ResolversTypes['MersSubEstimateInformation'], ParentType, ContextType>;
  geographicScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unRegion?: Resolver<Maybe<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MersHumanCountriesOfTravelSubEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersHumanCountriesOfTravelSubEstimate'] = ResolversParentTypes['MersHumanCountriesOfTravelSubEstimate']> = {
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateInfo?: Resolver<ResolversTypes['MersSubEstimateInformation'], ParentType, ContextType>;
  humanCountriesOfTravel?: Resolver<Array<ResolversTypes['CountryIdentifiers']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MersMacroSampleFrameResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersMacroSampleFrame'] = ResolversParentTypes['MersMacroSampleFrame']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  macroSampleFrame?: Resolver<ResolversTypes['MersMacroSampleFrameType'], ParentType, ContextType>;
  sampleFrames?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MersNomadismSubEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersNomadismSubEstimate'] = ResolversParentTypes['MersNomadismSubEstimate']> = {
  details?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateInfo?: Resolver<ResolversTypes['MersSubEstimateInformation'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MersOccupationSubEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersOccupationSubEstimate'] = ResolversParentTypes['MersOccupationSubEstimate']> = {
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateInfo?: Resolver<ResolversTypes['MersSubEstimateInformation'], ParentType, ContextType>;
  exposureToCamels?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  occupation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sampleFrame?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MersPrimaryEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersPrimaryEstimate'] = ResolversParentTypes['MersPrimaryEstimate']> = {
  ageGroupSubestimates?: Resolver<Array<ResolversTypes['MersAgeGroupSubEstimate']>, ParentType, ContextType>;
  animalSamplingContextSubestimates?: Resolver<Array<ResolversTypes['MersAnimalSamplingContextSubEstimate']>, ParentType, ContextType>;
  animalSourceLocationSubestimates?: Resolver<Array<ResolversTypes['MersAnimalSourceLocationSubEstimate']>, ParentType, ContextType>;
  animalSpeciesSubestimates?: Resolver<Array<ResolversTypes['MersAnimalSpeciesSubEstimate']>, ParentType, ContextType>;
  camelExposureLevelSubestimates?: Resolver<Array<ResolversTypes['MersCamelExposureLevelSubEstimate']>, ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  geographicalAreaSubestimates?: Resolver<Array<ResolversTypes['MersGeographicalAreaSubEstimate']>, ParentType, ContextType>;
  humanCountriesOfTravelSubestimates?: Resolver<Array<ResolversTypes['MersHumanCountriesOfTravelSubEstimate']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nomadismSubestimates?: Resolver<Array<ResolversTypes['MersNomadismSubEstimate']>, ParentType, ContextType>;
  occupationSubestimates?: Resolver<Array<ResolversTypes['MersOccupationSubEstimate']>, ParentType, ContextType>;
  primaryEstimateInfo?: Resolver<ResolversTypes['PrimaryMersEstimateInformation'], ParentType, ContextType>;
  sampleTypeSubestimates?: Resolver<Array<ResolversTypes['MersSampleTypeSubEstimate']>, ParentType, ContextType>;
  sexSubestimates?: Resolver<Array<ResolversTypes['MersSexSubEstimate']>, ParentType, ContextType>;
  testUsedSubestimates?: Resolver<Array<ResolversTypes['MersTestUsedSubEstimate']>, ParentType, ContextType>;
  timeFrameSubestimates?: Resolver<Array<ResolversTypes['MersTimeFrameSubEstimate']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MersSampleTypeSubEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersSampleTypeSubEstimate'] = ResolversParentTypes['MersSampleTypeSubEstimate']> = {
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateInfo?: Resolver<ResolversTypes['MersSubEstimateInformation'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  specimenType?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MersSeroprevalenceSubEstimateInformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersSeroprevalenceSubEstimateInformation'] = ResolversParentTypes['MersSeroprevalenceSubEstimateInformation']> = {
  sampleDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sampleNumerator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  seroprevalence?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  seroprevalence95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seroprevalence95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seroprevalenceCalculated95CILower?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  seroprevalenceCalculated95CIUpper?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MersSexSubEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersSexSubEstimate'] = ResolversParentTypes['MersSexSubEstimate']> = {
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateInfo?: Resolver<ResolversTypes['MersSubEstimateInformation'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sex?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MersSubEstimateInformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersSubEstimateInformation'] = ResolversParentTypes['MersSubEstimateInformation']> = {
  __resolveType: TypeResolveFn<'MersSeroprevalenceSubEstimateInformation' | 'MersViralSubEstimateInformation', ParentType, ContextType>;
};

export type MersSubEstimateInformationInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersSubEstimateInformationInterface'] = ResolversParentTypes['MersSubEstimateInformationInterface']> = {
  __resolveType: TypeResolveFn<'MersSeroprevalenceSubEstimateInformation' | 'MersViralSubEstimateInformation', ParentType, ContextType>;
  sampleDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sampleNumerator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type MersSubEstimateInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersSubEstimateInterface'] = ResolversParentTypes['MersSubEstimateInterface']> = {
  __resolveType: TypeResolveFn<'AnimalMersAgeGroupSubEstimate' | 'HumanMersAgeGroupSubEstimate' | 'MersAnimalSamplingContextSubEstimate' | 'MersAnimalSourceLocationSubEstimate' | 'MersAnimalSpeciesSubEstimate' | 'MersCamelExposureLevelSubEstimate' | 'MersGeographicalAreaSubEstimate' | 'MersHumanCountriesOfTravelSubEstimate' | 'MersNomadismSubEstimate' | 'MersOccupationSubEstimate' | 'MersSampleTypeSubEstimate' | 'MersSexSubEstimate' | 'MersTestUsedSubEstimate' | 'MersTimeFrameSubEstimate', ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateInfo?: Resolver<ResolversTypes['MersSubEstimateInformation'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MersTestUsedSubEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersTestUsedSubEstimate'] = ResolversParentTypes['MersTestUsedSubEstimate']> = {
  assay?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateInfo?: Resolver<ResolversTypes['MersSubEstimateInformation'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MersTimeFrameSubEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersTimeFrameSubEstimate'] = ResolversParentTypes['MersTimeFrameSubEstimate']> = {
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateInfo?: Resolver<ResolversTypes['MersSubEstimateInformation'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  samplingEndDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  samplingStartDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MersViralSubEstimateInformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersViralSubEstimateInformation'] = ResolversParentTypes['MersViralSubEstimateInformation']> = {
  positivePrevalence?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  positivePrevalence95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  positivePrevalence95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  positivePrevalenceCalculated95CILower?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  positivePrevalenceCalculated95CIUpper?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sampleDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sampleNumerator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MonthlySarsCov2CountryInformationEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['MonthlySarsCov2CountryInformationEntry'] = ResolversParentTypes['MonthlySarsCov2CountryInformationEntry']> = {
  alphaThreeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  alphaTwoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gbdSubRegion?: Resolver<Maybe<ResolversTypes['GBDSubRegion']>, ParentType, ContextType>;
  gbdSuperRegion?: Resolver<Maybe<ResolversTypes['GBDSuperRegion']>, ParentType, ContextType>;
  month?: Resolver<ResolversTypes['Month'], ParentType, ContextType>;
  peopleFullyVaccinatedPerHundred?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  peopleVaccinatedPerHundred?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  population?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  positiveCasesPerMillionPeople?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  unRegion?: Resolver<Maybe<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PartitionedFeoMersEventsOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['PartitionedFeoMersEventsOutput'] = ResolversParentTypes['PartitionedFeoMersEventsOutput']> = {
  mersEvents?: Resolver<Array<ResolversTypes['MersEvent']>, ParentType, ContextType>;
  partitionKey?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PartitionedMonthlySarsCov2CountryInformationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['PartitionedMonthlySarsCov2CountryInformationOutput'] = ResolversParentTypes['PartitionedMonthlySarsCov2CountryInformationOutput']> = {
  monthlySarsCov2CountryInformation?: Resolver<Array<ResolversTypes['MonthlySarsCov2CountryInformationEntry']>, ParentType, ContextType>;
  partitionKey?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PartitionedSarsCov2EstimatesOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['PartitionedSarsCov2EstimatesOutput'] = ResolversParentTypes['PartitionedSarsCov2EstimatesOutput']> = {
  partitionKey?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sarsCov2Estimates?: Resolver<Array<ResolversTypes['SarsCov2Estimate']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PartitionedYearlyFaoCamelPopulationDataOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['PartitionedYearlyFaoCamelPopulationDataOutput'] = ResolversParentTypes['PartitionedYearlyFaoCamelPopulationDataOutput']> = {
  partitionKey?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  yearlyFaoCamelPopulationData?: Resolver<Array<ResolversTypes['YearlyFaoCamelPopulationDataEntry']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PrimaryAnimalMersSeroprevalenceEstimateInformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['PrimaryAnimalMersSeroprevalenceEstimateInformation'] = ResolversParentTypes['PrimaryAnimalMersSeroprevalenceEstimateInformation']> = {
  accessionNumbers?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  animalAgeGroup?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  animalCountriesOfImport?: Resolver<Array<ResolversTypes['CountryIdentifiers']>, ParentType, ContextType>;
  animalDetectionSettings?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  animalImportedOrLocal?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  animalPurpose?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  animalSpecies?: Resolver<ResolversTypes['MersAnimalSpecies'], ParentType, ContextType>;
  animalType?: Resolver<Array<ResolversTypes['MersAnimalType']>, ParentType, ContextType>;
  antigen?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  assay?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clade?: Resolver<Array<ResolversTypes['Clade']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaThreeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaTwoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  district?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  exposureToCamels?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstAuthorFullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genomeSequenced?: Resolver<Array<ResolversTypes['GenomeSequenced']>, ParentType, ContextType>;
  geographicScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  insitutution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isotypes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  positiveCutoff?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sampleNumerator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  samplingEndDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMidDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingStartDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sensitivity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivity95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivity95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivityDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sequencingDone?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  seroprevalence?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  seroprevalence95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seroprevalence95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seroprevalenceCalculated95CILower?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  seroprevalenceCalculated95CIUpper?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sex?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  socioeconomicStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourcePublicationYear?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sourceTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  specificity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificity95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificity95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificityDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  specimenType?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyExclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyInclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symptomDefinition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symptomPrevalenceOfPositives?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  testProducer?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  testProducerOther?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  testValidatedOn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  testValidation?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MersEstimateType'], ParentType, ContextType>;
  unRegion?: Resolver<Maybe<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PrimaryAnimalMersViralEstimateInformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['PrimaryAnimalMersViralEstimateInformation'] = ResolversParentTypes['PrimaryAnimalMersViralEstimateInformation']> = {
  accessionNumbers?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  animalAgeGroup?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  animalCountriesOfImport?: Resolver<Array<ResolversTypes['CountryIdentifiers']>, ParentType, ContextType>;
  animalDetectionSettings?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  animalImportedOrLocal?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  animalPurpose?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  animalSpecies?: Resolver<ResolversTypes['MersAnimalSpecies'], ParentType, ContextType>;
  animalType?: Resolver<Array<ResolversTypes['MersAnimalType']>, ParentType, ContextType>;
  antigen?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  assay?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clade?: Resolver<Array<ResolversTypes['Clade']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaThreeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaTwoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  district?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  exposureToCamels?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstAuthorFullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genomeSequenced?: Resolver<Array<ResolversTypes['GenomeSequenced']>, ParentType, ContextType>;
  geographicScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  insitutution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isotypes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  positiveCutoff?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  positivePrevalence?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  positivePrevalence95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  positivePrevalence95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  positivePrevalenceCalculated95CILower?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  positivePrevalenceCalculated95CIUpper?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sampleDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sampleNumerator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  samplingEndDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMidDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingStartDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sensitivity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivity95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivity95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivityDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sequencingDone?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  sex?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  socioeconomicStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourcePublicationYear?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sourceTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  specificity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificity95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificity95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificityDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  specimenType?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyExclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyInclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symptomDefinition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symptomPrevalenceOfPositives?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  testProducer?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  testProducerOther?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  testValidatedOn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  testValidation?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MersEstimateType'], ParentType, ContextType>;
  unRegion?: Resolver<Maybe<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PrimaryHumanMersSeroprevalenceEstimateInformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['PrimaryHumanMersSeroprevalenceEstimateInformation'] = ResolversParentTypes['PrimaryHumanMersSeroprevalenceEstimateInformation']> = {
  accessionNumbers?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ageGroup?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  antigen?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  assay?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clade?: Resolver<Array<ResolversTypes['Clade']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaThreeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaTwoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  district?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  exposureToCamels?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstAuthorFullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genomeSequenced?: Resolver<Array<ResolversTypes['GenomeSequenced']>, ParentType, ContextType>;
  geographicScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  humanCountriesOfTravel?: Resolver<Array<ResolversTypes['CountryIdentifiers']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  insitutution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isotypes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  positiveCutoff?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sampleFrame?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleNumerator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  samplingEndDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMidDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingStartDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sensitivity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivity95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivity95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivityDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sequencingDone?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  seroprevalence?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  seroprevalence95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seroprevalence95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seroprevalenceCalculated95CILower?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  seroprevalenceCalculated95CIUpper?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sex?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  socioeconomicStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourcePublicationYear?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sourceTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  specificity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificity95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificity95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificityDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  specimenType?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyExclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyInclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symptomDefinition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symptomPrevalenceOfPositives?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  testProducer?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  testProducerOther?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  testValidatedOn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  testValidation?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MersEstimateType'], ParentType, ContextType>;
  unRegion?: Resolver<Maybe<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PrimaryHumanMersViralEstimateInformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['PrimaryHumanMersViralEstimateInformation'] = ResolversParentTypes['PrimaryHumanMersViralEstimateInformation']> = {
  accessionNumbers?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ageGroup?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  antigen?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  assay?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clade?: Resolver<Array<ResolversTypes['Clade']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaThreeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaTwoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  district?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  exposureToCamels?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstAuthorFullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genomeSequenced?: Resolver<Array<ResolversTypes['GenomeSequenced']>, ParentType, ContextType>;
  geographicScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  humanCountriesOfTravel?: Resolver<Array<ResolversTypes['CountryIdentifiers']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  insitutution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isotypes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  positiveCutoff?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  positivePrevalence?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  positivePrevalence95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  positivePrevalence95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  positivePrevalenceCalculated95CILower?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  positivePrevalenceCalculated95CIUpper?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sampleDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sampleFrame?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleNumerator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  samplingEndDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMidDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingStartDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sensitivity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivity95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivity95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivityDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sequencingDone?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  sex?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  socioeconomicStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourcePublicationYear?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sourceTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  specificity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificity95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificity95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificityDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  specimenType?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyExclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyInclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symptomDefinition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symptomPrevalenceOfPositives?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  testProducer?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  testProducerOther?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  testValidatedOn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  testValidation?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MersEstimateType'], ParentType, ContextType>;
  unRegion?: Resolver<Maybe<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PrimaryMersEstimateInformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['PrimaryMersEstimateInformation'] = ResolversParentTypes['PrimaryMersEstimateInformation']> = {
  __resolveType: TypeResolveFn<'PrimaryAnimalMersSeroprevalenceEstimateInformation' | 'PrimaryAnimalMersViralEstimateInformation' | 'PrimaryHumanMersSeroprevalenceEstimateInformation' | 'PrimaryHumanMersViralEstimateInformation', ParentType, ContextType>;
};

export type PrimaryMersEstimateInformationInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['PrimaryMersEstimateInformationInterface'] = ResolversParentTypes['PrimaryMersEstimateInformationInterface']> = {
  __resolveType: TypeResolveFn<'PrimaryAnimalMersSeroprevalenceEstimateInformation' | 'PrimaryAnimalMersViralEstimateInformation' | 'PrimaryHumanMersSeroprevalenceEstimateInformation' | 'PrimaryHumanMersViralEstimateInformation', ParentType, ContextType>;
  accessionNumbers?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  antigen?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  assay?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clade?: Resolver<Array<ResolversTypes['Clade']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaThreeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaTwoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  district?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  exposureToCamels?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstAuthorFullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genomeSequenced?: Resolver<Array<ResolversTypes['GenomeSequenced']>, ParentType, ContextType>;
  geographicScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  insitutution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isotypes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  positiveCutoff?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sampleNumerator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  samplingEndDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMidDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingStartDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sensitivity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivity95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivity95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sensitivityDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sequencingDone?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  sex?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  socioeconomicStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourcePublicationYear?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sourceTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  specificity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificity95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificity95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  specificityDenominator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  specimenType?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyExclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyInclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symptomDefinition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symptomPrevalenceOfPositives?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  testProducer?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  testProducerOther?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  testValidatedOn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  testValidation?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MersEstimateType'], ParentType, ContextType>;
  unRegion?: Resolver<Maybe<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allFaoMersEventPartitionKeys?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  allMonthlySarsCov2CountryInformationPartitionKeys?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  allSarsCov2EstimatePartitionKeys?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  arbovirusDataStatistics?: Resolver<ResolversTypes['ArbovirusDataStatistics'], ParentType, ContextType>;
  arbovirusEnviromentalSuitabilityData?: Resolver<Array<ResolversTypes['ArbovirusEnvironmentalSuitabilityDataEntry']>, ParentType, ContextType>;
  arbovirusEstimates?: Resolver<Array<ResolversTypes['ArbovirusEstimate']>, ParentType, ContextType>;
  arbovirusFilterOptions?: Resolver<ResolversTypes['ArbovirusFilterOptions'], ParentType, ContextType>;
  faoMersEventFilterOptions?: Resolver<ResolversTypes['FaoMersEventFilterOptions'], ParentType, ContextType>;
  groupedTeamMembers?: Resolver<Array<ResolversTypes['TeamMemberGroup']>, ParentType, ContextType>;
  mersEstimates?: Resolver<Array<ResolversTypes['MersEstimate']>, ParentType, ContextType>;
  mersEstimatesFilterOptions?: Resolver<ResolversTypes['MersEstimateFilterOptions'], ParentType, ContextType>;
  mersEstimates_V2?: Resolver<Array<ResolversTypes['MersEstimate_V2']>, ParentType, ContextType>;
  mersFilterOptions?: Resolver<ResolversTypes['MersFilterOptions'], ParentType, ContextType>;
  mersMacroSampleFrames?: Resolver<Array<ResolversTypes['MersMacroSampleFrame']>, ParentType, ContextType>;
  mersPrimaryEstimates?: Resolver<Array<ResolversTypes['MersPrimaryEstimate']>, ParentType, ContextType>;
  monthlySarsCov2CountryInformation?: Resolver<Array<ResolversTypes['MonthlySarsCov2CountryInformationEntry']>, ParentType, ContextType>;
  partitionedFaoMersEvents?: Resolver<ResolversTypes['PartitionedFeoMersEventsOutput'], ParentType, ContextType, RequireFields<QueryPartitionedFaoMersEventsArgs, 'input'>>;
  partitionedMonthlySarsCov2CountryInformation?: Resolver<ResolversTypes['PartitionedMonthlySarsCov2CountryInformationOutput'], ParentType, ContextType, RequireFields<QueryPartitionedMonthlySarsCov2CountryInformationArgs, 'input'>>;
  partitionedSarsCov2Estimates?: Resolver<ResolversTypes['PartitionedSarsCov2EstimatesOutput'], ParentType, ContextType, RequireFields<QueryPartitionedSarsCov2EstimatesArgs, 'input'>>;
  partitionedYearlyFaoCamelPopulationData?: Resolver<ResolversTypes['PartitionedYearlyFaoCamelPopulationDataOutput'], ParentType, ContextType, RequireFields<QueryPartitionedYearlyFaoCamelPopulationDataArgs, 'input'>>;
  sarsCov2Estimates?: Resolver<Array<ResolversTypes['SarsCov2Estimate']>, ParentType, ContextType>;
  sarsCov2FilterOptions?: Resolver<ResolversTypes['SarsCov2FilterOptions'], ParentType, ContextType>;
  yearlyFaoCamelPopulationDataPartitionKeys?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type SarsCov2EstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['SarsCov2Estimate'] = ResolversParentTypes['SarsCov2Estimate']> = {
  ageGroup?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  antibodies?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaThreeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaTwoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryPeopleFullyVaccinatedPerHundred?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  countryPeopleVaccinatedPerHundred?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  countryPositiveCasesPerMillionPeople?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  denominatorValue?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  estimateName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gbdSubRegion?: Resolver<Maybe<ResolversTypes['GBDSubRegion']>, ParentType, ContextType>;
  gbdSuperRegion?: Resolver<Maybe<ResolversTypes['GBDSuperRegion']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isWHOUnityAligned?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isotypes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  numeratorValue?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  populationGroup?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publicationDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  riskOfBias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingEndDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingMidDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingStartDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  seroprevalence?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sex?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  testType?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  unRegion?: Resolver<Maybe<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SarsCov2FilterOptionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SarsCov2FilterOptions'] = ResolversParentTypes['SarsCov2FilterOptions']> = {
  ageGroup?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  antibodies?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  countryIdentifiers?: Resolver<Array<ResolversTypes['CountryIdentifiers']>, ParentType, ContextType>;
  isotypes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  populationGroup?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  riskOfBias?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  scope?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  sex?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  sourceType?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  testType?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  unRegion?: Resolver<Array<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  whoRegion?: Resolver<Array<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamMemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['TeamMember'] = ResolversParentTypes['TeamMember']> = {
  additionalSymbols?: Resolver<Array<ResolversTypes['TeamMemberSymbol']>, ParentType, ContextType>;
  affiliations?: Resolver<Array<ResolversTypes['Affiliation']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  linkedinUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitterUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamMemberGroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['TeamMemberGroup'] = ResolversParentTypes['TeamMemberGroup']> = {
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teamMembers?: Resolver<Array<ResolversTypes['TeamMember']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type YearlyFaoCamelPopulationDataEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['YearlyFaoCamelPopulationDataEntry'] = ResolversParentTypes['YearlyFaoCamelPopulationDataEntry']> = {
  camelCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  camelCountPerCapita?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['CountryIdentifiers'], ParentType, ContextType>;
  countryAlphaThreeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  unRegion?: Resolver<Maybe<ResolversTypes['UNRegion']>, ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Affiliation?: AffiliationResolvers<ContextType>;
  AnimalMersAgeGroupSubEstimate?: AnimalMersAgeGroupSubEstimateResolvers<ContextType>;
  AnimalMersEstimate?: AnimalMersEstimateResolvers<ContextType>;
  AnimalMersEvent?: AnimalMersEventResolvers<ContextType>;
  AnimalMersViralEstimate?: AnimalMersViralEstimateResolvers<ContextType>;
  ArbovirusDataStatistics?: ArbovirusDataStatisticsResolvers<ContextType>;
  ArbovirusEnvironmentalSuitabilityDataEntry?: ArbovirusEnvironmentalSuitabilityDataEntryResolvers<ContextType>;
  ArbovirusEnvironmentalSuitabilityDataSubEntry?: ArbovirusEnvironmentalSuitabilityDataSubEntryResolvers<ContextType>;
  ArbovirusEstimate?: ArbovirusEstimateResolvers<ContextType>;
  ArbovirusFilterOptions?: ArbovirusFilterOptionsResolvers<ContextType>;
  CountryIdentifiers?: CountryIdentifiersResolvers<ContextType>;
  FaoMersEventFilterOptions?: FaoMersEventFilterOptionsResolvers<ContextType>;
  HumanMersAgeGroupSubEstimate?: HumanMersAgeGroupSubEstimateResolvers<ContextType>;
  HumanMersEstimate?: HumanMersEstimateResolvers<ContextType>;
  HumanMersEvent?: HumanMersEventResolvers<ContextType>;
  HumanMersViralEstimate?: HumanMersViralEstimateResolvers<ContextType>;
  MersAgeGroupSubEstimate?: MersAgeGroupSubEstimateResolvers<ContextType>;
  MersAnimalSamplingContextSubEstimate?: MersAnimalSamplingContextSubEstimateResolvers<ContextType>;
  MersAnimalSourceLocationSubEstimate?: MersAnimalSourceLocationSubEstimateResolvers<ContextType>;
  MersAnimalSpeciesSubEstimate?: MersAnimalSpeciesSubEstimateResolvers<ContextType>;
  MersCamelExposureLevelSubEstimate?: MersCamelExposureLevelSubEstimateResolvers<ContextType>;
  MersEstimate?: MersEstimateResolvers<ContextType>;
  MersEstimateFilterOptions?: MersEstimateFilterOptionsResolvers<ContextType>;
  MersEstimateInterface?: MersEstimateInterfaceResolvers<ContextType>;
  MersEstimate_V2?: MersEstimate_V2Resolvers<ContextType>;
  MersEvent?: MersEventResolvers<ContextType>;
  MersEventInterface?: MersEventInterfaceResolvers<ContextType>;
  MersFilterOptions?: MersFilterOptionsResolvers<ContextType>;
  MersGeographicalAreaSubEstimate?: MersGeographicalAreaSubEstimateResolvers<ContextType>;
  MersHumanCountriesOfTravelSubEstimate?: MersHumanCountriesOfTravelSubEstimateResolvers<ContextType>;
  MersMacroSampleFrame?: MersMacroSampleFrameResolvers<ContextType>;
  MersNomadismSubEstimate?: MersNomadismSubEstimateResolvers<ContextType>;
  MersOccupationSubEstimate?: MersOccupationSubEstimateResolvers<ContextType>;
  MersPrimaryEstimate?: MersPrimaryEstimateResolvers<ContextType>;
  MersSampleTypeSubEstimate?: MersSampleTypeSubEstimateResolvers<ContextType>;
  MersSeroprevalenceSubEstimateInformation?: MersSeroprevalenceSubEstimateInformationResolvers<ContextType>;
  MersSexSubEstimate?: MersSexSubEstimateResolvers<ContextType>;
  MersSubEstimateInformation?: MersSubEstimateInformationResolvers<ContextType>;
  MersSubEstimateInformationInterface?: MersSubEstimateInformationInterfaceResolvers<ContextType>;
  MersSubEstimateInterface?: MersSubEstimateInterfaceResolvers<ContextType>;
  MersTestUsedSubEstimate?: MersTestUsedSubEstimateResolvers<ContextType>;
  MersTimeFrameSubEstimate?: MersTimeFrameSubEstimateResolvers<ContextType>;
  MersViralSubEstimateInformation?: MersViralSubEstimateInformationResolvers<ContextType>;
  MonthlySarsCov2CountryInformationEntry?: MonthlySarsCov2CountryInformationEntryResolvers<ContextType>;
  PartitionedFeoMersEventsOutput?: PartitionedFeoMersEventsOutputResolvers<ContextType>;
  PartitionedMonthlySarsCov2CountryInformationOutput?: PartitionedMonthlySarsCov2CountryInformationOutputResolvers<ContextType>;
  PartitionedSarsCov2EstimatesOutput?: PartitionedSarsCov2EstimatesOutputResolvers<ContextType>;
  PartitionedYearlyFaoCamelPopulationDataOutput?: PartitionedYearlyFaoCamelPopulationDataOutputResolvers<ContextType>;
  PrimaryAnimalMersSeroprevalenceEstimateInformation?: PrimaryAnimalMersSeroprevalenceEstimateInformationResolvers<ContextType>;
  PrimaryAnimalMersViralEstimateInformation?: PrimaryAnimalMersViralEstimateInformationResolvers<ContextType>;
  PrimaryHumanMersSeroprevalenceEstimateInformation?: PrimaryHumanMersSeroprevalenceEstimateInformationResolvers<ContextType>;
  PrimaryHumanMersViralEstimateInformation?: PrimaryHumanMersViralEstimateInformationResolvers<ContextType>;
  PrimaryMersEstimateInformation?: PrimaryMersEstimateInformationResolvers<ContextType>;
  PrimaryMersEstimateInformationInterface?: PrimaryMersEstimateInformationInterfaceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SarsCov2Estimate?: SarsCov2EstimateResolvers<ContextType>;
  SarsCov2FilterOptions?: SarsCov2FilterOptionsResolvers<ContextType>;
  TeamMember?: TeamMemberResolvers<ContextType>;
  TeamMemberGroup?: TeamMemberGroupResolvers<ContextType>;
  YearlyFaoCamelPopulationDataEntry?: YearlyFaoCamelPopulationDataEntryResolvers<ContextType>;
};

