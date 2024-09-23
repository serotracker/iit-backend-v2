import { MongoClient } from "mongodb";
import { ThreeLetterIsoCountryCode, TwoLetterIsoCountryCode } from "../../../lib/geocoding-api/country-codes";
import { WHORegion, getWHORegionFromAlphaTwoCode } from "../../../lib/who-regions.js";
import { UNRegion, getUNRegionFromAlphaTwoCode } from "../../../lib/un-regions.js";
import {
  EstimateFieldsAfterCombiningEstimatesWithStudiesStep,
  SourceFieldsAfterCombiningEstimatesWithStudiesStep,
  StudyFieldsAfterCombiningEstimatesWithStudiesStep,
  FaoMersEventAfterCombiningEstimatesWithStudiesStep,
  YearlyCamelPopulationDataAfterCombiningEstimatesWithStudiesStep,
  CountryPopulationDataAfterCombiningEstimatesWithStudiesStep,
  CountryFieldsAfterCombiningEstimatesWithStudiesStep,
  MacroSampleFrameFieldsAfterCombiningEstimatesWithStudiesStep,
} from "./combine-estimates-with-studies-step";

export type EstimateFieldsAfterAddingCountryAndRegionInformationStep = EstimateFieldsAfterCombiningEstimatesWithStudiesStep & {
  country: string;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  countryAlphaThreeCode: ThreeLetterIsoCountryCode;
  whoRegion: WHORegion | undefined;
  unRegion: UNRegion | undefined;
  animalCountriesOfImport: Array<{
    country: string;
    countryAlphaTwoCode: TwoLetterIsoCountryCode;
    countryAlphaThreeCode: ThreeLetterIsoCountryCode;
    whoRegion: WHORegion | undefined;
    unRegion: UNRegion | undefined;
  }>;
  humanCountriesOfTravel: Array<{
    country: string;
    countryAlphaTwoCode: TwoLetterIsoCountryCode;
    countryAlphaThreeCode: ThreeLetterIsoCountryCode;
    whoRegion: WHORegion | undefined;
    unRegion: UNRegion | undefined;
  }>;
};

export type SourceFieldsAfterAddingCountryAndRegionInformationStep = SourceFieldsAfterCombiningEstimatesWithStudiesStep;
export type StudyFieldsAfterAddingCountryAndRegionInformationStep = StudyFieldsAfterCombiningEstimatesWithStudiesStep;
export type CountryFieldsAfterAddingCountryAndRegionInformationStep = CountryFieldsAfterCombiningEstimatesWithStudiesStep;
export type MacroSampleFrameFieldsAfterAddingCountryAndRegionInformationStep = MacroSampleFrameFieldsAfterCombiningEstimatesWithStudiesStep;

export type FaoMersEventAfterAddingCountryAndRegionInformationStep = FaoMersEventAfterCombiningEstimatesWithStudiesStep & {
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  countryAlphaThreeCode: ThreeLetterIsoCountryCode;
  whoRegion: WHORegion | undefined;
  unRegion: UNRegion | undefined;
};

export type YearlyCamelPopulationDataAfterAddingCountryAndRegionInformationStep = YearlyCamelPopulationDataAfterCombiningEstimatesWithStudiesStep & {
  whoRegion: WHORegion | undefined;
  unRegion: UNRegion | undefined;
};
export type CountryPopulationDataAfterAddingCountryAndRegionInformationStep = CountryPopulationDataAfterCombiningEstimatesWithStudiesStep;

interface AddCountryAndRegionInformationStepInput {
  allEstimates: EstimateFieldsAfterCombiningEstimatesWithStudiesStep[];
  allSources: SourceFieldsAfterCombiningEstimatesWithStudiesStep[];
  allStudies: StudyFieldsAfterCombiningEstimatesWithStudiesStep[];
  allCountries: CountryFieldsAfterCombiningEstimatesWithStudiesStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterCombiningEstimatesWithStudiesStep[];
  allFaoMersEvents: FaoMersEventAfterCombiningEstimatesWithStudiesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCombiningEstimatesWithStudiesStep[];
  countryPopulationData: CountryPopulationDataAfterCombiningEstimatesWithStudiesStep[];
  mongoClient: MongoClient;
}

