import Airtable, { FieldSet } from "airtable";
import { getEnvironmentVariableOrThrow } from "../../../etl/helpers.js";
import { pipe } from "fp-ts/lib/function.js";
import { validateEstimatesFromAirtableStep } from "./steps/validate-estimates-from-airtable-step.js";
import { cleanEstimatesFromAirtableStep } from "./steps/clean-estimates-from-airtable-step.js";
import { writeEstimatesToCsvStep } from "./steps/write-estimates-to-csv-step.js";
import { filterEstimatesWhichDontMeetDataStructureRequirements } from "./steps/filter-estimates-which-dont-meet-data-structure-requirements.js";
import { cleanBadValuesFromEstimatesStep } from "./steps/clean-bad-values-from-estimates-step.js";

const generateSarsCov2DataCsv = async () => {
  console.log("Generating SarsCov2 Data CSV");

  const airtableApiKey = getEnvironmentVariableOrThrow({
    key: "AIRTABLE_API_KEY",
  });
  const airtableSC2BaseId = getEnvironmentVariableOrThrow({
    key: "AIRTABLE_SARSCOV2_BASE_ID",
  });
  const mongoUri = getEnvironmentVariableOrThrow({ key: "MONGODB_URI" });
  const databaseName = getEnvironmentVariableOrThrow({ key: "DATABASE_NAME" });

  const airtable = new Airtable({ apiKey: airtableApiKey });
  const base = new Airtable.Base(airtable, airtableSC2BaseId);
  const estimateSheet = base.table("Rapid Review: Estimates");
  //const studySheet = base.table("Rapid Review: Study");
  //const countrySheet = base.table("Countries");
  const allEstimatesUnformatted: Array<any> = [{
    'Test Validation': 'Validated by independent authors/third party/non-developers',
    'Age Maximum': 59,
    'Second Completed Extraction Estimate': true,
    'Notes on Test Used': 'Roche Elecsys Anti-SARS-CoV-2 (99.5% sensitivity (Muench et al., 2020), 99.8% specificity (The Roche Group, 2020; Muench et al., 2020); Roche, Switzerland), an electrochemiluminescence immunoassay, was used for antibody detection in the serological samples. Result interpretation followed manufacturer instructions: reactive for optical density (a proxy for antibody titer) cutoff index ≥1.0 and non-reactive for cutoff index <1.0 (The Roche Group, 2020).',
    'Sample Frame (sex)': 'All',
    'Sample Frame (age)': 'Adults (18-64 years)',
    'Isotype(s) Reported (Reviewer)': [ 'Not reported' ],
    'Serum positive prevalence': 0.179,
    'Sampling End Date': '2020-09-09',
    'Denominator Value': 16363,
    'Discrepancies?': 'GD: Changed sn/sp to match those given in the Laboratory Methods section. These are also author/independently verified.',
    'Population Adjustment': true,
    'Sampling Method': 'Sequential',
    Specificity: 0.998,
    'Age Minimum': 50,
    'Prevalence Estimate Name': '210523_Qatar_CornellUniversity_Age_50-59_PopAdj',
    Sensitivity: 0.995,
    'Specimen Type': 'Serum',
    'Test Type (Reviewer)': 'CLIA',
    'Numerator Value': 3220,
    'Sampling Start Date': '2020-05-12',
    'Inferred specimen type': true,
    'Sample Frame (groups of interest)': 'Residual sera',
    'Notes on Sampling Method': 'Not entirely clear.\n' +
      '\n' +
      '"Each person in this study contributed only one antibody test, the last test performed during the study period. Antibody data generated during the study were subsequently linked to the national centralized SARS-CoV-2 polymerase chain reaction (PCR) testing and hospitalization database, which includes records for all PCR testing and COVID-19 hospitalizations in Qatar since the start of the epidemic (Hamad Medical Corporation, 2020a)."',
    'Notes on Sample Frame': 'Residual blood specimens were collected from individuals receiving routine and other clinical care at Hamad Medical Corporation (HMC), a main provider of healthcare to the urban population of this country and the nationally designated provider for Coronavirus Disease 2019 (COVID-19) healthcare needs.',
    'Grade of Estimate Scope': 'National',
    'Sub-group specific category (clean)': '50-59',
    'First Completed Extraction Estimate': true,
    'Antibody target (Reviewer)': [ 'Not reported' ],
    'Rapid Review: Study': [ 'recRZscBh0D8NDCJh' ],
    'Numerator Definition': 'Result interpretation followed manufacturer instructions: reactive for optical density (a proxy for antibody titer) cutoff index ≥1.0 and non-reactive for cutoff index <1.0 (The Roche Group, 2020).',
    'Sub-grouping Variable': 'Age',
    Immunoassays: [ 'recmWBBWkNmbnhJJb' ],
    'Sample Frame (groups of interest) (Dev)': [ 'recSjc1EnJvaBB35i' ],
    'Adjusted serum pos prevalence, 95pct CI Lower': 0.11258914295791522,
    'Adjusted serum pos prevalence, 95pct CI Upper': 0.18966615042418622,
    'Adjusted serum positive prevalence': 0.16435093589668381,
    'Adjusted sensitivity': 1,
    'Adjusted specificity': 0.995,
    'Independent evaluation type': 'FINDDx / MUHC independent evaluation',
    'Immunoassays copy': '"Roche Diagnostics - IgG, IgM, IgA - Elecsys® Anti‐SARS‐CoV‐2 (N)"',
    'Immunoassays copy 2': '"Roche Diagnostics - IgG, IgM, IgA - Elecsys® Anti‐SARS‐CoV‐2 (N)"',
    'Population Type (Sample Frame GOI)': [ 'General Population' ],
    'Manufacturer Sensitivity (Immunoassay)': [ 1 ],
    'Manufacturer Specificity (Immunoassay)': [ 0.995 ],
    'WHO/Doherty/Find Verified': [ 'Unverified' ],
    'Manufacturer sn/sp reported?': '1',
    'Number of Assays': 1,
    'Manufacturer Sn Assay 1 (Unity)': 1,
    'Manufacturer Sn Assay 2 (Unity)': 1,
    'Combined Sensitivity (Unity)': -2,
    'Manufacturer Sp Assay 1 (Unity)': 0.995,
    'Manufacturer Sp Assay 2 (Unity)': 0.995,
    'Combined Specificity (Unity)': -2,
    'Sn/Sp Combo': 1,
    'JBI 1': [ 'No' ],
    'Source Name': [
      'SARS-CoV-2 seroprevalence in the urban population of Qatar: An analysis of antibody testing on a sample of 112,941 individuals'
    ],
    'source second': [ null ],
    'Lead Institution': [ 'Cornell University' ],
    'Lead Organization': [ 'Cornell University' ],
    'JBI 3 (archive)': [ 'Yes' ],
    'JBI 7 (archive)': [ 'Yes' ],
    'Study Inclusion Criteria': [
      'The sample included residual blood specimens collected from individuals receiving routine and other clinical care at Hamad Medical Corporation (HMC), a main provider of healthcare to the urban population of this country and the nationally designated provider for Coronavirus Disease 2019 (COVID-19) healthcare needs.'
    ],
    Country: 'Qatar',
    'Specific Geography': 'Qatar',
    'JBI 4 (archive)': [ 'Yes' ],
    'JBI 5': [ 'Yes' ],
    'JBI 6 (archive)': [ 'Yes' ],
    'Measure of age': [ 'Groups' ],
    'Age variation': [ 'NR' ],
    'Rapid Review Study Name (Text)': '210523_Qatar_CornellUniversity',
    'Number of males': [ 58234 ],
    Location: 'Qatar',
    'One-Line Summary': [
      'Researchers from Cornell University studied the general population (n=112,941) in Qatar and found a seroprevalence of 13.3%.'
    ],
    'JBI 9': [ 'N/A' ],
    'Number of females': [ 54707 ],
    'Organizational Author': [ null ],
    'Test Manufacturer, Type (Sn, Sp)': '; NR\n(99.5%; 99.8%)',
    'JBI 8 (archive)': [ 'Yes' ],
    'Inclusion Criteria': [
      'The sample included residual blood specimens collected from individuals receiving routine and other clinical care at Hamad Medical Corporation (HMC), a main provider of healthcare to the urban population of this country and the nationally designated provider for Coronavirus Disease 2019 (COVID-19) healthcare needs.'
    ],
    'Study Dates': '05/12 - 09/09',
    'Average age': [
      '<10\t(n = 3384)\n' +
        '10-19 (n=5557)\n' +
        '20-29 (n = 19271)\n' +
        '30-39 (n=31622)\n' +
        '40-49 (n = 23582)\n' +
        '50-59 (n = 16363)\n' +
        '60-69 (n = 8639)\n' +
        '70-79 (n = 3192)\n' +
        '80+\t(n = 1331)'
    ],
    'JBI 2 (archive)': [ 'No' ],
    'Age variation measure': [ 'Not reported' ],
    'Source Publisher': [ 'iScience' ],
    'Study Type': [ 'Cross-sectional survey ' ],
    URL: [ 'http://dx.doi.org/10.1016/j.isci.2021.102646' ],
    'First Author Full Name': [ 'Peter Coyle' ],
    'Record ID': 'rec005OFc4WE6CCbq',
    'average age lookup': [
      '<10\t(n = 3384)\n' +
        '10-19 (n=5557)\n' +
        '20-29 (n = 19271)\n' +
        '30-39 (n=31622)\n' +
        '40-49 (n = 23582)\n' +
        '50-59 (n = 16363)\n' +
        '60-69 (n = 8639)\n' +
        '70-79 (n = 3192)\n' +
        '80+\t(n = 1331)'
    ],
    'Measure of age (from Rapid Review: Study)': [ 'Groups' ],
    'Age variation measure (from Rapid Review: Study)': [ 'Not reported' ],
    'Age variation (from Rapid Review: Study)': [ 'NR' ],
    'Publication Date': [ '2021-05-23' ],
    'study sampling end date': [ '2020-09-09' ],
    'pub date vs study end': 256,
    'pub date vs estimate end': 256,
    'pub date vs estimate start': 376,
    'study sampling start date': [ '2020-05-12' ],
    'study vs est start': 'TRUE',
    'study vs est end': 'TRUE',
    'Country or Area': [ 'recVqohjibzFaYEaU' ],
    'Lower bound error in extraction?': ' ',
    'estimate check 95% upper bound': 'error',
    'Diagnostic calc: num/denom seroprevalence': 0.1967854305445212,
    'Diagnostic calc: difference in calc vs. extracted estimate': 0.017785430544521197,
    'Diagnostic flag: difference >0.6%': 'error',
    'Included?': [ true ],
    'ETL Included': 1,
    'Overall RoB - JBI 2': [ 'Moderate' ],
    'Overall RoB - JBI 1': [ 'Moderate' ],
    'Overall Risk of Bias (JBI) archive': 'Moderate',
    'Diagnostic calc: pub date vs study start': 256,
    'Diagnostic flag: difference >5%': 'clear',
    'Denominator Minus Numerator': 13143,
    'JBI discrepancy': 'Clear',
    'Expedited Extraction? (Source)': [ null ],
    'Diagnostic flag: Pub date +365 from study date': 'clean',
    'Diagnostic flag: Pub date -365 from study date': 'clean',
    'Diagnostic calc: Start date check': 376,
    'Diagnostic flag: start dates study and estimates': 'clean',
    'Diagnostic calc: End date check': 0,
    'Diagnostic flag: end dates study and estimates': 'clean',
    'Diagnostic flag: Num>Denom': 'clear',
    'estimate check 95% lower bound': 'clear',
    'Zotero Citation Key': [ 'coyle_sars-cov-2_2021-1' ],
    'Biblio inclusion (from Rapid Review: Source) (from Rapid Review: Study)': [ null ],
    'HRP Status': [ 'non-HRP' ],
    'UNITY: Criteria': [ 'Unity-Aligned' ],
    'Test Name': 'Elecsys® Anti‐SARS‐CoV‐2 (N)',
    'Number of Tests': 1,
    'unclear sample': [ null ],
    'Test Manufacturer': 'Roche Diagnostics',
    'Start Date': '2020-05-12',
    'Sampling Start Date (ISO)': '2020-05-12',
    'Sampling End Date (ISO)': '2020-09-09',
    'Publication Date (ISO)': '2021-05-23',
    'Date Created': '2021-11-11',
    'Date Created (ISO)': '2021-11-11',
    'Last modified time': '2024-03-01',
    'Last Modified time (ISO)': '2024-03-01',
    'Serum positive prevalence (%)': 17.9,
    'Sensitivity (%)': 99.5,
    'Specificity (%)': 99.8,
    'First reviewer': [ 'Christian Cao' ],
    'Second Reviewer': [ 'Gabriel Deveaux' ],
    'Data Quality Status': 'Verified',
    'First Reviewer (from Rapid Review: Study)': [ 'Christian Cao' ],
    'All Subgroups': 'Primary Estimate,Analysis,Sex/Gender,Age',
    'Country HRP Status': [ 'non-HRP' ],
    'Unity Sample Frame ': [ 'General Population' ],
    'Source Date Created': [ '2021-05-23' ],
    'Manufacturer SN': [ 1 ],
    'Manufacturer SP': [ 0.995 ],
    'DC: Special Pop Sample Frame (Inclusion Formula)': 'Requires Sample Frame Clean',
    'JBI-A (Item 6)': [ 'Yes' ],
    'Study Exclusion Criteria': [ 'NR' ],
    'GitHub CSV Included': 1,
    'JBI-A Outputs (v5)': [ 'Moderate' ],
    'Multiple Test Gold Standard Algorithm': [ 'Non-Gold Standard' ],
    'WHO GBD Region (Gen Pop)': [ 'EMR' ],
    'JBI 8A (Gen Pop)': [ 'Yes' ],
    'JBI 8B (Gen Pop)': [ 'Yes' ],
    'Immunoassays (Name)': '"Roche Diagnostics - IgG IgM IgA - Elecsys® Anti‐SARS‐CoV‐2 (N)"',
    'start date (genpop)': [ '2020-05-12' ],
    end_date_genpop: [ '2020-09-09' ],
    start_date_genpop: [ '2020-05-12' ],
    'Alpha3 Code': [ 'QAT' ],
    'Item 6 (JBI-A)': [ 'Yes' ],
    'Biblio CSV Included': 1,
    'UNITY: Single Test Validity': [ 'Test Valid' ],
    'Subgroup Variables Available (from Rapid Review: Study)': [ 'Age', 'Sex/Gender', 'Nationality' ],
    'Overall Risk of Bias (JBI)': [ 'Moderate' ],
    'Covid/Vaccine Exclusion': [ true ],
    'JBI Risk of Bias': [ 'Moderate' ],
    'Number of Immunoassays (WFC)': 1,
    'Test Type (Immunoassays; WFC)': 'CLIA, CMIA',
    'Test Type': 'CLIA',
    'JBI 2': [ 'No' ],
    'JBI 3': [ 'Yes' ],
    'JBI 4': [ 'Yes' ],
    'JBI 7': [ 'Yes' ],
    'JBI 8': [ 'Yes' ],
    'JBI 6': [ 'Yes' ],
    'JBI 8B': [ 'Yes' ],
    'Isotype (Immunoassay)': [ 'IgG, IgM, IgA' ],
    'Isotype(s) Reported': 'Not reported',
    'Antibody Target (Immunoassays)': [ 'Nucleocapsid (N-protein)' ],
    'Antibody target': [ 'Nucleocapsid (N-protein)' ],
    'Isotype(s) Reported (Reviewer) - Sorted': 'Not reported',
    'Adequate Assay': 'Yes',
    'Probability Sampling (Gen Pop)': [ 'No' ],
    'Country Income': [ 'High income' ],
    'Antibody target (Gen Pop)': [ 'Nucleocapsid (N-protein)' ],
    'Seroprevalence (95% CI)': '17.9% (NR)',
    'WHO Evaluation (from Immunoassays)': [ null ],
    'WHO Verified': [ null ],
    'Source Type': [ 'Journal Article (Peer-Reviewed)' ],
    'included in SRMA (mar 2021)': [ true ],
    id: 'rec005OFc4WE6CCbq'
  }]
  

  //const allEstimatesUnformatted: (FieldSet & { id: string })[] =
  //  await estimateSheet
  //    .select({
  //      'maxRecords': 1
  //    })
  //    .all()
  //    .then((estimateSheet) =>
  //      estimateSheet.map((record) => ({ ...record.fields, id: record.id }))
  //    );

  pipe(
    {
      allEstimates: allEstimatesUnformatted,
    },
    validateEstimatesFromAirtableStep,
    cleanEstimatesFromAirtableStep,
    cleanBadValuesFromEstimatesStep,
    filterEstimatesWhichDontMeetDataStructureRequirements,
    writeEstimatesToCsvStep
  );

  console.log("Exiting");
  process.exit(1);
}

await generateSarsCov2DataCsv().catch((error) => console.error(error));