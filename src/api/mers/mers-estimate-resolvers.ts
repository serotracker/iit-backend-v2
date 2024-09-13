import { MongoClient } from "mongodb";
import { assertNever } from "assert-never";
import {
  Clade,
  GenomeSequenced,
  MersEstimateFilterOptionsDocument,
  MersEstimateType,
  MersPrimaryEstimateDocument,
  MersSubEstimateBase,
  isHumanMersAgeGroupSubEstimate,
  isMersViralSubEstimateInformation
} from "../../storage/types.js";
import {
  QueryResolvers,
  MersAnimalSpecies as MersAnimalSpeciesForApi,
  MersAnimalType as MersAnimalTypeForApi,
  MersEstimateType as MersEstimateTypeForApi,
  Clade as CladeForApi,
  GenomeSequenced as GenomeSequencedForApi,
  PrimaryMersEstimateInformation,
  PrimaryMersEstimateInformationInterface,
  MersSubEstimateInterface,
} from "../graphql-types/__generated__/graphql-types.js";
import {
  MersAnimalSpecies,
  MersAnimalType
} from '../../storage/types.js';
import { mapUnRegionForApi, mapWhoRegionForApi } from "../shared/shared-mappers.js";

export const mersAnimalSpeciesMapForApi = {
  [MersAnimalSpecies.BAT]: MersAnimalSpeciesForApi.Bat,
  [MersAnimalSpecies.GOAT]: MersAnimalSpeciesForApi.Goat,
  [MersAnimalSpecies.CAMEL]: MersAnimalSpeciesForApi.Camel,
  [MersAnimalSpecies.CATTLE]: MersAnimalSpeciesForApi.Cattle,
  [MersAnimalSpecies.SHEEP]: MersAnimalSpeciesForApi.Sheep,
  [MersAnimalSpecies.DONKEY]: MersAnimalSpeciesForApi.Donkey,
  [MersAnimalSpecies.WATER_BUFFALO]: MersAnimalSpeciesForApi.WaterBuffalo,
  [MersAnimalSpecies.BABOON]: MersAnimalSpeciesForApi.Baboon
}
export const mapMersAnimalSpeciesForApi = (animalSpecies: MersAnimalSpecies): MersAnimalSpeciesForApi => mersAnimalSpeciesMapForApi[animalSpecies];

const mersAnimalTypeMapForApi = {
  [MersAnimalType.WILD]: MersAnimalTypeForApi.Wild,
  [MersAnimalType.DOMESTIC]: MersAnimalTypeForApi.Domestic,
}
export const mapMersAnimalTypeForApi = (animalType: MersAnimalType): MersAnimalTypeForApi => mersAnimalTypeMapForApi[animalType];

const cladeMapForApi = {
  [Clade.A]: CladeForApi.A,
  [Clade.B]: CladeForApi.B,
  [Clade.C1]: CladeForApi.C1,
  [Clade.C2]: CladeForApi.C2,
  [Clade.C]: CladeForApi.C,
}
export const mapCladeForApi = (clade: Clade): CladeForApi => cladeMapForApi[clade];

const genomeSequencedMapForApi = {
  [GenomeSequenced.FULL_LENGTH]: GenomeSequencedForApi.FullLength,
  [GenomeSequenced.PARTIAL_S_GENE]: GenomeSequencedForApi.PartialSGene,
  [GenomeSequenced.PARTIAL_N_GENE]: GenomeSequencedForApi.PartialNGene,
}
export const mapGenomeSequencedForApi = (genomeSequenced: GenomeSequenced): GenomeSequencedForApi => genomeSequencedMapForApi[genomeSequenced];

