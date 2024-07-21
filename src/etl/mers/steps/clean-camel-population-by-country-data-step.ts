import { MongoClient } from "mongodb";
import {
  CountryFieldsAfterValidatingCamelPopulationByCountryDataStep,
  CountryPopulationDataAfterValidatingCamelPopulationByCountryDataStep,
  EstimateFieldsAfterValidatingCamelPopulationByCountryDataStep,
  FaoMersEventAfterValidatingCamelPopulationByCountryDataStep,
  SourceFieldsAfterValidatingCamelPopulationByCountryDataStep,
  StudyFieldsAfterValidatingCamelPopulationByCountryDataStep,
  YearlyCamelPopulationDataAfterValidatingCamelPopulationByCountryDataStep
} from "./validate-camel-population-by-country-data-step";
import { ThreeLetterIsoCountryCode, TwoLetterIsoCountryCode } from "../../../lib/geocoding-api/country-codes";

export type EstimateFieldsAfterCleaningCamelPopulationByCountryDataStep = EstimateFieldsAfterValidatingCamelPopulationByCountryDataStep;
export type SourceFieldsAfterCleaningCamelPopulationByCountryDataStep = SourceFieldsAfterValidatingCamelPopulationByCountryDataStep;
export type StudyFieldsAfterCleaningCamelPopulationByCountryDataStep = StudyFieldsAfterValidatingCamelPopulationByCountryDataStep;
export type CountryFieldsAfterCleaningCamelPopulationByCountryDataStep = CountryFieldsAfterValidatingCamelPopulationByCountryDataStep;
export type FaoMersEventAfterCleaningCamelPopulationByCountryDataStep = FaoMersEventAfterValidatingCamelPopulationByCountryDataStep;
export type YearlyCamelPopulationDataAfterCleaningCamelPopulationByCountryDataStep = {
  threeLetterCountryCode: ThreeLetterIsoCountryCode;
  twoLetterCountryCode: TwoLetterIsoCountryCode;
  countryName: string;
  year: number;
  camelCount: number;
  note: string;
};
export type CountryPopulationDataAfterCleaningCamelPopulationByCountryDataStep = CountryPopulationDataAfterValidatingCamelPopulationByCountryDataStep;

interface CleanCamelPopulationByCountryDataStepInput {
  allEstimates: EstimateFieldsAfterValidatingCamelPopulationByCountryDataStep[];
  allSources: SourceFieldsAfterValidatingCamelPopulationByCountryDataStep[];
  allStudies: StudyFieldsAfterValidatingCamelPopulationByCountryDataStep[];
  allCountries: CountryFieldsAfterValidatingCamelPopulationByCountryDataStep[];
  allFaoMersEvents: FaoMersEventAfterValidatingCamelPopulationByCountryDataStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterValidatingCamelPopulationByCountryDataStep[];
  countryPopulationData: CountryPopulationDataAfterValidatingCamelPopulationByCountryDataStep[];
  mongoClient: MongoClient;
}

interface CleanCamelPopulationByCountryDataStepOutput {
  allEstimates: EstimateFieldsAfterCleaningCamelPopulationByCountryDataStep[];
  allSources: SourceFieldsAfterCleaningCamelPopulationByCountryDataStep[];
  allStudies: StudyFieldsAfterCleaningCamelPopulationByCountryDataStep[];
  allCountries: CountryFieldsAfterCleaningCamelPopulationByCountryDataStep[];
  allFaoMersEvents: FaoMersEventAfterCleaningCamelPopulationByCountryDataStep[];
  yearlyCamelPopulationByCountryData: YearlyCamelPopulationDataAfterCleaningCamelPopulationByCountryDataStep[];
  countryPopulationData: CountryPopulationDataAfterCleaningCamelPopulationByCountryDataStep[];
  mongoClient: MongoClient;
}

