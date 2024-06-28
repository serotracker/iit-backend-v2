import {
  UnRegion as UnRegionForApi,
  WhoRegion as WhoRegionForApi,
  GbdSubRegion as GBDSubRegionForApi,
  GbdSuperRegion as GBDSuperRegionForApi,
  Month as MonthForApi
} from "./graphql-types/__generated__/graphql-types.js";
import { UNRegion } from "../lib/un-regions.js";
import { WHORegion } from "../lib/who-regions.js";
import { GBDSuperRegion, GBDSubRegion } from "../lib/gbd-regions.js";
import { Month } from "../storage/types.js";

const unRegionMap: {[key in UNRegion]: UnRegionForApi} = {
  [UNRegion.NORTHERN_AFRICA]: UnRegionForApi.NorthernAfrica,
  [UNRegion.EASTERN_AFRICA]: UnRegionForApi.EasternAfrica,
  [UNRegion.MIDDLE_AFRICA]: UnRegionForApi.MiddleAfrica,
  [UNRegion.SOUTHERN_AFRICA]: UnRegionForApi.SouthernAfrica,
  [UNRegion.WESTERN_AFRICA]: UnRegionForApi.WesternAfrica,
  [UNRegion.CARIBBEAN]: UnRegionForApi.Caribbean,
  [UNRegion.CENTRAL_AMERICA]: UnRegionForApi.CentralAmerica,
  [UNRegion.SOUTH_AMERICA]: UnRegionForApi.SouthAmerica,
  [UNRegion.NORTHERN_AMERICA]: UnRegionForApi.NorthernAmerica,
  [UNRegion.CENTRAL_ASIA]: UnRegionForApi.CentralAsia,
  [UNRegion.EASTERN_ASIA]: UnRegionForApi.EasternAsia,
  [UNRegion.SOUTH_EASTERN_ASIA]: UnRegionForApi.SouthEasternAsia,
  [UNRegion.SOUTHERN_ASIA]: UnRegionForApi.SouthernAsia,
  [UNRegion.WESTERN_ASIA]: UnRegionForApi.WesternAsia,
  [UNRegion.EASTERN_EUROPE]: UnRegionForApi.EasternEurope,
  [UNRegion.NORTHERN_EUROPE]: UnRegionForApi.NorthernEurope,
  [UNRegion.SOUTHERN_EUROPE]: UnRegionForApi.SouthernEurope,
  [UNRegion.WESTERN_EUROPE]: UnRegionForApi.WesternEurope,
  [UNRegion.AUSTRALIA_AND_NEW_ZEALAND]: UnRegionForApi.AustraliaAndNewZealand,
  [UNRegion.MELANESIA]: UnRegionForApi.Melanesia,
  [UNRegion.MICRONESIA]: UnRegionForApi.Micronesia,
  [UNRegion.POLYNESIA]: UnRegionForApi.Polynesia,
}

const monthMap: {[key in Month]: MonthForApi} = {
  [Month.JANUARY]: MonthForApi.January,
  [Month.FEBRUARY]: MonthForApi.February,
  [Month.MARCH]: MonthForApi.March,
  [Month.APRIL]: MonthForApi.April,
  [Month.MAY]: MonthForApi.May,
  [Month.JUNE]: MonthForApi.June,
  [Month.JULY]: MonthForApi.July,
  [Month.AUGUST]: MonthForApi.August,
  [Month.SEPTEMBER]: MonthForApi.September,
  [Month.OCTOBER]: MonthForApi.October,
  [Month.NOVEMBER]: MonthForApi.November,
  [Month.DECEMBER]: MonthForApi.December
}

const whoRegionMap: {[key in WHORegion]: WhoRegionForApi} = {
  [WHORegion.AFR]: WhoRegionForApi.Afr,
  [WHORegion.AMR]: WhoRegionForApi.Amr,
  [WHORegion.SEAR]: WhoRegionForApi.Sear,
  [WHORegion.EUR]: WhoRegionForApi.Eur,
  [WHORegion.EMR]: WhoRegionForApi.Emr,
  [WHORegion.WPR]: WhoRegionForApi.Wpr,
}

const gbSuperRegionMap: {[key in GBDSuperRegion]: GBDSuperRegionForApi} = {
  [GBDSuperRegion.CENTRAL_EUROPE_EASTERN_EUROPE_AND_CENTRAL_ASIA]: GBDSuperRegionForApi.CentralEuropeEasternEuropeAndCentralAsia,
  [GBDSuperRegion.HIGH_INCOME]: GBDSuperRegionForApi.HighIncome,
  [GBDSuperRegion.LATIN_AMERICA_AND_CARIBBEAN]: GBDSuperRegionForApi.LatinAmericaAndCaribbean,
  [GBDSuperRegion.NORTH_AFRICA_AND_MIDDLE_EAST]: GBDSuperRegionForApi.NorthAfricaAndMiddleEast,
  [GBDSuperRegion.SOUTH_ASIA]: GBDSuperRegionForApi.SouthAsia,
  [GBDSuperRegion.SOUTH_EAST_ASIA_EAST_ASIA_AND_OCEANIA]: GBDSuperRegionForApi.SouthEastAsiaEastAsiaAndOceania,
  [GBDSuperRegion.SUB_SAHARAN_AFRICA]: GBDSuperRegionForApi.SubSaharanAfrica,
}

