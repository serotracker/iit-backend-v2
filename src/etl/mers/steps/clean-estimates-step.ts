import { MongoClient } from "mongodb";
import {
  EstimateFieldsAfterCleaningStudiesStep,
  CountryPopulationDataAfterCleaningStudiesStep,
  FaoMersEventAfterCleaningStudiesStep,
  SourceFieldsAfterCleaningStudiesStep,
  StudyFieldsAfterCleaningStudiesStep,
  YearlyCamelPopulationDataAfterCleaningStudiesStep,
  CountryFieldsAfterCleaningStudiesStep,
  MacroSampleFrameFieldsAfterCleaningStudiesStep
} from "./clean-studies-step";
import {
  Clade,
  GenomeSequenced,
  MersAnimalSpecies,
  MersAnimalType,
  MersEstimateType,
  MersSubGroupingVariable,
  isMersAnimalType,
  isMersSubGroupingVariable
} from "../../../storage/types.js";

export type EstimateFieldsAfterCleaningEstimatesStep = {
  id: string;
  type: MersEstimateType;
  subGroupingVariable: MersSubGroupingVariable;
  subGroupingCategory: string | undefined;
  populationType: string;
  estimateType: string;
  positivePrevalence: number;
  positivePrevalence95CILower: number | undefined;
  positivePrevalence95CIUpper: number | undefined;
  positivePrevalenceCalculated95CILower: number;
  positivePrevalenceCalculated95CIUpper: number;
  ageGroup: string[];
  animalAgeGroup: string[];
  estimateId: string;
  city: string | undefined;
  state: string | undefined;
  district: string | undefined;
  countryId: string | undefined;
  studyId: string | undefined;
  animalType: MersAnimalType[];
  animalSpecies: MersAnimalSpecies | undefined;
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
  ageMinimum: number | undefined;
  ageMaximum: number | undefined;
  samplingStartDate: string | undefined;
  samplingEndDate: string | undefined;
  assay: string[];
  specimenType: string[];
  sex: string | undefined;
  socioeconomicStatus: string | undefined;
  exposureToCamels: string | undefined;
  isotypes: string[];
  antigen: string[];
  samplingMethod: string | undefined;
  geographicScope: string | undefined;
  testProducer: string[];
  testProducerOther: string | undefined;
  testValidation: string[];
  testValidatedOn: string | undefined;
  positiveCutoff: string | undefined;
  sampleFrame: string | undefined;
  animalDetectionSettings: string[];
  animalPurpose: string | undefined;
  animalImportedOrLocal: string | undefined;
  animalCountryOfImportIds: string[];
  humanCountryOfTravelIds: string[];
  symptomPrevalenceOfPositives: number | undefined;
  symptomDefinition: string | undefined;
  sequencingDone: boolean;
  clade: Clade[];
  accessionNumbers: string | undefined;
  genomeSequenced: GenomeSequenced[];
}
export type SourceFieldsAfterCleaningEstimatesStep = SourceFieldsAfterCleaningStudiesStep;
export type StudyFieldsAfterCleaningEstimatesStep = StudyFieldsAfterCleaningStudiesStep;
export type CountryFieldsAfterCleaningEstimatesStep = CountryFieldsAfterCleaningStudiesStep;
export type MacroSampleFrameFieldsAfterCleaningEstimatesStep = MacroSampleFrameFieldsAfterCleaningStudiesStep;
export type FaoMersEventAfterCleaningEstimatesStep = FaoMersEventAfterCleaningStudiesStep;
export type YearlyCamelPopulationDataAfterCleaningEstimatesStep = YearlyCamelPopulationDataAfterCleaningStudiesStep;
export type CountryPopulationDataAfterCleaningEstimatesStep = CountryPopulationDataAfterCleaningStudiesStep;

export const deriveTypeFromCleanedEstimate = (estimate: Omit<EstimateFieldsAfterCleaningEstimatesStep, 'type'>): EstimateFieldsAfterCleaningEstimatesStep['type'] | undefined => {
  if(estimate.populationType === 'Human' && estimate.estimateType === 'Serological testing') {
    return MersEstimateType.HUMAN_SEROPREVALENCE;
  }
  if(estimate.populationType === 'Human' && estimate.estimateType === 'Viral testing') {
    return MersEstimateType.HUMAN_VIRAL;
  }
  if(estimate.populationType === 'Animal' && estimate.estimateType === 'Viral testing') {
    return MersEstimateType.ANIMAL_VIRAL;
  }
  if(estimate.populationType === 'Animal' && estimate.estimateType === 'Serological testing') {
    return MersEstimateType.ANIMAL_SEROPREVALENCE;
  }

  return undefined;
}

interface CleanEstimatesStepInput {
  allEstimates: EstimateFieldsAfterCleaningStudiesStep[];
  allSources: SourceFieldsAfterCleaningStudiesStep[];
  allStudies: StudyFieldsAfterCleaningStudiesStep[];
  allCountries: CountryFieldsAfterCleaningStudiesStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterCleaningStudiesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningStudiesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningStudiesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningStudiesStep[];
  mongoClient: MongoClient;
}

