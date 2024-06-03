import { request } from "undici";
import { MongoClient } from "mongodb";
import { StructuredPositiveCaseData } from "../types";
import {
  EstimateFieldsAfterFetchingVaccinationDataStep,
  StructuredCountryPopulationDataAfterFetchingVaccinationDataStep,
  StructuredPositiveCaseDataAfterFetchingVaccinationDataStep,
  StructuredVaccinationDataAfterFetchingVaccinationDataStep,
  StudyFieldsAfterFetchingVaccinationDataStep
} from "./fetch-vaccination-data-step";
import { TwoLetterIsoCountryCode } from "../../../lib/geocoding-api/country-codes";
import { groupByArray, typedObjectEntries } from "../../../lib/lib.js";

export type EstimateFieldsAfterFetchingPositiveCaseDataStep = EstimateFieldsAfterFetchingVaccinationDataStep;
export type StudyFieldsAfterFetchingPositiveCaseDataStep = StudyFieldsAfterFetchingVaccinationDataStep;
export type StructuredVaccinationDataAfterFetchingPositiveCaseDataStep = StructuredVaccinationDataAfterFetchingVaccinationDataStep;
export type StructuredPositiveCaseDataAfterFetchingPositiveCaseDataStep = StructuredPositiveCaseData;
export type StructuredCountryPopulationDataAfterFetchingPositiveCaseDataStep = StructuredCountryPopulationDataAfterFetchingVaccinationDataStep;

interface FetchPositiveCaseDataStepInput {
  allEstimates: EstimateFieldsAfterFetchingVaccinationDataStep[];
  allStudies: StudyFieldsAfterFetchingVaccinationDataStep[];
  vaccinationData: StructuredVaccinationDataAfterFetchingVaccinationDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterFetchingVaccinationDataStep;
  countryPopulationData: StructuredCountryPopulationDataAfterFetchingVaccinationDataStep;
  mongoClient: MongoClient;
}

interface FetchPositiveCaseDataStepOutput {
  allEstimates: EstimateFieldsAfterFetchingPositiveCaseDataStep[];
  allStudies: StudyFieldsAfterFetchingPositiveCaseDataStep[];
  vaccinationData: StructuredVaccinationDataAfterFetchingPositiveCaseDataStep;
  positiveCaseData: StructuredPositiveCaseDataAfterFetchingPositiveCaseDataStep;
  countryPopulationData: StructuredCountryPopulationDataAfterFetchingPositiveCaseDataStep;
  mongoClient: MongoClient;
}

