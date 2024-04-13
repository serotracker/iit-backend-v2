import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  countryAlphaTwoCode: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  estimateId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  inclusionCriteria?: Maybe<Scalars['String']['output']>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  pathogen: Scalars['String']['output'];
  pediatricAgeGroup?: Maybe<Scalars['String']['output']>;
  producer?: Maybe<Scalars['String']['output']>;
  producerOther?: Maybe<Scalars['String']['output']>;
  sameFrameTargetGroup?: Maybe<Scalars['String']['output']>;
  sampleEndDate?: Maybe<Scalars['String']['output']>;
  sampleFrame?: Maybe<Scalars['String']['output']>;
  sampleNumerator?: Maybe<Scalars['Int']['output']>;
  sampleSize: Scalars['Int']['output'];
  sampleStartDate?: Maybe<Scalars['String']['output']>;
  seroprevalence?: Maybe<Scalars['Float']['output']>;
  seroprevalenceCalculated95CILower?: Maybe<Scalars['Float']['output']>;
  seroprevalenceCalculated95CIUpper?: Maybe<Scalars['Float']['output']>;
  seroprevalenceStudy95CILower?: Maybe<Scalars['Float']['output']>;
  seroprevalenceStudy95CIUpper?: Maybe<Scalars['Float']['output']>;
  serotype: Array<Scalars['String']['output']>;
  sex?: Maybe<Scalars['String']['output']>;
  sourceSheetId?: Maybe<Scalars['String']['output']>;
  sourceSheetName?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  unRegion?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  whoRegion?: Maybe<Scalars['String']['output']>;
};

export type ArbovirusFilterOptions = {
  __typename?: 'ArbovirusFilterOptions';
  ageGroup: Array<Scalars['String']['output']>;
  antibody: Array<Scalars['String']['output']>;
  assay: Array<Scalars['String']['output']>;
  country: Array<Scalars['String']['output']>;
  pathogen: Array<Scalars['String']['output']>;
  pediatricAgeGroup: Array<Scalars['String']['output']>;
  producer: Array<Scalars['String']['output']>;
  sampleFrame: Array<Scalars['String']['output']>;
  serotype: Array<Scalars['String']['output']>;
  sex: Array<Scalars['String']['output']>;
  unRegion: Array<Scalars['String']['output']>;
  whoRegion: Array<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  arbovirusDataStatistics: ArbovirusDataStatistics;
  arbovirusEstimates: Array<ArbovirusEstimate>;
  arbovirusFilterOptions?: Maybe<ArbovirusFilterOptions>;
  groupedTeamMembers: Array<TeamMemberGroup>;
  sarsCov2Estimates: Array<SarsCov2Estimate>;
  sarsCov2FilterOptions: SarsCov2FilterOptions;
};

export type SarsCov2Estimate = {
  __typename?: 'SarsCov2Estimate';
  ageGroup?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country: Scalars['String']['output'];
  id: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  populationGroup?: Maybe<Scalars['String']['output']>;
  riskOfBias?: Maybe<Scalars['String']['output']>;
  samplingEndDate?: Maybe<Scalars['String']['output']>;
  samplingStartDate?: Maybe<Scalars['String']['output']>;
  sex?: Maybe<Scalars['String']['output']>;
  sourceType?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
};

export type SarsCov2FilterOptions = {
  __typename?: 'SarsCov2FilterOptions';
  ageGroup: Array<Scalars['String']['output']>;
  country: Array<Scalars['String']['output']>;
  riskOfBias: Array<Scalars['String']['output']>;
  sourceType: Array<Scalars['String']['output']>;
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



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Affiliation: ResolverTypeWrapper<Affiliation>;
  ArbovirusDataStatistics: ResolverTypeWrapper<ArbovirusDataStatistics>;
  ArbovirusEstimate: ResolverTypeWrapper<ArbovirusEstimate>;
  ArbovirusFilterOptions: ResolverTypeWrapper<ArbovirusFilterOptions>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Query: ResolverTypeWrapper<{}>;
  SarsCov2Estimate: ResolverTypeWrapper<SarsCov2Estimate>;
  SarsCov2FilterOptions: ResolverTypeWrapper<SarsCov2FilterOptions>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TeamMember: ResolverTypeWrapper<TeamMember>;
  TeamMemberGroup: ResolverTypeWrapper<TeamMemberGroup>;
  TeamMemberSymbol: TeamMemberSymbol;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Affiliation: Affiliation;
  ArbovirusDataStatistics: ArbovirusDataStatistics;
  ArbovirusEstimate: ArbovirusEstimate;
  ArbovirusFilterOptions: ArbovirusFilterOptions;
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Query: {};
  SarsCov2Estimate: SarsCov2Estimate;
  SarsCov2FilterOptions: SarsCov2FilterOptions;
  String: Scalars['String']['output'];
  TeamMember: TeamMember;
  TeamMemberGroup: TeamMemberGroup;
};

export type AffiliationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Affiliation'] = ResolversParentTypes['Affiliation']> = {
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  countryAlphaTwoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimateId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inclusionCriteria?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  pathogen?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pediatricAgeGroup?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  producer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  producerOther?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sameFrameTargetGroup?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleEndDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleFrame?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleNumerator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sampleSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sampleStartDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  seroprevalence?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seroprevalenceCalculated95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seroprevalenceCalculated95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seroprevalenceStudy95CILower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seroprevalenceStudy95CIUpper?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  serotype?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  sex?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceSheetId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceSheetName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unRegion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  whoRegion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArbovirusFilterOptionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArbovirusFilterOptions'] = ResolversParentTypes['ArbovirusFilterOptions']> = {
  ageGroup?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  antibody?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  assay?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
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

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  arbovirusDataStatistics?: Resolver<ResolversTypes['ArbovirusDataStatistics'], ParentType, ContextType>;
  arbovirusEstimates?: Resolver<Array<ResolversTypes['ArbovirusEstimate']>, ParentType, ContextType>;
  arbovirusFilterOptions?: Resolver<Maybe<ResolversTypes['ArbovirusFilterOptions']>, ParentType, ContextType>;
  groupedTeamMembers?: Resolver<Array<ResolversTypes['TeamMemberGroup']>, ParentType, ContextType>;
  sarsCov2Estimates?: Resolver<Array<ResolversTypes['SarsCov2Estimate']>, ParentType, ContextType>;
  sarsCov2FilterOptions?: Resolver<ResolversTypes['SarsCov2FilterOptions'], ParentType, ContextType>;
};

export type SarsCov2EstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['SarsCov2Estimate'] = ResolversParentTypes['SarsCov2Estimate']> = {
  ageGroup?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  populationGroup?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  riskOfBias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingEndDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  samplingStartDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sex?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SarsCov2FilterOptionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SarsCov2FilterOptions'] = ResolversParentTypes['SarsCov2FilterOptions']> = {
  ageGroup?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  riskOfBias?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  sourceType?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
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

export type Resolvers<ContextType = any> = {
  Affiliation?: AffiliationResolvers<ContextType>;
  ArbovirusDataStatistics?: ArbovirusDataStatisticsResolvers<ContextType>;
  ArbovirusEstimate?: ArbovirusEstimateResolvers<ContextType>;
  ArbovirusFilterOptions?: ArbovirusFilterOptionsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SarsCov2Estimate?: SarsCov2EstimateResolvers<ContextType>;
  SarsCov2FilterOptions?: SarsCov2FilterOptionsResolvers<ContextType>;
  TeamMember?: TeamMemberResolvers<ContextType>;
  TeamMemberGroup?: TeamMemberGroupResolvers<ContextType>;
};