const getPrimaryMersEstimateInformationForDocument = (document: MersPrimaryEstimateDocument['primaryEstimateInfo']): PrimaryMersEstimateInformation => {
  const base: Omit<PrimaryMersEstimateInformationInterface, 'type'> = {
    id: document.id.toHexString(),
    estimateId: document.estimateId,
    city: document.city,
    state: document.state,
    district: document.district,
    country: document.country,
    countryAlphaTwoCode: document.countryAlphaTwoCode,
    countryAlphaThreeCode: document.countryAlphaThreeCode,
    latitude: document.latitude,
    longitude: document.longitude,
    whoRegion: document.whoRegion ? mapWhoRegionForApi(document.whoRegion) : undefined,
    unRegion: document.unRegion ? mapUnRegionForApi(document.unRegion) : undefined,
    firstAuthorFullName: document.firstAuthorFullName,
    sourcePublicationYear: document.sourcePublicationYear,
    sourceUrl: document.sourceUrl,
    sourceType: document.sourceType,
    sourceTitle: document.sourceTitle,
    insitutution: document.insitutution,
    studyInclusionCriteria: document.studyInclusionCriteria,
    studyExclusionCriteria: document.studyExclusionCriteria,
    sensitivity: document.sensitivity,
    sensitivity95CILower: document.sensitivity95CILower,
    sensitivity95CIUpper: document.sensitivity95CIUpper,
    sensitivityDenominator: document.sensitivityDenominator,
    specificity: document.specificity,
    specificity95CILower: document.specificity95CILower,
    specificity95CIUpper: document.specificity95CIUpper,
    specificityDenominator: document.specificityDenominator,
    sampleDenominator: document.sampleDenominator,
    sampleNumerator: document.sampleNumerator,
    assay: document.assay,
    specimenType: document.specimenType,
    sex: document.sex,
    socioeconomicStatus: document.socioeconomicStatus,
    exposureToCamels: document.exposureToCamels,
    isotypes: document.isotypes,
    antigen: document.antigen,
    samplingStartDate: document.samplingStartDate ? document.samplingStartDate.toISOString() : undefined,
    samplingEndDate: document.samplingEndDate ? document.samplingEndDate.toISOString() : undefined,
    samplingMidDate: document.samplingMidDate ? document.samplingMidDate.toISOString() : undefined,
    samplingMethod: document.samplingMethod,
    geographicScope: document.geographicScope,
    testProducer: document.testProducer,
    testProducerOther: document.testProducerOther,
    testValidatedOn: document.testValidatedOn,
    positiveCutoff: document.positiveCutoff,
    symptomPrevalenceOfPositives: document.symptomPrevalenceOfPositives,
    symptomDefinition: document.symptomDefinition,
    testValidation: document.testValidation,
    sequencingDone: document.sequencingDone,
    clade: document.clade
      .map((clade) => mapCladeForApi(clade)),
    accessionNumbers: document.accessionNumbers,
    genomeSequenced: document.genomeSequenced
      .map((genomeSequenced) => mapGenomeSequencedForApi(genomeSequenced)),
  }

  if(document.type === MersEstimateType.HUMAN_SEROPREVALENCE) {
    return {
      ...base,
      __typename: 'PrimaryHumanMersSeroprevalenceEstimateInformation',
      seroprevalence: document.seroprevalence,
      seroprevalence95CILower: document.seroprevalence95CILower,
      seroprevalence95CIUpper: document.seroprevalence95CIUpper,
      seroprevalenceCalculated95CILower: document.seroprevalenceCalculated95CILower,
      seroprevalenceCalculated95CIUpper: document.seroprevalenceCalculated95CIUpper,
      type: MersEstimateTypeForApi.HumanSeroprevalence,
      ageGroup: document.ageGroup,
      sampleFrame: document.sampleFrame,
      humanCountriesOfTravel: document.humanCountriesOfTravel
    }
  }

  if(document.type === MersEstimateType.ANIMAL_SEROPREVALENCE) {
    return {
      ...base,
      __typename: 'PrimaryAnimalMersSeroprevalenceEstimateInformation',
      seroprevalence: document.seroprevalence,
      seroprevalence95CILower: document.seroprevalence95CILower,
      seroprevalence95CIUpper: document.seroprevalence95CIUpper,
      seroprevalenceCalculated95CILower: document.seroprevalenceCalculated95CILower,
      seroprevalenceCalculated95CIUpper: document.seroprevalenceCalculated95CIUpper,
      type: MersEstimateTypeForApi.AnimalSeroprevalence,
      animalSpecies: mapMersAnimalSpeciesForApi(document.animalSpecies),
      animalType: document.animalType.map((animalType) => (mapMersAnimalTypeForApi(animalType))),
      animalDetectionSettings: document.animalDetectionSettings,
      animalPurpose: document.animalPurpose,
      animalImportedOrLocal: document.animalImportedOrLocal,
      animalAgeGroup: document.animalAgeGroup,
      animalCountriesOfImport: document.animalCountriesOfImport
    }
  }

  if(document.type === MersEstimateType.HUMAN_VIRAL) {
    return {
      ...base,
      __typename: 'PrimaryHumanMersViralEstimateInformation',
      positivePrevalence: document.positivePrevalence,
      positivePrevalence95CILower: document.positivePrevalence95CILower,
      positivePrevalence95CIUpper: document.positivePrevalence95CIUpper,
      positivePrevalenceCalculated95CILower: document.positivePrevalenceCalculated95CILower,
      positivePrevalenceCalculated95CIUpper: document.positivePrevalenceCalculated95CIUpper,
      type: MersEstimateTypeForApi.HumanViral,
      ageGroup: document.ageGroup,
      sampleFrame: document.sampleFrame,
      humanCountriesOfTravel: document.humanCountriesOfTravel
    }
  }

  if(document.type === MersEstimateType.ANIMAL_VIRAL) {
    return {
      ...base,
      __typename: 'PrimaryAnimalMersViralEstimateInformation',
      positivePrevalence: document.positivePrevalence,
      positivePrevalence95CILower: document.positivePrevalence95CILower,
      positivePrevalence95CIUpper: document.positivePrevalence95CIUpper,
      positivePrevalenceCalculated95CILower: document.positivePrevalenceCalculated95CILower,
      positivePrevalenceCalculated95CIUpper: document.positivePrevalenceCalculated95CIUpper,
      type: MersEstimateTypeForApi.AnimalViral,
      animalSpecies: mapMersAnimalSpeciesForApi(document.animalSpecies),
      animalType: document.animalType.map((animalType) => (mapMersAnimalTypeForApi(animalType))),
      animalDetectionSettings: document.animalDetectionSettings,
      animalPurpose: document.animalPurpose,
      animalImportedOrLocal: document.animalImportedOrLocal,
      animalAgeGroup: document.animalAgeGroup,
      animalCountriesOfImport: document.animalCountriesOfImport
    }
  }

  assertNever(document);
}

