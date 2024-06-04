import { MongoClient } from "mongodb";
import { add, sub } from 'date-fns';
import { StructuredVaccinationData } from "../types";
import {
  ConsolidatedCountryDataAfterGeneratingConsolidatedCountryDataStep,
  CountryFieldsAfterGeneratingConsolidatedCountryDataStep,
  EstimateFieldsAfterGeneratingConsolidatedCountryDataStep,
  StructuredCountryPopulationDataAfterGeneratingConsolidatedCountryDataStep,
  StructuredPositiveCaseDataAfterGeneratingConsolidatedCountryDataStep,
  StructuredVaccinationDataAfterGeneratingConsolidatedCountryDataStep,
  StudyFieldsAfterGeneratingConsolidatedCountryDataStep
} from "./generate-consolidated-country-data-step";

interface GetAssociatedDataForEstimateInput<TKey extends keyof Omit<StructuredVaccinationData[number]['data'][number]['data'][number]['data'][number], 'day'>> {
  estimate: {
    threeLetterCountryCode: string;
    samplingMidDate: Date | undefined;
  };
  vaccinationData: StructuredVaccinationData;
  fieldName: TKey;
  acceptableDayDifferenceRange: number;
}

const getAssociatedVaccinationDataForEstimate = <
  TKey extends keyof Omit<StructuredVaccinationData[number]['data'][number]['data'][number]['data'][number], 'day'>
>(input: GetAssociatedDataForEstimateInput<TKey>): StructuredVaccinationData[number]['data'][number]['data'][number]['data'][number][TKey] | undefined => {
  const { samplingMidDate } = input.estimate;
  const { fieldName } = input;

  if(!samplingMidDate) {
    return undefined;
  }

  const acceptableDayDifferences = [...Array(input.acceptableDayDifferenceRange).keys()];

  const dayDifferencesWithData = acceptableDayDifferences.flatMap((dayDifference) => {
    const pastDateToEvaluate = sub(samplingMidDate, {days: dayDifference});
    const futureDateToEvaluate = add(samplingMidDate, {days: dayDifference});

    const dataForPastDateToEvaluate = input.vaccinationData
      .find((element) => element.threeLetterCountryCode === input.estimate.threeLetterCountryCode)?.data
      .find((element) => element.year === pastDateToEvaluate.getUTCFullYear().toString())?.data
      .find((element) => element.month === (pastDateToEvaluate.getUTCMonth() + 1).toString())?.data
      .find((element) => element.day === (pastDateToEvaluate.getUTCDate()).toString());

    const dataForFutureDateToEvaluate = input.vaccinationData
      .find((element) => element.threeLetterCountryCode === input.estimate.threeLetterCountryCode)?.data
      .find((element) => element.year === futureDateToEvaluate.getUTCFullYear().toString())?.data
      .find((element) => element.month === (futureDateToEvaluate.getUTCMonth() + 1).toString())?.data
      .find((element) => element.day === (futureDateToEvaluate.getUTCDate()).toString());
    
    const fieldForPastDate = dataForPastDateToEvaluate?.[fieldName];
    const fieldForFutureDate = dataForFutureDateToEvaluate?.[fieldName];

    return [(
      fieldForPastDate ? {
        dayDifference: -dayDifference,
        data: fieldForPastDate
      } : undefined
    ), (
      fieldForFutureDate ? {
        dayDifference: dayDifference,
        data: fieldForFutureDate
      } : undefined
    )];
  }).filter(<T extends unknown>(element: T | undefined): element is T => element !== undefined)

  const dataForDay = dayDifferencesWithData.find((element) => element.dayDifference === 0)

  if(!!dataForDay) {
    return dataForDay.data;
  }

  const dayInThePastWithTheLeastDifference = dayDifferencesWithData
    .filter((element) => element.dayDifference < 0)
    .sort((a, b) => Math.abs(a.dayDifference) - Math.abs(b.dayDifference))
    .at(0);

  const dayInTheFutureWithTheLeastDifference = dayDifferencesWithData
    .filter((element) => element.dayDifference > 0)
    .sort((a, b) => Math.abs(a.dayDifference) - Math.abs(b.dayDifference))
    .at(0);
  
  if(dayInThePastWithTheLeastDifference && dayInTheFutureWithTheLeastDifference) {
    // Turn this into a line with a slope of y=mx+b where x is the date.
    // We approximate the line to be linear on such a small time scale (~14 days).

    // m = dy/dx
    const m = (dayInTheFutureWithTheLeastDifference.data - dayInThePastWithTheLeastDifference.data) / (dayInTheFutureWithTheLeastDifference.dayDifference - dayInThePastWithTheLeastDifference.dayDifference);

    // b = y-mx
    const b = (dayInTheFutureWithTheLeastDifference.data) - (m * dayInTheFutureWithTheLeastDifference.dayDifference)

    // y = mx+b, x=0 in this case because the day difference is zero
    return (m * 0) + b;
  }

  // Getting here means we simply didn't have enough data to tell how many vaccinations had occurred at this time.
  return undefined;
}

export type EstimateFieldsAfterAddingVaccinationDataStep =
  EstimateFieldsAfterGeneratingConsolidatedCountryDataStep & {
    countryPeopleVaccinatedPerHundred: number | undefined;
    countryPeopleFullyVaccinatedPerHundred: number | undefined;
  };