interface AddCountryAndRegionInformationStepOutput {
  allEstimates: EstimateFieldsAfterAddingCountryAndRegionInformationStep[];
  allSources: SourceFieldsAfterAddingCountryAndRegionInformationStep[];
  allStudies: StudyFieldsAfterAddingCountryAndRegionInformationStep[];
  allCountries: CountryFieldsAfterAddingCountryAndRegionInformationStep[];
  allMacroSampleFrames: MacroSampleFrameFieldsAfterAddingCountryAndRegionInformationStep[];
  allFaoMersEvents: FaoMersEventAfterAddingCountryAndRegionInformationStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterAddingCountryAndRegionInformationStep[];
  countryPopulationData: CountryPopulationDataAfterAddingCountryAndRegionInformationStep[];
  mongoClient: MongoClient;
}

const faoMersEventCountryToAlphaTwoAndAlphaThreeCode: Record<string, {
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  countryAlphaThreeCode: ThreeLetterIsoCountryCode;
} | undefined> = {
  "Algeria": { countryAlphaTwoCode: 'DZ', countryAlphaThreeCode: 'DZA' },
  "Austria": { countryAlphaTwoCode: 'AT', countryAlphaThreeCode: 'AUT' },
  "Bahrain": { countryAlphaTwoCode: 'BH', countryAlphaThreeCode: 'BHR' },
  "China": { countryAlphaTwoCode: 'CN', countryAlphaThreeCode: 'CHN' },
  "Denmark": { countryAlphaTwoCode: 'DK', countryAlphaThreeCode: 'DNK' },
  "Egypt": { countryAlphaTwoCode: 'EG', countryAlphaThreeCode: 'EGY' },
  "France": { countryAlphaTwoCode: 'FR', countryAlphaThreeCode: 'FRA' },
  "Germany": { countryAlphaTwoCode: 'DE', countryAlphaThreeCode: 'DEU' },
  "Greece": { countryAlphaTwoCode: 'GR', countryAlphaThreeCode: 'GRC' },
  "Hong Kong  SAR": { countryAlphaTwoCode: 'HK', countryAlphaThreeCode: 'HKG' },
  "Iran  (Islamic Republic of)": { countryAlphaTwoCode: 'IR', countryAlphaThreeCode: 'IRN' },
  "Iraq": { countryAlphaTwoCode: 'IQ', countryAlphaThreeCode: 'IRQ' },
  "Italy": { countryAlphaTwoCode: 'IT', countryAlphaThreeCode: 'ITA' },
  "Jordan": { countryAlphaTwoCode: 'JO', countryAlphaThreeCode: 'JOR' },
  "Kenya": { countryAlphaTwoCode: 'KE', countryAlphaThreeCode: 'KEN' },
  "Kuwait": { countryAlphaTwoCode: 'KW', countryAlphaThreeCode: 'KWT' },
  "Lebanon": { countryAlphaTwoCode: 'LB', countryAlphaThreeCode: 'LBN' },
  "Malaysia": { countryAlphaTwoCode: 'MY', countryAlphaThreeCode: 'MYS' },
  "Netherlands": { countryAlphaTwoCode: 'NL', countryAlphaThreeCode: 'NLD' },
  "Oman": { countryAlphaTwoCode: 'OM', countryAlphaThreeCode: 'OMN' },
  "Philippines": { countryAlphaTwoCode: 'PH', countryAlphaThreeCode: 'PHL' },
  "Qatar": { countryAlphaTwoCode: 'QA', countryAlphaThreeCode: 'QAT' },
  "Republic of Korea": { countryAlphaTwoCode: 'KR', countryAlphaThreeCode: 'KOR' },
  "Saudi Arabia": { countryAlphaTwoCode: 'SA', countryAlphaThreeCode: 'SAU' },
  "Thailand": { countryAlphaTwoCode: 'TH', countryAlphaThreeCode: 'THA' },
  "Tunisia": { countryAlphaTwoCode: 'TN', countryAlphaThreeCode: 'TUN' },
  "Turkey": { countryAlphaTwoCode: 'TR', countryAlphaThreeCode: 'TUR' },
  "U.K. of Great Britain and Northern Ireland": { countryAlphaTwoCode: 'GB', countryAlphaThreeCode: 'GBR' },
  "United Arab Emirates": { countryAlphaTwoCode: 'AE', countryAlphaThreeCode: 'ARE' },
  "United States of America": { countryAlphaTwoCode: 'US', countryAlphaThreeCode: 'USA' },
  "Yemen": { countryAlphaTwoCode: 'YE', countryAlphaThreeCode: 'YEM' }
}

