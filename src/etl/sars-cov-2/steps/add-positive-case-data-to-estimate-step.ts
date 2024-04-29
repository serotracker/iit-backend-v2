import { EstimateFieldsAfterAddingVaccinationDataStep, StructuredPositiveCaseDataAfterAddingVaccinationDataStep, StructuredVaccinationDataAfterAddingVaccinationDataStep, StudyFieldsAfterAddingVaccinationDataStep } from "./add-vaccination-data-to-estimate-step";

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
}

interface AddPositiveCaseDataToEstimateStepOutput {
  allEstimates: EstimateFieldsAfterAddingPositiveCaseDataStep[];
  allStudies: StudyFieldsAfterAddingPositiveCaseDataStep[];
  vaccinationData: StructuredVaccinationDataAfterAddingPositiveCaseDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterAddingPositiveCaseDataStep;
}

export const addPositiveCaseDataToEstimateStep = (
  input: AddPositiveCaseDataToEstimateStepInput
): AddPositiveCaseDataToEstimateStepOutput => {
  console.log(
    `Running step: addPositiveCaseDataToEstimateStep. Remaining estimates: ${input.allEstimates.length}`
  );

  return {
    allEstimates: input.allEstimates.map((estimate) => ({
      ...estimate,
      countryPositiveCasesPerMillionPeople: input.positiveCaseData
        .find((element) => element.twoLetterCountryCode === estimate.countryAlphaTwoCode)?.data
        .find((element) => estimate.samplingMidDate && element.year === estimate.samplingMidDate.getUTCFullYear().toString())?.data
        .find((element) => estimate.samplingMidDate && element.month === (estimate.samplingMidDate.getUTCMonth() + 1).toString())?.data
        .find((element) => estimate.samplingMidDate && element.day === (estimate.samplingMidDate.getUTCDate()).toString())?.countryPositiveCasesPerMillionPeople
    })),
    allStudies: input.allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: input.positiveCaseData,
  };
};
