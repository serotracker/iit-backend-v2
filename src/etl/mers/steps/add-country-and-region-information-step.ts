import { MongoClient } from "mongodb";
import { ThreeLetterIsoCountryCode, TwoLetterIsoCountryCode } from "../../../lib/geocoding-api/country-codes";
import { WHORegion, getWHORegionFromAlphaTwoCode } from "../../../lib/who-regions.js";
import { UNRegion, getUNRegionFromAlphaTwoCode } from "../../../lib/un-regions.js";
import {
  CountryPopulationDataAfterCombiningEstimatesWithSourcesStep,
  EstimateFieldsAfterCombiningEstimatesWithSourcesStep,
  FaoMersEventAfterCombiningEstimatesWithSourcesStep,
  SourceFieldsAfterCombiningEstimatesWithSourcesStep,
  StudyFieldsAfterCombiningEstimatesWithSourcesStep,
  YearlyCamelPopulationDataAfterCombiningEstimatesWithSourcesStep
} from "./combine-estimates-with-sources-step";

export type EstimateFieldsAfterAddingCountryAndRegionInformationStep = EstimateFieldsAfterCombiningEstimatesWithSourcesStep & {
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  countryAlphaThreeCode: ThreeLetterIsoCountryCode;
  whoRegion: WHORegion | undefined;
  unRegion: UNRegion | undefined;
};

export type SourceFieldsAfterAddingCountryAndRegionInformationStep = SourceFieldsAfterCombiningEstimatesWithSourcesStep;
export type StudyFieldsAfterAddingCountryAndRegionInformationStep = StudyFieldsAfterCombiningEstimatesWithSourcesStep;

export type FaoMersEventAfterAddingCountryAndRegionInformationStep = FaoMersEventAfterCombiningEstimatesWithSourcesStep & {
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  countryAlphaThreeCode: ThreeLetterIsoCountryCode;
  whoRegion: WHORegion | undefined;
  unRegion: UNRegion | undefined;
};

export type YearlyCamelPopulationDataAfterAddingCountryAndRegionInformationStep = YearlyCamelPopulationDataAfterCombiningEstimatesWithSourcesStep & {
  whoRegion: WHORegion | undefined;
  unRegion: UNRegion | undefined;
};
export type CountryPopulationDataAfterAddingCountryAndRegionInformationStep = CountryPopulationDataAfterCombiningEstimatesWithSourcesStep;

interface AddCountryAndRegionInformationStepInput {
  allEstimates: EstimateFieldsAfterCombiningEstimatesWithSourcesStep[];
  allSources: SourceFieldsAfterCombiningEstimatesWithSourcesStep[];
  allStudies: StudyFieldsAfterCombiningEstimatesWithSourcesStep[];
  allFaoMersEvents: FaoMersEventAfterCombiningEstimatesWithSourcesStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCombiningEstimatesWithSourcesStep[];
  countryPopulationData: CountryPopulationDataAfterCombiningEstimatesWithSourcesStep[];
  mongoClient: MongoClient;
}

interface AddCountryAndRegionInformationStepOutput {
  allEstimates: EstimateFieldsAfterAddingCountryAndRegionInformationStep[];
  allSources: SourceFieldsAfterAddingCountryAndRegionInformationStep[];
  allStudies: StudyFieldsAfterAddingCountryAndRegionInformationStep[];
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

const sourceCountryToAlphaTwoAndAlphaThreeCode: Record<string, {
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  countryAlphaThreeCode: ThreeLetterIsoCountryCode;
} | undefined> = {
  "Czech Republic": { countryAlphaTwoCode: 'CZ', countryAlphaThreeCode: 'CZE' },
  "Egypt": { countryAlphaTwoCode: 'EG', countryAlphaThreeCode: 'EGY' },
  "Ethiopia": { countryAlphaTwoCode: 'ET', countryAlphaThreeCode: 'ETH' },
  "Kenya": { countryAlphaTwoCode: 'KE', countryAlphaThreeCode: 'KEN' },
  "Turkey": { countryAlphaTwoCode: 'TR', countryAlphaThreeCode: 'TUR' },
  "Nigeria": { countryAlphaTwoCode: 'NG', countryAlphaThreeCode: 'NGA' },
  "Saudi Arabia": { countryAlphaTwoCode: 'SA', countryAlphaThreeCode: 'SAU' },
  "KSA": { countryAlphaTwoCode: 'SA', countryAlphaThreeCode: 'SAU' },
  "Jordan": { countryAlphaTwoCode: 'JO', countryAlphaThreeCode: 'JOR' },
  "Pakistan": { countryAlphaTwoCode: 'PK', countryAlphaThreeCode: 'PAK' },
  "India": { countryAlphaTwoCode: 'IN', countryAlphaThreeCode: 'IND' },
  "Indonesia": { countryAlphaTwoCode: 'ID', countryAlphaThreeCode: 'IDN' },
  "USA": { countryAlphaTwoCode: 'US', countryAlphaThreeCode: 'USA' },
  "UAE": { countryAlphaTwoCode: 'AE', countryAlphaThreeCode: 'ARE' },
  "Qatar": { countryAlphaTwoCode: 'QA', countryAlphaThreeCode: 'QAT' },
}

export const addCountryAndRegionInformationStep = (
  input: AddCountryAndRegionInformationStepInput
): AddCountryAndRegionInformationStepOutput => {
  console.log(`Running step: addCountryAndRegionInformationStep. Remaining estimates: ${input.allEstimates.length}`);

  return {
    allEstimates: input.allEstimates
      .map((estimate) => {
        const countryCodes = sourceCountryToAlphaTwoAndAlphaThreeCode[estimate.country]

        if(!countryCodes) {
          return undefined;
        }

        const { countryAlphaTwoCode, countryAlphaThreeCode } = countryCodes;

        const whoRegion = getWHORegionFromAlphaTwoCode(countryAlphaTwoCode);
        const unRegion = getUNRegionFromAlphaTwoCode(countryAlphaTwoCode);

        return {
          ...estimate,
          countryAlphaTwoCode,
          countryAlphaThreeCode,
          whoRegion,
          unRegion,
        }
      })
      .filter(<T extends unknown>(event: T | undefined): event is T => !!event),
    allSources: input.allSources,
    allStudies: input.allStudies,
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