interface AddCountryInformationToEstimateInput<TMersEstimate extends EstimateFieldsAfterCombiningEstimatesWithStudiesStep> {
  estimate: TMersEstimate;
  allCountries: CountryFieldsAfterCombiningEstimatesWithStudiesStep[];
}

export const addCountryInformationToEstimate = <
  TMersEstimate extends EstimateFieldsAfterCombiningEstimatesWithStudiesStep
>(input: AddCountryInformationToEstimateInput<TMersEstimate>): TMersEstimate & ({
  country: string;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  countryAlphaThreeCode: ThreeLetterIsoCountryCode;
  whoRegion: WHORegion | undefined;
  unRegion: UNRegion | undefined;
} | {
  country: undefined;
}) => {
  const countryId = input.estimate.countryId;

  if(!countryId) {
    return {
      ...input.estimate,
      country: undefined
    }
  }

  const country = input.allCountries.find((country) => country.id === input.estimate.countryId);

  if(!country) {
    return {
      ...input.estimate,
      country: undefined
    }
  }

  const whoRegion = getWHORegionFromAlphaTwoCode(country.countryAlphaTwoCode);
  const unRegion = getUNRegionFromAlphaTwoCode(country.countryAlphaTwoCode);

  return {
    ...input.estimate,
    country: country.countryName,
    countryAlphaTwoCode: country.countryAlphaTwoCode,
    countryAlphaThreeCode: country.countryAlphaThreeCode,
    whoRegion,
    unRegion,
  }
}

interface AddAnimalCountryOfImportInformationToEstimateInput<TMersEstimate extends EstimateFieldsAfterCombiningEstimatesWithStudiesStep> {
  estimate: TMersEstimate;
  allCountries: CountryFieldsAfterCombiningEstimatesWithStudiesStep[];
}

export const addAnimalCountriesOfImportInformationToEstimate = <
  TMersEstimate extends EstimateFieldsAfterCombiningEstimatesWithStudiesStep
>(input: AddAnimalCountryOfImportInformationToEstimateInput<TMersEstimate>): TMersEstimate & ({
  animalCountriesOfImport: Array<{
    country: string;
    countryAlphaTwoCode: TwoLetterIsoCountryCode;
    countryAlphaThreeCode: ThreeLetterIsoCountryCode;
    whoRegion: WHORegion | undefined;
    unRegion: UNRegion | undefined;
  }>
}) => {
  const animalCountriesOfImport = input.estimate.animalCountryOfImportIds
    .map((countryOfImportId) => {
      if(!countryOfImportId) {
        return undefined;
      }

      const countryOfImport = input.allCountries.find((country) => country.id === countryOfImportId);

      if(!countryOfImport) {
        return undefined;
      }

      const whoRegion = getWHORegionFromAlphaTwoCode(countryOfImport.countryAlphaTwoCode);
      const unRegion = getUNRegionFromAlphaTwoCode(countryOfImport.countryAlphaTwoCode);

      return {
        country: countryOfImport.countryName,
        countryAlphaTwoCode: countryOfImport.countryAlphaTwoCode,
        countryAlphaThreeCode: countryOfImport.countryAlphaThreeCode,
        whoRegion,
        unRegion,
      }
    })
    .filter((element): element is NonNullable<typeof element> => !!element)
    .sort((countryA, countryB) => countryA.country > countryB.country ? 1 : -1);
  
  return {
    ...input.estimate,
    animalCountriesOfImport
  }
}

