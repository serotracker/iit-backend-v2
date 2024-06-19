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

export type CountryIdentifiers = {
  __typename?: 'CountryIdentifiers';
  alphaThreeCode: Scalars['String']['output'];
  alphaTwoCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
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
  whoRegion?: Maybe<WhoRegion>;
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
  country: Scalars['String']['output'];
  countryAlphaThreeCode: Scalars['String']['output'];
  countryAlphaTwoCode: Scalars['String']['output'];
  id: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  whoRegion?: Maybe<WhoRegion>;
};

export type MersEvent = AnimalMersEvent | HumanMersEvent;

export enum MersEventAnimalSpecies {
  Bat = 'BAT',
  Camel = 'CAMEL'
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
  whoRegion?: Maybe<WhoRegion>;
};

export enum MersEventType {
  Animal = 'ANIMAL',
  Human = 'HUMAN'
}

export type MersFilterOptions = {
  __typename?: 'MersFilterOptions';
  countryIdentifiers: Array<CountryIdentifiers>;
  whoRegion: Array<WhoRegion>;
};

export type PartitionedFaoMersEventsInput = {
  partitionKey: Scalars['Int']['input'];
};

export type PartitionedFeoMersEventsOutput = {
  __typename?: 'PartitionedFeoMersEventsOutput';
  mersEvents: Array<MersEvent>;
  partitionKey: Scalars['Int']['output'];
};

export type PartitionedYearlyFaoCamelPopulationDataInput = {
  partitionKey: Scalars['Int']['input'];
};

export type PartitionedYearlyFaoCamelPopulationDataOutput = {
  __typename?: 'PartitionedYearlyFaoCamelPopulationDataOutput';
  partitionKey: Scalars['Int']['output'];
  yearlyFaoCamelPopulationData: Array<YearlyFaoCamelPopulationDataEntry>;
};

export type Query = {
  __typename?: 'Query';
  allFaoMersEventPartitionKeys: Array<Scalars['Int']['output']>;
  arbovirusDataStatistics: ArbovirusDataStatistics;
  arbovirusEstimates: Array<ArbovirusEstimate>;
  arbovirusFilterOptions: ArbovirusFilterOptions;
  groupedTeamMembers: Array<TeamMemberGroup>;
  mersEstimates: Array<MersEstimate>;
  mersFilterOptions: MersFilterOptions;
  partitionedFaoMersEvents: PartitionedFeoMersEventsOutput;
  partitionedYearlyFaoCamelPopulationData: PartitionedYearlyFaoCamelPopulationDataOutput;
  sarsCov2Estimates: Array<SarsCov2Estimate>;
  sarsCov2FilterOptions: SarsCov2FilterOptions;
  yearlyFaoCamelPopulationDataPartitionKeys: Array<Scalars['Int']['output']>;
};


export type QueryPartitionedFaoMersEventsArgs = {
  input: PartitionedFaoMersEventsInput;
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
  MersEvent: ( AnimalMersEvent ) | ( HumanMersEvent );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  MersEventInterface: ( AnimalMersEvent ) | ( HumanMersEvent );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Affiliation: ResolverTypeWrapper<Affiliation>;
  AnimalMersEvent: ResolverTypeWrapper<AnimalMersEvent>;
  Arbovirus: Arbovirus;
  ArbovirusDataStatistics: ResolverTypeWrapper<ArbovirusDataStatistics>;
  ArbovirusEstimate: ResolverTypeWrapper<ArbovirusEstimate>;
  ArbovirusFilterOptions: ResolverTypeWrapper<ArbovirusFilterOptions>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CountryIdentifiers: ResolverTypeWrapper<CountryIdentifiers>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GBDSubRegion: GbdSubRegion;
  GBDSuperRegion: GbdSuperRegion;
  HumanMersEvent: ResolverTypeWrapper<HumanMersEvent>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MersDiagnosisSource: MersDiagnosisSource;
  MersDiagnosisStatus: MersDiagnosisStatus;
  MersEstimate: ResolverTypeWrapper<MersEstimate>;
  MersEvent: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['MersEvent']>;
  MersEventAnimalSpecies: MersEventAnimalSpecies;
  MersEventAnimalType: MersEventAnimalType;
  MersEventInterface: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MersEventInterface']>;
  MersEventType: MersEventType;
  MersFilterOptions: ResolverTypeWrapper<MersFilterOptions>;
  PartitionedFaoMersEventsInput: PartitionedFaoMersEventsInput;
  PartitionedFeoMersEventsOutput: ResolverTypeWrapper<Omit<PartitionedFeoMersEventsOutput, 'mersEvents'> & { mersEvents: Array<ResolversTypes['MersEvent']> }>;
  PartitionedYearlyFaoCamelPopulationDataInput: PartitionedYearlyFaoCamelPopulationDataInput;
  PartitionedYearlyFaoCamelPopulationDataOutput: ResolverTypeWrapper<PartitionedYearlyFaoCamelPopulationDataOutput>;
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
  AnimalMersEvent: AnimalMersEvent;
  ArbovirusDataStatistics: ArbovirusDataStatistics;
  ArbovirusEstimate: ArbovirusEstimate;
  ArbovirusFilterOptions: ArbovirusFilterOptions;
  Boolean: Scalars['Boolean']['output'];
  CountryIdentifiers: CountryIdentifiers;
  Float: Scalars['Float']['output'];
  HumanMersEvent: HumanMersEvent;
  Int: Scalars['Int']['output'];
  MersEstimate: MersEstimate;
  MersEvent: ResolversUnionTypes<ResolversParentTypes>['MersEvent'];
  MersEventInterface: ResolversInterfaceTypes<ResolversParentTypes>['MersEventInterface'];
  MersFilterOptions: MersFilterOptions;
  PartitionedFaoMersEventsInput: PartitionedFaoMersEventsInput;
  PartitionedFeoMersEventsOutput: Omit<PartitionedFeoMersEventsOutput, 'mersEvents'> & { mersEvents: Array<ResolversParentTypes['MersEvent']> };
  PartitionedYearlyFaoCamelPopulationDataInput: PartitionedYearlyFaoCamelPopulationDataInput;
  PartitionedYearlyFaoCamelPopulationDataOutput: PartitionedYearlyFaoCamelPopulationDataOutput;
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
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MersEstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersEstimate'] = ResolversParentTypes['MersEstimate']> = {
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaThreeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAlphaTwoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
};

