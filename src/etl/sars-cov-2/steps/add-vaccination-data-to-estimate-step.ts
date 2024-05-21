import { MongoClient } from "mongodb";
import { add, sub } from 'date-fns';
import {
  EstimateFieldsAfterJitteringPinLatLngStep,
  StructuredPositiveCaseDataAfterJitteringPinLatLngStep,
  StructuredVaccinationDataAfterJitteringPinLatLngStep,
  StudyFieldsAfterJitteringPinLatLngStep,
} from "./jitter-pin-lat-lng-step";
import { StructuredVaccinationData } from "../types";

interface GetAssociatedVaccinationDataForEstimateInput {
  estimate: {
    threeLetterCountryCode: string;
    samplingMidDate: Date | undefined;
  };
  vaccinationData: StructuredVaccinationData;
  acceptableDayDifferenceRange: number;
}

interface GetAssociatedVaccinationDataForEstimateOutput {
  countryPeopleVaccinatedPerHundred: number | undefined;
}

const getAssociatedVaccinationDataForEstimate = (input: GetAssociatedVaccinationDataForEstimateInput): GetAssociatedVaccinationDataForEstimateOutput => {
  const { samplingMidDate } = input.estimate;

  if(!samplingMidDate) {
    return {
      countryPeopleVaccinatedPerHundred: undefined,
    };
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

    return [(
      (
        dataForPastDateToEvaluate !== undefined &&
        dataForPastDateToEvaluate.countryPeopleVaccinatedPerHundred !== undefined
      ) ? {
        dayDifference: -dayDifference,
        data: {
          countryPeopleVaccinatedPerHundred: dataForPastDateToEvaluate.countryPeopleVaccinatedPerHundred,
        }
      } : undefined
    ), (
      (
        dataForFutureDateToEvaluate !== undefined &&
        dataForFutureDateToEvaluate.countryPeopleVaccinatedPerHundred !== undefined
      ) ? {
        dayDifference: dayDifference,
        data: {
          countryPeopleVaccinatedPerHundred: dataForFutureDateToEvaluate.countryPeopleVaccinatedPerHundred,
        }
      } : undefined
    )];
  }).filter(<T extends unknown>(element: T | undefined): element is T => element !== undefined)

  const dataForDay = dayDifferencesWithData.find((element) => element.dayDifference === 0)

  if(!!dataForDay) {
    return {
      countryPeopleVaccinatedPerHundred: dataForDay.data.countryPeopleVaccinatedPerHundred,
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
    const m = (dayInTheFutureWithTheLeastDifference.data.countryPeopleVaccinatedPerHundred - dayInThePastWithTheLeastDifference.data.countryPeopleVaccinatedPerHundred) / (dayInTheFutureWithTheLeastDifference.dayDifference - dayInThePastWithTheLeastDifference.dayDifference);

    // b = y-mx
    const b = (dayInTheFutureWithTheLeastDifference.data.countryPeopleVaccinatedPerHundred) - (m * dayInTheFutureWithTheLeastDifference.dayDifference)

    // y = mx+b, x=0 in this case because the day difference is zero
    const countryPeopleVaccinatedPerHundred = (m * 0) + b;

    return {
      countryPeopleVaccinatedPerHundred
    }
  }

  // Getting here means we simply didn't have enough data to tell how many positive cases had occurred at this time.
  return {
    countryPeopleVaccinatedPerHundred: undefined
  }
}

interface GetAssociatedFullVaccinationDataForEstimateInput {
  estimate: {
    threeLetterCountryCode: string;
    samplingMidDate: Date | undefined;
  };
  vaccinationData: StructuredVaccinationData;
  acceptableDayDifferenceRange: number;
}

interface GetAssociatedFullVaccinationDataForEstimateOutput {
  countryPeopleFullyVaccinatedPerHundred: number | undefined;
}