const countryNamesInCSVToTwoLetterCountryCode: Record<string, TwoLetterIsoCountryCode | undefined> = {
  "Afghanistan": "AF",
  "Albania": "AL",
  "Algeria": "DZ",
  "Andorra": "AD",
  "Angola": "AO",
  "Anguilla": "AI",
  "Antigua and Barbuda": "AG",
  "Argentina": "AR",
  "Armenia": "AM",
  "Aruba": "AW",
  "Australia": "AU",
  "Austria": "AT",
  "Azerbaijan": "AZ",
  "Bahamas": "BS",
  "Bahrain": "BH",
  "Bangladesh": "BD",
  "Barbados": "BB",
  "Belarus": "BY",
  "Belgium": "BE",
  "Belize": "BZ",
  "Benin": "BJ",
  "Bermuda": "BM",
  "Bhutan": "BT",
  "Bolivia": "BO",
  "Bonaire Sint Eustatius and Saba": "BQ",
  "Bosnia and Herzegovina": "BA",
  "Botswana": "BW",
  "Brazil": "BR",
  "British Virgin Islands": "VG",
  "Brunei": "BN",
  "Bulgaria": "BG",
  "Burkina Faso": "BF",
  "Burundi": "BI",
  "Cambodia": "KH",
  "Cameroon": "CM",
  "Canada": "CA",
  "Cape Verde": "CV",
  "Cayman Islands": "KY",
  "Central African Republic": "CF",
  "Chad": "TD",
  "Chile": "CL",
  "China": "CN",
  "Colombia": "CO",
  "Comoros": "KM",
  "Congo": "CG",
  "Cook Islands": "CK",
  "Costa Rica": "CR",
  "Cote d'Ivoire": "CI",
  "Croatia": "HR",
  "Cuba": "CU",
  "Curacao": "CW",
  "Cyprus": "CY",
  "Czechia": "CZ",
  "Democratic Republic of Congo": "CD",
  "Denmark": "DK",
  "Djibouti": "DJ",
  "Dominica": "DM",
  "Dominican Republic": "DO",
  "Ecuador": "EC",
  "Egypt": "EG",
  "El Salvador": "SV",
  "Equatorial Guinea": "GQ",
  "Eritrea": "ER",
  "Estonia": "EE",
  "Eswatini": "SZ",
  "Ethiopia": "ET",
  "Faeroe Islands": "FO",
  "Falkland Islands": "FK",
  "Fiji": "FJ",
  "Finland": "FI",
  "France": "FR",
  "French Polynesia": "PF",
  "Gabon": "GA",
  "Gambia": "GM",
  "Georgia": "GE",
  "Germany": "DE",
  "Ghana": "GH",
  "Gibraltar": "GI",
  "Greece": "GR",
  "Greenland": "GL",
  "Grenada": "GD",
  "Guatemala": "GT",
  "Guinea": "GN",
  "Guinea-Bissau": "GW",
  "Guyana": "GY",
  "Haiti": "HT",
  "Honduras": "HN",
  "Hong Kong": "HK",
  "Hungary": "HU",
  "Iceland": "IS",
  "India": "IN",
  "Indonesia": "ID",
  "Iran": "IR",
  "Iraq": "IQ",
  "Ireland": "IE",
  "Isle of Man": "IM",
  "Israel": "IL",
  "Italy": "IT",
  "Jamaica": "JM",
  "Japan": "JP",
  "Jordan": "JO",
  "Kazakhstan": "KZ",
  "Kenya": "KE",
  "Kiribati": "KI",
  "Kosovo": "XK",
  "Kuwait": "KW",
  "Kyrgyzstan": "KG",
  "Laos": "LA",
  "Latvia": "LV",
  "Lebanon": "LB",
  "Lesotho": "LS",
  "Liberia": "LR",
  "Libya": "LY",
  "Liechtenstein": "LI",
  "Lithuania": "LT",
  "Luxembourg": "LU",
  "Macao": "MO",
  "Madagascar": "MG",
  "Malawi": "MW",
  "Malaysia": "MY",
  "Maldives": "MV",
  "Mali": "ML",
  "Malta": "MT",
  "Marshall Islands": "MH",
  "Mauritania": "MR",
  "Mauritius": "MU",
  "Mexico": "MX",
  "Micronesia (country)": "FM",
  "Moldova": "MD",
  "Monaco": "MC",
  "Mongolia": "MN",
  "Montenegro": "ME",
  "Montserrat": "MS",
  "Morocco": "MA",
  "Mozambique": "MZ",
  "Myanmar": "MM",
  "Namibia": "NA",
  "Nauru": "NR",
  "Nepal": "NP",
  "Netherlands": "NL",
  "New Caledonia": "NC",
  "New Zealand": "NZ",
  "Nicaragua": "NI",
  "Niger": "NE",
  "Nigeria": "NG",
  "North Korea": "KP",
  "North Macedonia": "MK",
  "Norway": "NO",
  "Oman": "OM",
  "Pakistan": "PK",
  "Palau": "PW",
  "Palestine": "PS",
  "Panama": "PA",
  "Papua New Guinea": "PG",
  "Paraguay": "PY",
  "Peru": "PE",
  "Philippines": "PH",
  "Poland": "PL",
  "Portugal": "PT",
  "Qatar": "QA",
  "Romania": "RO",
  "Russia": "RU",
  "Rwanda": "RW",
  "Saint Helena": "SH",
  "Saint Kitts and Nevis": "KN",
  "Saint Lucia": "LC",
  "Saint Pierre and Miquelon": "PM",
  "Saint Vincent and the Grenadines": "VC",
  "Samoa": "WS",
  "San Marino": "SM",
  "Sao Tome and Principe": "ST",
  "Saudi Arabia": "SA",
  "Senegal": "SN",
  "Serbia": "RS",
  "Seychelles": "SC",
  "Sierra Leone": "SL",
  "Singapore": "SG",
  "Slovakia": "SK",
  "Slovenia": "SI",
  "Solomon Islands": "SB",
  "Somalia": "SO",
  "South Africa": "ZA",
  "South Korea": "KR",
  "South Sudan": "SS",
  "Spain": "ES",
  "Sri Lanka": "LK",
  "Sudan": "SD",
  "Suriname": "SR",
  "Sweden": "SE",
  "Switzerland": "CH",
  "Syria": "SY",
  "Taiwan": "TW",
  "Tajikistan": "TJ",
  "Tanzania": "TZ",
  "Thailand": "TH",
  "Timor": "TL",
  "Togo": "TG",
  "Tonga": "TO",
  "Trinidad and Tobago": "TT",
  "Tunisia": "TN",
  "Turkey": "TR",
  "Turks and Caicos Islands": "TC",
  "Tuvalu": "TV",
  "Uganda": "UG",
  "Ukraine": "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  "United States": "US",
  "Uruguay": "UY",
  "Uzbekistan": "UZ",
  "Vanuatu": "VU",
  "Vatican": "VA",
  "Venezuela": "VE",
  "Vietnam": "VN",
  "Wallis and Futuna": "WF",
  "Yemen": "YE",
  "Zambia": "ZM",
  "Zimbabwe": "ZW"
}