export type MersFilterOptionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['MersFilterOptions'] = ResolversParentTypes['MersFilterOptions']> = {
  countryIdentifiers?: Resolver<Array<ResolversTypes['CountryIdentifiers']>, ParentType, ContextType>;
  whoRegion?: Resolver<Array<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PartitionedFeoMersEventsOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['PartitionedFeoMersEventsOutput'] = ResolversParentTypes['PartitionedFeoMersEventsOutput']> = {
  mersEvents?: Resolver<Array<ResolversTypes['MersEvent']>, ParentType, ContextType>;
  partitionKey?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PartitionedYearlyFaoCamelPopulationDataOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['PartitionedYearlyFaoCamelPopulationDataOutput'] = ResolversParentTypes['PartitionedYearlyFaoCamelPopulationDataOutput']> = {
  partitionKey?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  yearlyFaoCamelPopulationData?: Resolver<Array<ResolversTypes['YearlyFaoCamelPopulationDataEntry']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allFaoMersEventPartitionKeys?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  arbovirusDataStatistics?: Resolver<ResolversTypes['ArbovirusDataStatistics'], ParentType, ContextType>;
  arbovirusEstimates?: Resolver<Array<ResolversTypes['ArbovirusEstimate']>, ParentType, ContextType>;
  arbovirusFilterOptions?: Resolver<ResolversTypes['ArbovirusFilterOptions'], ParentType, ContextType>;
  groupedTeamMembers?: Resolver<Array<ResolversTypes['TeamMemberGroup']>, ParentType, ContextType>;
  mersEstimates?: Resolver<Array<ResolversTypes['MersEstimate']>, ParentType, ContextType>;
  mersFilterOptions?: Resolver<ResolversTypes['MersFilterOptions'], ParentType, ContextType>;
  partitionedFaoMersEvents?: Resolver<ResolversTypes['PartitionedFeoMersEventsOutput'], ParentType, ContextType, RequireFields<QueryPartitionedFaoMersEventsArgs, 'input'>>;
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
  whoRegion?: Resolver<Maybe<ResolversTypes['WHORegion']>, ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Affiliation?: AffiliationResolvers<ContextType>;
  AnimalMersEvent?: AnimalMersEventResolvers<ContextType>;
  ArbovirusDataStatistics?: ArbovirusDataStatisticsResolvers<ContextType>;
  ArbovirusEstimate?: ArbovirusEstimateResolvers<ContextType>;
  ArbovirusFilterOptions?: ArbovirusFilterOptionsResolvers<ContextType>;
  CountryIdentifiers?: CountryIdentifiersResolvers<ContextType>;
  HumanMersEvent?: HumanMersEventResolvers<ContextType>;
  MersEstimate?: MersEstimateResolvers<ContextType>;
  MersEvent?: MersEventResolvers<ContextType>;
  MersEventInterface?: MersEventInterfaceResolvers<ContextType>;
  MersFilterOptions?: MersFilterOptionsResolvers<ContextType>;
  PartitionedFeoMersEventsOutput?: PartitionedFeoMersEventsOutputResolvers<ContextType>;
  PartitionedYearlyFaoCamelPopulationDataOutput?: PartitionedYearlyFaoCamelPopulationDataOutputResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SarsCov2Estimate?: SarsCov2EstimateResolvers<ContextType>;
  SarsCov2FilterOptions?: SarsCov2FilterOptionsResolvers<ContextType>;
  TeamMember?: TeamMemberResolvers<ContextType>;
  TeamMemberGroup?: TeamMemberGroupResolvers<ContextType>;
  YearlyFaoCamelPopulationDataEntry?: YearlyFaoCamelPopulationDataEntryResolvers<ContextType>;
};