interface AddHumanCountriesOfTravelInformationToEstimateInput<TMersEstimate extends EstimateFieldsAfterCombiningEstimatesWithStudiesStep> {
  estimate: TMersEstimate;
  allCountries: CountryFieldsAfterCombiningEstimatesWithStudiesStep[];
}

export const addHumanCountriesOfTravelInformationToEstimate = <
  TMersEstimate extends EstimateFieldsAfterCombiningEstimatesWithStudiesStep
>(input: AddHumanCountriesOfTravelInformationToEstimateInput<TMersEstimate>): TMersEstimate & ({
  humanCountriesOfTravel: Array<{
    country: string;
    countryAlphaTwoCode: TwoLetterIsoCountryCode;
    countryAlphaThreeCode: ThreeLetterIsoCountryCode;
    whoRegion: WHORegion | undefined;
    unRegion: UNRegion | undefined;
  }>
}) => {
  const humanCountriesOfTravel = input.estimate.humanCountryOfTravelIds
    .map((countryOfTravelId) => {
      if(!countryOfTravelId) {
        return undefined;
      }

      const countryOfTravel = input.allCountries.find((country) => country.id === countryOfTravelId);

      if(!countryOfTravel) {
        return undefined;
      }

      const whoRegion = getWHORegionFromAlphaTwoCode(countryOfTravel.countryAlphaTwoCode);
      const unRegion = getUNRegionFromAlphaTwoCode(countryOfTravel.countryAlphaTwoCode);

      return {
        country: countryOfTravel.countryName,
        countryAlphaTwoCode: countryOfTravel.countryAlphaTwoCode,
        countryAlphaThreeCode: countryOfTravel.countryAlphaThreeCode,
        whoRegion,
        unRegion,
      }
    })
    .filter((element): element is NonNullable<typeof element> => !!element)
    .sort((countryA, countryB) => countryA.country > countryB.country ? 1 : -1);
  
  return {
    ...input.estimate,
    humanCountriesOfTravel
  }
}

export const addCountryAndRegionInformationStep = (
  input: AddCountryAndRegionInformationStepInput
): AddCountryAndRegionInformationStepOutput => {
  console.log(`Running step: addCountryAndRegionInformationStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates
      .map((estimate) => addCountryInformationToEstimate({ estimate, allCountries: input.allCountries }))
      .filter((estimate): estimate is Extract<typeof estimate, { country: string }> => !!estimate.country && typeof estimate.country === 'string')
      .map((estimate) => addAnimalCountriesOfImportInformationToEstimate({ estimate, allCountries: input.allCountries }))
      .map((estimate) => addHumanCountriesOfTravelInformationToEstimate({ estimate, allCountries: input.allCountries })),
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allMacroSampleFrames: input.allMacroSampleFrames,
    allFaoMersEvents: input.allFaoMersEvents
      .map((event) => {
        const countryCodes = faoMersEventCountryToAlphaTwoAndAlphaThreeCode[event.country]

        if(!countryCodes) {
          return undefined;
        }

        const { countryAlphaTwoCode, countryAlphaThreeCode } = countryCodes;

        const whoRegion = getWHORegionFromAlphaTwoCode(countryAlphaTwoCode);
        const unRegion = getUNRegionFromAlphaTwoCode(countryAlphaTwoCode);

        return {
          ...event,
          countryAlphaTwoCode,
          countryAlphaThreeCode,
          whoRegion,
          unRegion
        }
      })
      .filter(<T extends unknown>(event: T | undefined): event is T => !!event),
    countryPopulationData: input.countryPopulationData,
    yearlyCamelPopulationByCountryData: input.yearlyCamelPopulationByCountryData.map((dataPoint) => {
      const whoRegion = getWHORegionFromAlphaTwoCode(dataPoint.twoLetterCountryCode);
      const unRegion = getUNRegionFromAlphaTwoCode(dataPoint.twoLetterCountryCode);

      return {
        ...dataPoint,
        whoRegion,
        unRegion
      }
    }),
    mongoClient: input.mongoClient
  };
};
