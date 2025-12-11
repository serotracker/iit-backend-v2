import { readFileSync } from "fs";
import { z } from "zod";

export type OropoucheCaseDataEntry = never;
export type GeoJSONData = {};

const bolivianProvincesToISOProvinceIds = {
  'La Paz': 'BO-L',
  'Beni': 'BO-B',
  'Pando': 'BO-N'
}

const brazilianProvincesToISOProvinceIds = {
  'Amazonas': 'BR-AM',
  'Rondônia': 'BR-RO',
  'Acre': 'BR-AC',
  'Roraima': 'BR-RR',
  'Pará': 'BR-PA',
  'Tocatins': 'BR-TO',
  'Bahia': 'BR-BA',
  'Espírito Santo': 'BR-ES',
  'Santa Catarina': 'BR-SC',
  'Pernambuco': 'BR-PE',
  'Minas Gerais': 'BR-MG',
  'Rio de Janeiro': 'BR-RJ',
  'Ceará': 'BR-CE',
  'Piauí': 'BR-PI',
  'Maranhão': 'BR-MA',
  'Mato Grosso': 'BR-MT',
  'Amapá': 'BR-AP',
  'Paraná': 'BR-PR',
  'Sergipe': 'BR-SE',
  'Paraíba': 'BR-PB',
}

const colombianProvincesToISOProvinceIds = {
  'Amazonas': 'CO-AMA',
  'Caquetá': 'CO-CAQ',
  'Meta': 'CO-MET'
}

const cubanProvincesToISOProvinceIds = {
  'Santiago de Cuba': 'CU-13',
  'Cienfuegos': 'Cienfuegos'
}

const peruvianProvincesToISOProvinceIds = {
  'Loreto': 'PE-LOR',
  'Madre de Dios': 'PE-MDD',
  'Ucayali': 'PE-UCA',
  'Huánuco': 'PE-HUC',
  'Tumbes': 'PE-TUM',
}

const provinceIdMap: Record<string, Record<string, string | undefined> | undefined> = {
  'BOL': bolivianProvincesToISOProvinceIds,
  'BRA': brazilianProvincesToISOProvinceIds,
  'COL': colombianProvincesToISOProvinceIds,
  'CUB': cubanProvincesToISOProvinceIds,
  'PER': peruvianProvincesToISOProvinceIds
}

export type OropoucheCaseDataEntryAfterFetchingOropoucheCaseData = {
  countryAlphaThreeCode: string;
  province: string;
  provinceIsoId: string;
  reportedCases: number;
};
export type GeoJSONDataAfterFetchingOropoucheCaseData = {};

interface FetchOropoucheCaseDataInput {
  oropoucheCaseData: OropoucheCaseDataEntry[];
  geoJsonData: GeoJSONData;
}

interface FetchOropoucheCaseDataOutput {
  oropoucheCaseData: OropoucheCaseDataEntryAfterFetchingOropoucheCaseData[];
  geoJsonData: GeoJSONDataAfterFetchingOropoucheCaseData;
}

export const fetchOropoucheCaseData = (input: FetchOropoucheCaseDataInput): FetchOropoucheCaseDataOutput => {
  console.log('Running step: fetchOropoucheCaseData.');

  const rawFileData = readFileSync('./data/arbo/oropouche-cases-jan-2024-to-july-2024.csv').toString();
  const rowsInFile = rawFileData.replaceAll('\r\n', '\n').split('\n');

  const rawFileDataHeaders = rowsInFile.at(0);
  const rawFileDataRows = rowsInFile.slice(1);

  if(rawFileDataRows.length === 0 || rawFileDataHeaders === undefined) {
    return {
      oropoucheCaseData: [],
      geoJsonData: input.geoJsonData
    }
  }

  const indexToHeaderMap = rawFileDataHeaders
    .split(',')
    .map((header, index) => ({ [index]: header }))
    .reduce((accumulator, value) => ({...accumulator, ...value }), {})

  const data = rawFileDataRows.map((row) => row
    .split(',')
    .map((value, index): Record<string, string | undefined> => ({[indexToHeaderMap[index]]: value}))
    .reduce<Record<string, string | undefined>>((accumulator, value) => ({...accumulator, ...value }), {})
  )

  const zodCsvFileRowSchema = z.object({
    countryAlphaThreeCode: z.string(),
    province: z.string(),
    reportedCases: z.string()
  })

  return {
    oropoucheCaseData: data
      .map((row) => zodCsvFileRowSchema.parse(row))
      .map((row) => {
        const provinceNameToIdMap = provinceIdMap[row.countryAlphaThreeCode];

        if(!provinceNameToIdMap) {
          throw new Error(`Unrecognized country alpha three code: ${row.countryAlphaThreeCode}`)
        }

        const provinceIsoId = provinceNameToIdMap[row.province];

        if(!provinceIsoId) {
          throw new Error(`Unrecognized province name: ${row.province}`)
        }

        return {
          countryAlphaThreeCode: row.countryAlphaThreeCode,
          province: row.province,
          provinceIsoId,
          reportedCases: Number.parseInt(row.reportedCases)
        }
      }),
    geoJsonData: input.geoJsonData
  }
}