export const mapMersSubEstimateBaseForApi = (subestimate: MersSubEstimateBase): MersSubEstimateInterface => ({
  id: subestimate.id,
  estimateId: subestimate.estimateId,
  estimateInfo: isMersViralSubEstimateInformation(subestimate.estimateInfo) ? {
    __typename: 'MersViralSubEstimateInformation',
    sampleDenominator: subestimate.estimateInfo.sampleDenominator,
    sampleNumerator: subestimate.estimateInfo.sampleNumerator,
    positivePrevalence: subestimate.estimateInfo.positivePrevalence,
    positivePrevalence95CILower: subestimate.estimateInfo.positivePrevalence95CILower,
    positivePrevalence95CIUpper: subestimate.estimateInfo.positivePrevalence95CIUpper,
    positivePrevalenceCalculated95CILower: subestimate.estimateInfo.positivePrevalenceCalculated95CILower,
    positivePrevalenceCalculated95CIUpper: subestimate.estimateInfo.positivePrevalenceCalculated95CIUpper,
  } : {
    __typename: 'MersSeroprevalenceSubEstimateInformation',
    sampleDenominator: subestimate.estimateInfo.sampleDenominator,
    sampleNumerator: subestimate.estimateInfo.sampleNumerator,
    seroprevalence: subestimate.estimateInfo.seroprevalence,
    seroprevalence95CILower: subestimate.estimateInfo.seroprevalence95CILower,
    seroprevalence95CIUpper: subestimate.estimateInfo.seroprevalence95CIUpper,
    seroprevalenceCalculated95CILower: subestimate.estimateInfo.seroprevalenceCalculated95CILower,
    seroprevalenceCalculated95CIUpper: subestimate.estimateInfo.seroprevalenceCalculated95CIUpper,
  }
})


interface GenerateMersEstimateResolversInput {
  mongoClient: MongoClient;
}

interface GenerateMersEstimateResolversOutput {
  mersEstimateResolvers: { Query: QueryResolvers }
}