const gbSubRegionMap: {[key in GBDSubRegion]: GBDSubRegionForApi} = {
  [GBDSubRegion.SOUTH_EAST_ASIA_EAST_ASIA_AND_OCEANIA_SUBREGION_SOUTH_EAST_ASIA]: GBDSubRegionForApi.SouthEastAsiaEastAsiaAndOceaniaSubregionSouthEastAsia,
  [GBDSubRegion.SOUTH_EAST_ASIA_EAST_ASIA_AND_OCEANIA_SUBREGION_OCEANIA]: GBDSubRegionForApi.SouthEastAsiaEastAsiaAndOceaniaSubregionOceania,
  [GBDSubRegion.SOUTH_EAST_ASIA_EAST_ASIA_AND_OCEANIA_SUBREGION_EAST_ASIA]: GBDSubRegionForApi.SouthEastAsiaEastAsiaAndOceaniaSubregionEastAsia,
  [GBDSubRegion.SOUTH_ASIA_SUBREGION_SOUTH_ASIA]: GBDSubRegionForApi.SouthAsiaSubregionSouthAsia,
  [GBDSubRegion.SUB_SAHARAN_AFRICA_SUBREGION_WESTERN]: GBDSubRegionForApi.SubSaharanAfricaSubregionWestern,
  [GBDSubRegion.SUB_SAHARAN_AFRICA_SUBREGION_SOUTHERN]: GBDSubRegionForApi.SubSaharanAfricaSubregionSouthern,
  [GBDSubRegion.SUB_SAHARAN_AFRICA_SUBREGION_CENTRAL]: GBDSubRegionForApi.SubSaharanAfricaSubregionCentral,
  [GBDSubRegion.SUB_SAHARAN_AFRICA_SUBREGION_EASTERN]: GBDSubRegionForApi.SubSaharanAfricaSubregionEastern,
  [GBDSubRegion.LATIN_AMERICA_AND_CARIBBEAN_SUBREGION_TROPICAL]: GBDSubRegionForApi.LatinAmericaAndCaribbeanSubregionTropical,
  [GBDSubRegion.LATIN_AMERICA_AND_CARIBBEAN_SUBREGION_CARIBBEAN]: GBDSubRegionForApi.LatinAmericaAndCaribbeanSubregionCaribbean,
  [GBDSubRegion.LATIN_AMERICA_AND_CARIBBEAN_SUBREGION_ANDEAN]: GBDSubRegionForApi.LatinAmericaAndCaribbeanSubregionAndean,
  [GBDSubRegion.LATIN_AMERICA_AND_CARIBBEAN_SUBREGION_CENTRAL]: GBDSubRegionForApi.LatinAmericaAndCaribbeanSubregionCentral,
  [GBDSubRegion.CENTRAL_EUROPE_EASTERN_EUROPE_AND_CENTRAL_ASIA_SUBREGION_CENTRAL_ASIA]: GBDSubRegionForApi.CentralEuropeEasternEuropeAndCentralAsiaSubregionCentralAsia,
  [GBDSubRegion.CENTRAL_EUROPE_EASTERN_EUROPE_AND_CENTRAL_ASIA_SUBREGION_CENTRAL_EUROPE]: GBDSubRegionForApi.CentralEuropeEasternEuropeAndCentralAsiaSubregionCentralEurope,
  [GBDSubRegion.CENTRAL_EUROPE_EASTERN_EUROPE_AND_CENTRAL_ASIA_SUBREGION_EASTERN_EUROPE]: GBDSubRegionForApi.CentralEuropeEasternEuropeAndCentralAsiaSubregionEasternEurope,
  [GBDSubRegion.NORTH_AFRICA_AND_MIDDLE_EAST_SUBREGION_NORTH_AFRICA_AND_MIDDLE_EAST]: GBDSubRegionForApi.NorthAfricaAndMiddleEastSubregionNorthAfricaAndMiddleEast,
  [GBDSubRegion.HIGH_INCOME_SUBREGION_WESTERN_EUROPE]: GBDSubRegionForApi.HighIncomeSubregionWesternEurope,
  [GBDSubRegion.HIGH_INCOME_SUBREGION_SOUTHERN_LATIN_AMERICA]: GBDSubRegionForApi.HighIncomeSubregionSouthernLatinAmerica,
  [GBDSubRegion.HIGH_INCOME_SUBREGION_NORTH_AMERICA]: GBDSubRegionForApi.HighIncomeSubregionNorthAmerica,
  [GBDSubRegion.HIGH_INCOME_SUBREGION_ASIA_PACIFIC]: GBDSubRegionForApi.HighIncomeSubregionAsiaPacific,
  [GBDSubRegion.HIGH_INCOME_SUBREGION_AUSTRALASIA]: GBDSubRegionForApi.HighIncomeSubregionAustralasia
}

export const mapUnRegionForApi = (unRegion: UNRegion): UnRegionForApi => unRegionMap[unRegion];
export const mapWhoRegionForApi = (whoRegion: WHORegion): WhoRegionForApi => whoRegionMap[whoRegion];
export const mapMonthForApi = (month: Month): MonthForApi => monthMap[month];
export const mapGbdSubRegionForApi = (gbdSubRegion: GBDSubRegion): GBDSubRegionForApi => gbSubRegionMap[gbdSubRegion];
export const mapGbdSuperRegionForApi = (gbdSuperRegion: GBDSuperRegion): GBDSuperRegionForApi => gbSuperRegionMap[gbdSuperRegion];