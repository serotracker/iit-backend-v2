import { MongoClient } from "mongodb";
import { add, sub } from 'date-fns';
import {
  EstimateFieldsAfterAddingVaccinationDataStep,
  StructuredPositiveCaseDataAfterAddingVaccinationDataStep,
  StructuredVaccinationDataAfterAddingVaccinationDataStep,
  StudyFieldsAfterAddingVaccinationDataStep
} from "./add-vaccination-data-to-estimate-step";
import { StructuredPositiveCaseData } from "../types";

interface GetAssociatedPositiveCaseDataForEstimateInput {
  estimate: {
    twoLetterCountryCode: string;
    samplingMidDate: Date | undefined;
  };
  positiveCaseData: StructuredPositiveCaseData;
  acceptableDayDifferenceRange: number;
}

interface GetAssociatedPositiveCaseDataForEstimateOutput {
  countryPositiveCasesPerMillionPeople: number | undefined;
}

const getAssociatedPositiveCaseDataForEstimate = (input: GetAssociatedPositiveCaseDataForEstimateInput): GetAssociatedPositiveCaseDataForEstimateOutput => {
  const { samplingMidDate } = input.estimate;

  if(!samplingMidDate) {
    return { countryPositiveCasesPerMillionPeople: undefined };
  }

  const acceptableDayDifferences = [...Array(input.acceptableDayDifferenceRange).keys()];

  const dayDifferencesWithData = acceptableDayDifferences.flatMap((dayDifference) => {
    const pastDateToEvaluate = sub(samplingMidDate, {days: dayDifference});
    const futureDateToEvaluate = add(samplingMidDate, {days: dayDifference});

    const dataForPastDateToEvaluate = input.positiveCaseData
      .find((element) => element.twoLetterCountryCode === input.estimate.twoLetterCountryCode)?.data
      .find((element) => element.year === pastDateToEvaluate.getUTCFullYear().toString())?.data
      .find((element) => element.month === (pastDateToEvaluate.getUTCMonth() + 1).toString())?.data
      .find((element) => element.day === (pastDateToEvaluate.getUTCDate()).toString());

    const dataForFutureDateToEvaluate = input.positiveCaseData
      .find((element) => element.twoLetterCountryCode === input.estimate.twoLetterCountryCode)?.data
      .find((element) => element.year === futureDateToEvaluate.getUTCFullYear().toString())?.data
      .find((element) => element.month === (futureDateToEvaluate.getUTCMonth() + 1).toString())?.data
      .find((element) => element.day === (futureDateToEvaluate.getUTCDate()).toString());

    return [(
      (
        dataForPastDateToEvaluate !== undefined &&
        dataForPastDateToEvaluate.countryPositiveCasesPerMillionPeople !== undefined
      ) ? {
        dayDifference: -dayDifference,
        data: {
          countryPositiveCasesPerMillionPeople: dataForPastDateToEvaluate.countryPositiveCasesPerMillionPeople
        }
      } : undefined
    ), (
      (
        dataForFutureDateToEvaluate !== undefined &&
        dataForFutureDateToEvaluate.countryPositiveCasesPerMillionPeople !== undefined
      ) ? {
        dayDifference: dayDifference,
        data: {
          countryPositiveCasesPerMillionPeople: dataForFutureDateToEvaluate.countryPositiveCasesPerMillionPeople
        }
      } : undefined
    )];
  }).filter(<T extends unknown>(element: T | undefined): element is T => element !== undefined)

  const dataForDay = dayDifferencesWithData.find((element) => element.dayDifference === 0)

  if(!!dataForDay) {
    return {
      countryPositiveCasesPerMillionPeople: dataForDay.data.countryPositiveCasesPerMillionPeople
    }
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
    const m = (dayInTheFutureWithTheLeastDifference.data.countryPositiveCasesPerMillionPeople - dayInThePastWithTheLeastDifference.data.countryPositiveCasesPerMillionPeople) / (dayInTheFutureWithTheLeastDifference.dayDifference - dayInThePastWithTheLeastDifference.dayDifference);

    // b = y-mx
    const b = (dayInTheFutureWithTheLeastDifference.data.countryPositiveCasesPerMillionPeople) - (m * dayInTheFutureWithTheLeastDifference.dayDifference)

    // y = mx+b, x=0 in this case because the day difference is zero
    const countryPositiveCasesPerMillionPeople = (m * 0) + b;

    return {
      countryPositiveCasesPerMillionPeople
    }
  }

  // Getting here means we simply didn't have enough data to tell how many positive cases had occurred at this time.
  return {
    countryPositiveCasesPerMillionPeople: undefined
  }
}

export type EstimateFieldsAfterAddingPositiveCaseDataStep =
  EstimateFieldsAfterAddingVaccinationDataStep & { 
    countryPositiveCasesPerMillionPeople: number | undefined;
  };
export type StudyFieldsAfterAddingPositiveCaseDataStep =
  StudyFieldsAfterAddingVaccinationDataStep;
export type StructuredVaccinationDataAfterAddingPositiveCaseDataStep =
  StructuredVaccinationDataAfterAddingVaccinationDataStep;
export type StructuredPositiveCaseDataAfterAddingPositiveCaseDataStep =
  StructuredPositiveCaseDataAfterAddingVaccinationDataStep;

interface AddPositiveCaseDataToEstimateStepInput {
  allEstimates: EstimateFieldsAfterAddingVaccinationDataStep[];
  allStudies: StudyFieldsAfterAddingVaccinationDataStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingVaccinationDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingVaccinationDataStep;
  mongoClient: MongoClient;
}

interface AddPositiveCaseDataToEstimateStepOutput {
  allEstimates: EstimateFieldsAfterAddingPositiveCaseDataStep[];
  allStudies: StudyFieldsAfterAddingPositiveCaseDataStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingPositiveCaseDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingPositiveCaseDataStep;
  mongoClient: MongoClient;
}

export const addPositiveCaseDataToEstimateStep = (
  input: AddPositiveCaseDataToEstimateStepInput
): AddPositiveCaseDataToEstimateStepOutput => {
  const acceptableDayDifferenceRange = 7;

  console.log(
    `Running step: addPositiveCaseDataToEstimateStep. Remaining estimates: ${input.allEstimates.length}. Acceptable day difference range: ${acceptableDayDifferenceRange}`
  );

  return {
    allEstimates: input.allEstimates.map((estimate) => ({
      ...estimate,
      countryPositiveCasesPerMillionPeople: getAssociatedPositiveCaseDataForEstimate({
        estimate: {
          twoLetterCountryCode: estimate.countryAlphaTwoCode,
          samplingMidDate: estimate.samplingMidDate
        },
        positiveCaseData: input.positiveCaseData,
        acceptableDayDifferenceRange
      }).countryPositiveCasesPerMillionPeople
    })),
    allStudies: input.allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    mongoClient: input.mongoClient
  };
};