export const generateMersEstimateResolvers = (input: GenerateMersEstimateResolversInput): GenerateMersEstimateResolversOutput => {
  const { mongoClient } = input;
  const databaseName = process.env.DATABASE_NAME;

  if(!databaseName) {
    throw new Error("Unable to find value for DATABASE_NAME. Please make sure you have run generate-env-files.sh and have specified one in the appropriate environment file.")
  }

  const mersPrimaryEstimates = async () => {
    const mersPrimaryEstimatesCollection = mongoClient.db(databaseName).collection<MersPrimaryEstimateDocument>('mersPrimaryEstimates');
    const mersPrimaryEstimates = await mersPrimaryEstimatesCollection.find({}).toArray();

    return mersPrimaryEstimates.map((primaryEstimate) => ({
      id: primaryEstimate._id.toHexString(),
      estimateId: primaryEstimate.estimateId,
      primaryEstimateInfo: getPrimaryMersEstimateInformationForDocument(primaryEstimate.primaryEstimateInfo),
      geographicalAreaSubestimates: primaryEstimate.geographicalAreaSubestimates.map((subestimate) => ({
        ...mapMersSubEstimateBaseForApi(subestimate),
        __typename: 'MersGeographicalAreaSubEstimate' as const,
        city: subestimate.city,
        state: subestimate.state,
        district: subestimate.district,
        country: subestimate.country,
        countryAlphaTwoCode: subestimate.countryAlphaTwoCode,
        countryAlphaThreeCode: subestimate.countryAlphaThreeCode,
        latitude: subestimate.latitude,
        longitude: subestimate.longitude,
        whoRegion: subestimate.whoRegion ? mapWhoRegionForApi(subestimate.whoRegion) : undefined,
        unRegion: subestimate.unRegion ? mapUnRegionForApi(subestimate.unRegion) : undefined,
        geographicScope: subestimate.geographicScope,
      })),
      ageGroupSubestimates: primaryEstimate.ageGroupSubestimates.map((subestimate) => ({
        ...mapMersSubEstimateBaseForApi(subestimate),
        ...(isHumanMersAgeGroupSubEstimate(subestimate) ? {
          __typename: 'HumanMersAgeGroupSubEstimate' as const,
          ageGroup: subestimate.ageGroup,
          ageGroupLabel: subestimate.ageGroupLabel
        } : {
          __typename: 'AnimalMersAgeGroupSubEstimate' as const,
          animalAgeGroup: subestimate.animalAgeGroup,
          animalAgeGroupLabel: subestimate.animalAgeGroupLabel
        })
      })),
      testUsedSubestimates: primaryEstimate.testUsedSubestimates.map((subestimate) => ({
        ...mapMersSubEstimateBaseForApi(subestimate),
        __typename: 'MersTestUsedSubEstimate' as const,
        assay: subestimate.assay
      })),
      animalSpeciesSubestimates: primaryEstimate.animalSpeciesSubestimates.map((subestimate) => ({
        ...mapMersSubEstimateBaseForApi(subestimate),
        __typename: 'MersAnimalSpeciesSubEstimate' as const,
        animalSpecies: mapMersAnimalSpeciesForApi(subestimate.animalSpecies)
      })),
      sexSubestimates: primaryEstimate.sexSubestimates.map((subestimate) => ({
        ...mapMersSubEstimateBaseForApi(subestimate),
        __typename: 'MersSexSubEstimate' as const,
        sex: subestimate.sex
      })),
      timeFrameSubestimates: primaryEstimate.timeFrameSubestimates.map((subestimate) => ({
        ...mapMersSubEstimateBaseForApi(subestimate),
        __typename: 'MersTimeFrameSubEstimate' as const,
        samplingStartDate: subestimate.samplingStartDate.toISOString(),
        samplingEndDate: subestimate.samplingEndDate.toISOString()
      })),
      sampleTypeSubestimates: primaryEstimate.sampleTypeSubestimates.map((subestimate) => ({
        ...mapMersSubEstimateBaseForApi(subestimate),
        __typename: 'MersSampleTypeSubEstimate' as const,
        specimenType: subestimate.specimenType
      })),
      occupationSubestimates: primaryEstimate.occupationSubestimates.map((subestimate) => ({
        ...mapMersSubEstimateBaseForApi(subestimate),
        __typename: 'MersOccupationSubEstimate' as const,
        occupation: subestimate.occupation,
        sampleFrame: subestimate.sampleFrame,
        exposureToCamels: subestimate.exposureToCamels
      })),
      animalSourceLocationSubestimates: primaryEstimate.animalSourceLocationSubestimates.map((subestimate) => ({
        ...mapMersSubEstimateBaseForApi(subestimate),
        __typename: 'MersAnimalSourceLocationSubEstimate' as const,
        animalImportedOrLocal: subestimate.animalImportedOrLocal,
        animalCountryOfImport: subestimate.animalCountriesOfImport.at(0)?.country ?? 'Unknown',
        animalCountryOfImportAlphaTwoCode: subestimate.animalCountriesOfImport.at(0)?.countryAlphaTwoCode ?? 'CA',
        animalCountryOfImportAlphaThreeCode: subestimate.animalCountriesOfImport.at(0)?.countryAlphaThreeCode ?? 'CAN',
        animalCountriesOfImport: subestimate.animalCountriesOfImport.map((element) => ({
          name: element.country,
          alphaTwoCode: element.countryAlphaTwoCode,
          alphaThreeCode: element.countryAlphaThreeCode
        }))
      })),
      animalSamplingContextSubestimates: primaryEstimate.animalSamplingContextSubestimates.map((subestimate) => ({
        ...mapMersSubEstimateBaseForApi(subestimate),
        __typename: 'MersAnimalSamplingContextSubEstimate' as const,
        animalDetectionSettings: subestimate.animalDetectionSettings,
      })),
      camelExposureLevelSubestimates: primaryEstimate.camelExposureLevelSubestimates.map((subestimate) => ({
        ...mapMersSubEstimateBaseForApi(subestimate),
        __typename: 'MersCamelExposureLevelSubEstimate' as const,
        details: subestimate.details,
        sampleFrame: subestimate.sampleFrame,
        exposureToCamels: subestimate.exposureToCamels
      })),
      nomadismSubestimates: primaryEstimate.nomadismSubestimates.map((subestimate) => ({
        ...mapMersSubEstimateBaseForApi(subestimate),
        __typename: 'MersNomadismSubEstimate' as const,
        details: subestimate.details,
      }))
    }));
  }

  const mersEstimatesFilterOptions = async () => {
    const mersEstimateFilterOptionsCollection = mongoClient.db(databaseName).collection<MersEstimateFilterOptionsDocument>('mersEstimateFilterOptions');
    const mersEstimateFilterOptions = await mersEstimateFilterOptionsCollection.findOne({});

    return {
      sourceType: mersEstimateFilterOptions?.sourceType ?? [],
      ageGroup: mersEstimateFilterOptions?.ageGroup ?? [],
      assay: mersEstimateFilterOptions?.assay ?? [],
      specimenType: mersEstimateFilterOptions?.specimenType ?? [],
      sex: mersEstimateFilterOptions?.sex ?? [],
      isotypes: mersEstimateFilterOptions?.isotypes ?? [],
      samplingMethod: mersEstimateFilterOptions?.samplingMethod ?? [],
      geographicScope: mersEstimateFilterOptions?.geographicScope ?? [],
      animalDetectionSettings: mersEstimateFilterOptions?.animalDetectionSettings ?? [],
      animalPurpose: mersEstimateFilterOptions?.animalPurpose ?? [],
      animalImportedOrLocal: mersEstimateFilterOptions?.animalImportedOrLocal ?? [],
      sampleFrame: mersEstimateFilterOptions?.sampleFrame ?? [],
      exposureToCamels: mersEstimateFilterOptions?.exposureToCamels ?? [],
      antigen: mersEstimateFilterOptions?.antigen ?? [],
      testProducer: mersEstimateFilterOptions?.testProducer ?? [],
      testValidation: mersEstimateFilterOptions?.testValidation ?? []
    }
  }
  return {
    mersEstimateResolvers: {
      Query: {
        mersPrimaryEstimates,
        mersEstimatesFilterOptions,
      }
    }
  }
}