const getAssociatedFullVaccinationDataForEstimate = (input: GetAssociatedFullVaccinationDataForEstimateInput): GetAssociatedFullVaccinationDataForEstimateOutput => {
  const { samplingMidDate } = input.estimate;

  if(!samplingMidDate) {
    return {
      countryPeopleFullyVaccinatedPerHundred: undefined,
    };
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

    return [(
      (
        dataForPastDateToEvaluate !== undefined &&
        dataForPastDateToEvaluate.countryPeopleFullyVaccinatedPerHundred !== undefined
      ) ? {
        dayDifference: -dayDifference,
        data: {
          countryPeopleFullyVaccinatedPerHundred: dataForPastDateToEvaluate.countryPeopleFullyVaccinatedPerHundred,
        }
      } : undefined
    ), (
      (
        dataForFutureDateToEvaluate !== undefined &&
        dataForFutureDateToEvaluate.countryPeopleFullyVaccinatedPerHundred !== undefined
      ) ? {
        dayDifference: dayDifference,
        data: {
          countryPeopleFullyVaccinatedPerHundred: dataForFutureDateToEvaluate.countryPeopleFullyVaccinatedPerHundred,
        }
      } : undefined
    )];
  }).filter(<T extends unknown>(element: T | undefined): element is T => element !== undefined)

  const dataForDay = dayDifferencesWithData.find((element) => element.dayDifference === 0)

  if(!!dataForDay) {
    return {
      countryPeopleFullyVaccinatedPerHundred: dataForDay.data.countryPeopleFullyVaccinatedPerHundred,
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
    const m = (dayInTheFutureWithTheLeastDifference.data.countryPeopleFullyVaccinatedPerHundred - dayInThePastWithTheLeastDifference.data.countryPeopleFullyVaccinatedPerHundred) / (dayInTheFutureWithTheLeastDifference.dayDifference - dayInThePastWithTheLeastDifference.dayDifference);

    // b = y-mx
    const b = (dayInTheFutureWithTheLeastDifference.data.countryPeopleFullyVaccinatedPerHundred) - (m * dayInTheFutureWithTheLeastDifference.dayDifference)

    // y = mx+b, x=0 in this case because the day difference is zero
    const countryPeopleFullyVaccinatedPerHundred = (m * 0) + b;

    return {
      countryPeopleFullyVaccinatedPerHundred
    }
  }

  // Getting here means we simply didn't have enough data to tell how many positive cases had occurred at this time.
  return {
    countryPeopleFullyVaccinatedPerHundred: undefined
  }
}

export type EstimateFieldsAfterAddingVaccinationDataStep =
  EstimateFieldsAfterJitteringPinLatLngStep & {
    countryPeopleVaccinatedPerHundred: number | undefined;
    countryPeopleFullyVaccinatedPerHundred: number | undefined;
  };
export type StudyFieldsAfterAddingVaccinationDataStep = StudyFieldsAfterJitteringPinLatLngStep;
export type StructuredVaccinationDataAfterAddingVaccinationDataStep =
  StructuredVaccinationDataAfterJitteringPinLatLngStep;
export type StructuredPositiveCaseDataAfterAddingVaccinationDataStep =
  StructuredPositiveCaseDataAfterJitteringPinLatLngStep;

interface AddVaccinationDataToEstimateStepInput {
  allEstimates: EstimateFieldsAfterJitteringPinLatLngStep[];
  allStudies: StudyFieldsAfterJitteringPinLatLngStep[];
  vaccinationData: StructuredVaccinationDataAfterJitteringPinLatLngStep;
  positiveCaseData: StructuredPositiveCaseDataAfterJitteringPinLatLngStep;
  mongoClient: MongoClient;
}

interface AddVaccinationDataToEstimateStepOutput {
  allEstimates: EstimateFieldsAfterAddingVaccinationDataStep[];
  allStudies: StudyFieldsAfterAddingVaccinationDataStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingVaccinationDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingVaccinationDataStep;
  mongoClient: MongoClient;
}

export const addVaccinationDataToEstimateStep = (
  input: AddVaccinationDataToEstimateStepInput
): AddVaccinationDataToEstimateStepOutput => {
  const acceptableDayDifferenceRange = 7;

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
        vaccinationData: input.vaccinationData,
        acceptableDayDifferenceRange
      }).countryPeopleVaccinatedPerHundred,
      countryPeopleFullyVaccinatedPerHundred: getAssociatedFullVaccinationDataForEstimate({
        estimate: {
          threeLetterCountryCode: estimate.countryAlphaThreeCode,
          samplingMidDate: estimate.samplingMidDate
        },
        vaccinationData: input.vaccinationData,
        acceptableDayDifferenceRange
      }).countryPeopleFullyVaccinatedPerHundred
    })),
    allStudies: input.allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
    mongoClient: input.mongoClient
  };
};