interface CleanEstimatesStepOutput {
  allEstimates: EstimateFieldsAfterCleaningEstimatesStep[];
  allSources: SourceFieldsAfterCleaningEstimatesStep[];
  allStudies: StudyFieldsAfterCleaningEstimatesStep[];
  allCountries: CountryFieldsAfterCleaningEstimatesStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterCleaningEstimatesStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningEstimatesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningEstimatesStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningEstimatesStep[];
  mongoClient: MongoClient;
}

const deriveSubgroupingVariableFromEstimate = (estimate: Pick<EstimateFieldsAfterCleaningStudiesStep, 'Sub-grouping variable'>): MersSubGroupingVariable | undefined => {
  const subGroupingVariableString = estimate['Sub-grouping variable'];

  const formattedSubGroupingVariableString = subGroupingVariableString.replaceAll(" ", "_").toUpperCase();

  if (isMersSubGroupingVariable(formattedSubGroupingVariableString)) {
    return formattedSubGroupingVariableString;
  }

  return undefined;
}

const deriveAnimalSpeciesFromEstimate = (estimate: Pick<EstimateFieldsAfterCleaningStudiesStep, 'Species'>): MersAnimalSpecies | undefined => {
  const speciesString = estimate['Species'];

  if(!speciesString) {
    return undefined;
  }

  const speciesStringNoCapitalization = speciesString.toLowerCase();

  if(speciesStringNoCapitalization?.includes('camel')) {
    return MersAnimalSpecies.CAMEL;
  }

  if(speciesStringNoCapitalization?.includes('bat')) {
    return MersAnimalSpecies.BAT;
  }

  if(speciesStringNoCapitalization?.includes('goat')) {
    return MersAnimalSpecies.GOAT;
  }

  if(speciesStringNoCapitalization?.includes('cattle') || speciesStringNoCapitalization?.includes('cow')) {
    return MersAnimalSpecies.CATTLE;
  }

  if(speciesStringNoCapitalization?.includes('sheep')) {
    return MersAnimalSpecies.SHEEP;
  }

  if(speciesStringNoCapitalization?.includes('donkey')) {
    return MersAnimalSpecies.DONKEY;
  }

  if(speciesStringNoCapitalization?.includes('water buffalo')) {
    return MersAnimalSpecies.WATER_BUFFALO;
  }

  if(speciesStringNoCapitalization?.includes('baboon')) {
    return MersAnimalSpecies.BABOON;
  }

  return undefined;
}

const textCladeToEnumCladeMap: Record<string, Clade | undefined> = {
  ['A']: Clade.A,
  ['B']: Clade.B,
  ['C1']: Clade.C1,
  ['C2']: Clade.C2,
  ['C']: Clade.C
}

const textGenomeSequencedToEnumGenomeSequencedMap: Record<string, GenomeSequenced | undefined> = {
  ['Full length']: GenomeSequenced.FULL_LENGTH,
  ['Partial S gene']: GenomeSequenced.PARTIAL_S_GENE,
  ['Partial N gene']: GenomeSequenced.PARTIAL_N_GENE,
}