export type StudyFieldsAfterAddingVaccinationDataStep = StudyFieldsAfterGeneratingConsolidatedCountryDataStep;
export type CountryFieldsAfterAddingVaccinationDataStep = CountryFieldsAfterGeneratingConsolidatedCountryDataStep;
export type StructuredVaccinationDataAfterAddingVaccinationDataStep =
  StructuredVaccinationDataAfterGeneratingConsolidatedCountryDataStep;
export type StructuredPositiveCaseDataAfterAddingVaccinationDataStep =
  StructuredPositiveCaseDataAfterGeneratingConsolidatedCountryDataStep;
export type StructuredCountryPopulationDataAfterAddingVaccinationDataStep =
  StructuredCountryPopulationDataAfterGeneratingConsolidatedCountryDataStep;
export type ConsolidatedCountryDataAfterAddingVaccinationDataStep =
  ConsolidatedCountryDataAfterGeneratingConsolidatedCountryDataStep & {
    countryPeopleVaccinatedPerHundred: number | undefined;
    countryPeopleFullyVaccinatedPerHundred: number | undefined;
  };

interface AddVaccinationDataToEstimateStepInput {
  allEstimates: EstimateFieldsAfterGeneratingConsolidatedCountryDataStep[];
  allStudies: StudyFieldsAfterGeneratingConsolidatedCountryDataStep[];
  allCountries: CountryFieldsAfterGeneratingConsolidatedCountryDataStep[];
  vaccinationData: StructuredVaccinationDataAfterGeneratingConsolidatedCountryDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterGeneratingConsolidatedCountryDataStep;
  countryPopulationData: StructuredCountryPopulationDataAfterGeneratingConsolidatedCountryDataStep;
  consolidatedCountryData: ConsolidatedCountryDataAfterGeneratingConsolidatedCountryDataStep[];
  mongoClient: MongoClient;
}

interface AddVaccinationDataToEstimateStepOutput {
  allEstimates: EstimateFieldsAfterAddingVaccinationDataStep[];
  allStudies: StudyFieldsAfterAddingVaccinationDataStep[];
  allCountries: CountryFieldsAfterAddingVaccinationDataStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingVaccinationDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingVaccinationDataStep;
  countryPopulationData: StructuredCountryPopulationDataAfterAddingVaccinationDataStep;
  consolidatedCountryData: ConsolidatedCountryDataAfterAddingVaccinationDataStep[];
  mongoClient: MongoClient;
}

export const addVaccinationDataToEstimateStep = (
  input: AddVaccinationDataToEstimateStepInput
): AddVaccinationDataToEstimateStepOutput => {
  const acceptableDayDifferenceRange = 31;

  console.log(
    `Running step: addVaccinationDataToEstimateStep. Remaining estimates: ${input.allEstimates.length}. Acceptable day difference range: ${acceptableDayDifferenceRange}`
  );

  return {
    allEstimates: input.allEstimates.map((estimate) => ({
      ...estimate,
      countryPeopleVaccinatedPerHundred: getAssociatedVaccinationDataForEstimate({
        estimate: {
          threeLetterCountryCode: estimate.countryAlphaThreeCode,
          samplingMidDate: estimate.samplingMidDate
        },
        fieldName: 'countryPeopleVaccinatedPerHundred',
        vaccinationData: input.vaccinationData,
        acceptableDayDifferenceRange
      }),
      countryPeopleFullyVaccinatedPerHundred: getAssociatedVaccinationDataForEstimate({
        estimate: {
          threeLetterCountryCode: estimate.countryAlphaThreeCode,
          samplingMidDate: estimate.samplingMidDate
        },
        fieldName: 'countryPeopleFullyVaccinatedPerHundred',
        vaccinationData: input.vaccinationData,
        acceptableDayDifferenceRange
      })
    })),
    allStudies: input.allStudies,
    allCountries: input.allCountries,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    countryPopulationData: input.countryPopulationData,
    consolidatedCountryData: input.consolidatedCountryData.map((countryDataPoint) => ({
      ...countryDataPoint,
      countryPeopleVaccinatedPerHundred: getAssociatedVaccinationDataForEstimate({
        estimate: {
          threeLetterCountryCode: countryDataPoint.alphaThreeCode,
          //Pick a mid date close enough to the middle of the month
          samplingMidDate: new Date(2024, countryDataPoint.month - 1, 14)
        },
        fieldName: 'countryPeopleVaccinatedPerHundred',
        vaccinationData: input.vaccinationData,
        acceptableDayDifferenceRange
      }),
      countryPeopleFullyVaccinatedPerHundred: getAssociatedVaccinationDataForEstimate({
        estimate: {
          threeLetterCountryCode: countryDataPoint.alphaThreeCode,
          //Pick a mid date close enough to the middle of the month
          samplingMidDate: new Date(2024, countryDataPoint.month - 1, 14)
        },
        fieldName: 'countryPeopleFullyVaccinatedPerHundred',
        vaccinationData: input.vaccinationData,
        acceptableDayDifferenceRange
      })
    })),
    mongoClient: input.mongoClient
  };
};