export const fetchPositiveCaseDataStep = async(
  input: FetchPositiveCaseDataStepInput
): Promise<FetchPositiveCaseDataStepOutput> => {
  console.log(`Running step: fetchPositiveCaseDataStep. Remaining estimates: ${input.allEstimates.length}`);

  const { body } = await request(
    "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/jhu/total_cases_per_million.csv",
    { method: "GET" }
  );

  const rawCsvData = await body.text();
  
  const csvColumns = rawCsvData.split("\n").at(0)?.split(',') ?? []
  const indexOfDateColumn = csvColumns.findIndex(columnValue => columnValue === 'date');
  const countryCodesWithIndices = typedObjectEntries(countryNamesInCSVToTwoLetterCountryCode)
    .map(([countryNameInCsvFile, twoLetterCountryCode]) => ({
      twoLetterCountryCode: twoLetterCountryCode,
      indexOfColumn: csvColumns.findIndex(columnValue => columnValue === countryNameInCsvFile)
    }))

  const unformattedPositiveCaseData = rawCsvData
    .split("\n")
    .flatMap((element, index) => {
      if (index === 0 || !element) {
        return undefined;
      }

      const split_csv_line = element.split(",");
      const date = split_csv_line[indexOfDateColumn];
      const year = date.split("-")[0]
      const month = date.split("-")[1].replace(/^0+/, '')
      const day = date.split("-")[2].replace(/^0+/, '')

      return countryCodesWithIndices.map(({ twoLetterCountryCode, indexOfColumn }) => (twoLetterCountryCode ? {
        twoLetterCountryCode,
        year,
        month,
        day,
        countryPositiveCasesPerMillionPeople: split_csv_line[indexOfColumn] !== '' ? parseFloat(split_csv_line[indexOfColumn]) : undefined,
      } : undefined)).filter(<T>(element: T | undefined): element is T => !!element);
    })
    .filter(<T>(element: T | undefined): element is T => !!element);

  const formattedPositiveCaseData = groupByArray(
    unformattedPositiveCaseData,
    "twoLetterCountryCode"
  ).map(({ twoLetterCountryCode, data }) => ({
    twoLetterCountryCode,
    data: groupByArray(data, "year").map(({ year, data }) => ({
      year,
      data: groupByArray(data, "month"),
    })),
  }));

  return {
    allEstimates: input.allEstimates,
    allStudies: input.allStudies,
    vaccinationData: input.vaccinationData,
    positiveCaseData: formattedPositiveCaseData,
    countryPopulationData: input.countryPopulationData,
    mongoClient: input.mongoClient
  };
};