const faoCamelPopulationCountryToAlphaTwoAndAlphaThreeCode: Record<string, {
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  countryAlphaThreeCode: ThreeLetterIsoCountryCode;
} | undefined> = {
  "Afghanistan": { countryAlphaTwoCode: 'AF', countryAlphaThreeCode: 'AFG' },
  "Bahrain": { countryAlphaTwoCode: 'BH', countryAlphaThreeCode: 'BHR' },
  "Burkina Faso": { countryAlphaTwoCode: 'BF', countryAlphaThreeCode: 'BFA' },
  "Chad": { countryAlphaTwoCode: 'TD', countryAlphaThreeCode: 'TCD' },
  "China": { countryAlphaTwoCode: 'CN', countryAlphaThreeCode: 'CHN' },
  "Djibouti": { countryAlphaTwoCode: 'DJ', countryAlphaThreeCode: 'DJI' },
  "Egypt": { countryAlphaTwoCode: 'EG', countryAlphaThreeCode: 'EGY' },
  "Eritrea": { countryAlphaTwoCode: 'ER', countryAlphaThreeCode: 'ERI' },
  "Ethiopia": { countryAlphaTwoCode: 'ET', countryAlphaThreeCode: 'ETH' },
  "India": { countryAlphaTwoCode: 'IN', countryAlphaThreeCode: 'IND' },
  "Iran (Islamic Republic of)": { countryAlphaTwoCode: 'IR', countryAlphaThreeCode: 'IRN' },
  "Iraq": { countryAlphaTwoCode: 'IQ', countryAlphaThreeCode: 'IRQ' },
  "Israel": { countryAlphaTwoCode: 'IL', countryAlphaThreeCode: 'ISR' },
  "Jordan": { countryAlphaTwoCode: 'JO', countryAlphaThreeCode: 'JOR' },
  "Kuwait": { countryAlphaTwoCode: 'KW', countryAlphaThreeCode: 'KWT' },
  "Kyrgyzstan": { countryAlphaTwoCode: 'KG', countryAlphaThreeCode: 'KGZ' },
  "Lebanon": { countryAlphaTwoCode: 'LB', countryAlphaThreeCode: 'LBN' },
  "Libya": { countryAlphaTwoCode: 'LY', countryAlphaThreeCode: 'LBY' },
  "Mauritania": { countryAlphaTwoCode: 'MR', countryAlphaThreeCode: 'MRT' },
  "Morocco": { countryAlphaTwoCode: 'MA', countryAlphaThreeCode: 'MAR' },
  "Namibia": { countryAlphaTwoCode: 'NA', countryAlphaThreeCode: 'NAM' },
  "Nigeria": { countryAlphaTwoCode: 'NG', countryAlphaThreeCode: 'NGA' },
  "Russian Federation": { countryAlphaTwoCode: 'RU', countryAlphaThreeCode: 'RUS' },
  "Saudi Arabia": { countryAlphaTwoCode: 'SA', countryAlphaThreeCode: 'SAU' },
  "Senegal": { countryAlphaTwoCode: 'SN', countryAlphaThreeCode: 'SEN' },
  "Somalia": { countryAlphaTwoCode: 'SO', countryAlphaThreeCode: 'SOM' },
  "South Sudan": { countryAlphaTwoCode: 'SS', countryAlphaThreeCode: 'SSD' },
  "Syrian Arab Republic": { countryAlphaTwoCode: 'SY', countryAlphaThreeCode: 'SYR' },
  "Tajikistan": { countryAlphaTwoCode: 'TJ', countryAlphaThreeCode: 'TJK' },
  "Tunisia": { countryAlphaTwoCode: 'TN', countryAlphaThreeCode: 'TUN' },
  "Turkmenistan": { countryAlphaTwoCode: 'TM', countryAlphaThreeCode: 'TKM' },
  "Ukraine": { countryAlphaTwoCode: 'UA', countryAlphaThreeCode: 'UKR' },
  "United Arab Emirates": { countryAlphaTwoCode: 'AE', countryAlphaThreeCode: 'ARE' },
  "Yemen": { countryAlphaTwoCode: 'YE', countryAlphaThreeCode: 'YEM' }
}

export const cleanCamelPopulationByCountryDataStep = (
  input: CleanCamelPopulationByCountryDataStepInput
): CleanCamelPopulationByCountryDataStepOutput => {
  console.log(`Running step: cleanCamelPopulationByCountryDataStep. Remaining estimates: ${input.allEstimates.length}`);

  const cleanedDataArray = input.yearlyCamelPopulationByCountryData
    .map((element) => {
      const countryCodesForData = faoCamelPopulationCountryToAlphaTwoAndAlphaThreeCode[element.Country];

      if(!countryCodesForData) {
        return undefined;
      }

      if(element.Item !== 'Camels') {
        return undefined;
      }

      const year = parseInt(element.Year);
      const camelCount = parseInt(element["Stocks (Head)"].replaceAll(',', ''));

      if(Number.isNaN(year) || Number.isNaN(camelCount)) {
        return undefined;
      }

      return {
        threeLetterCountryCode: countryCodesForData.countryAlphaThreeCode,
        twoLetterCountryCode: countryCodesForData.countryAlphaTwoCode,
        countryName: element.Country,
        year,
        camelCount: camelCount,
        note: element["Stocks (Head) flag"]
      }
    })
    .filter(<T extends unknown>(element: T | undefined): element is T => !!element);

  return {
    allEstimates: input.allEstimates,
    allSources: input.allSources,
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    allFaoMersEvents: input.allFaoMersEvents,
    yearlyCamelPopulationByCountryData: cleanedDataArray,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};