export const cleanEstimatesStep = (input: CleanEstimatesStepInput): CleanEstimatesStepOutput => {
  return {
    allEstimates: input.allEstimates
      .map((estimate) => ({
        id: estimate['id'],
        subGroupingVariable: deriveSubgroupingVariableFromEstimate(estimate),
        subGroupingCategory: estimate['Sub-group specific category'] ?? undefined,
        populationType: estimate['Population Type'],
        estimateType: estimate['Estimate Type'],
        positivePrevalence: estimate['Prevalence'],
        positivePrevalence95CILower: estimate['Prevalence 95% CI Lower'] !== null ? estimate['Prevalence 95% CI Lower'] : undefined,
        positivePrevalence95CIUpper: estimate['Prevalence 95% CI Upper'] !== null ? estimate['Prevalence 95% CI Upper'] : undefined,
        positivePrevalenceCalculated95CILower: estimate['Prevalence 95% CI Lower (calculated)'],
        positivePrevalenceCalculated95CIUpper: estimate['Prevalence 95% CI Upper (calculated)'],
        ageGroup: estimate['Age Group (Human)'].filter((element): element is NonNullable<typeof element> => !!element),
        animalAgeGroup: estimate['Age Group (Animal)'].filter((element): element is NonNullable<typeof element> => !!element),
        estimateId: estimate['Prevalence Estimate Name'],
        city: estimate['City'] ?? undefined,
        district: estimate['District'] ?? undefined,
        state: estimate['State/Province'] ?? undefined,
        countryId: estimate['Country']
          .filter((element): element is NonNullable<typeof element> => !!element)
          .at(0),
        studyId: estimate['Study']
          .filter((element): element is NonNullable<typeof element> => !!element)
          .at(0),
        animalSpecies: deriveAnimalSpeciesFromEstimate(estimate),
        animalType: estimate['Animal type']
          .filter((animalType): animalType is NonNullable<typeof animalType> => !!animalType)
          .map((animalType) => animalType.toUpperCase())
          .filter((animalType): animalType is MersAnimalType => isMersAnimalType(animalType)),
        sensitivity: estimate['Sensitivity'] !== null ? estimate['Sensitivity'] : undefined,
        sensitivity95CILower: estimate['Sensitivity, 95% CI Lower'] !== null ? estimate['Sensitivity, 95% CI Lower'] : undefined,
        sensitivity95CIUpper: estimate['Sensitivity, 95% CI Upper'] !== null ? estimate['Sensitivity, 95% CI Upper'] : undefined,
        sensitivityDenominator: estimate['Sensitivity Denominator'] !== null ? estimate['Sensitivity Denominator'] : undefined,
        specificity: estimate['Specificity'] !== null ? estimate['Specificity'] : undefined,
        specificity95CILower: estimate['Specificity, 95% CI Lower'] !== null ? estimate['Specificity, 95% CI Lower'] : undefined,
        specificity95CIUpper: estimate['Specificity, 95% CI Upper'] !== null ? estimate['Specificity, 95% CI Upper'] : undefined,
        specificityDenominator: estimate['Specificity Denominator'] !== null ? estimate['Specificity Denominator'] : undefined,
        ageMaximum: estimate['Age Maximum'] ?? undefined,
        ageMinimum: estimate['Age Minimum'] ?? undefined,
        sampleDenominator: estimate['Denominator'] !== null ? estimate['Denominator'] : undefined,
        sampleNumerator: estimate['Numerator'] !== null ? estimate['Numerator'] : undefined,
        assay: estimate['Assay Type'].filter((element): element is NonNullable<typeof element> => !!element),
        specimenType: estimate['Specimen Type']
          .filter((element): element is NonNullable<typeof element> => !!element),
        sex: estimate['Sex'] ?? undefined,
        socioeconomicStatus: estimate['Socioeconomic status'] ?? undefined,
        exposureToCamels: estimate['Exposure to camels'] ?? undefined,
        isotypes: estimate['Isotype(s)'].filter((element): element is NonNullable<typeof element> => !!element),
        antigen: estimate['Antigen or gene'].filter((element): element is NonNullable<typeof element> => !!element),
        samplingStartDate: estimate['Sample Start Date'] ?? undefined,
        samplingEndDate: estimate['Sample End Date'] ?? undefined,
        samplingMethod: estimate['Sampling Method'] ?? undefined,
        geographicScope: estimate['Geographic scope'] ?? undefined,
        testProducer: estimate['Producer'].filter((element): element is NonNullable<typeof element> => !!element),
        testProducerOther: estimate['Producer - Other'] ?? undefined,
        testValidation: estimate['Test Validation'].filter((element): element is NonNullable<typeof element> => !!element),
        testValidatedOn: estimate['Species Test Validated On'] ?? undefined,
        positiveCutoff: estimate['Positive Cut-off'] ?? undefined,
        animalDetectionSettings: estimate['Sample Frame (Animal)'].filter((element): element is NonNullable<typeof element> => !!element),
        animalPurpose: estimate['Animal purpose'] ?? undefined,
        animalImportedOrLocal: estimate['Imported or Local']
          .filter((element): element is NonNullable<typeof element> => !!element)
          .at(0),
        animalCountryOfImportIds: estimate['Country of Import']
          .filter((element): element is NonNullable<typeof element> => !!element),
        humanCountryOfTravelIds: estimate['Country of travel']
          .filter((element): element is NonNullable<typeof element> => !!element),
        sampleFrame: estimate['Sample Frame (Human)'] ?? undefined,
        symptomPrevalenceOfPositives: estimate['Symptom Prevalence of Positives'] ?? undefined,
        symptomDefinition: estimate['Symptom definition'] ?? undefined,
        sequencingDone: estimate['Sequencing done'],
        clade: estimate['Clade']
          .filter((element): element is NonNullable<typeof element> => !!element)
          .map((element): Clade | undefined => textCladeToEnumCladeMap[element])
          .filter((element): element is NonNullable<typeof element> => !!element),
        accessionNumbers: estimate['Accession numbers'] ?? undefined,
        genomeSequenced: estimate['Genome coverage']
          .filter((element): element is NonNullable<typeof element> => !!element)
          .map((element): GenomeSequenced | undefined => textGenomeSequencedToEnumGenomeSequencedMap[element])
          .filter((element): element is NonNullable<typeof element> => !!element),
      }))
      .filter((estimate): estimate is Omit<typeof estimate, 'subGroupingVariable'> & {subGroupingVariable: NonNullable<typeof estimate['subGroupingVariable']>} => !!estimate.subGroupingVariable)
      .map((estimate) => ({
        ...estimate,
        type: deriveTypeFromCleanedEstimate(estimate)
      }))
      .filter((estimate): estimate is Omit<typeof estimate, 'type'> & {type: NonNullable<typeof estimate['type']>} => !!estimate.type),
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  }
}