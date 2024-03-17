import { UnRegion as UnRegionForApi, WhoRegion as WhoRegionForApi } from "./graphql-types/__generated__/graphql-types.js";
import { UNRegion } from "../lib/un-regions.js";
import { WHORegion } from "../lib/who-regions.js";

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

const whoRegionMap: {[key in WHORegion]: WhoRegionForApi} = {
  [WHORegion.AFR]: WhoRegionForApi.Afr,
  [WHORegion.AMR]: WhoRegionForApi.Amr,
  [WHORegion.SEAR]: WhoRegionForApi.Sear,
  [WHORegion.EUR]: WhoRegionForApi.Eur,
  [WHORegion.EMR]: WhoRegionForApi.Emr,
  [WHORegion.WPR]: WhoRegionForApi.Wpr,
}

export const mapUnRegionForApi = (unRegion: UNRegion): UnRegionForApi => unRegionMap[unRegion];
export const mapWhoRegionForApi = (whoRegion: WHORegion): WhoRegionForApi => whoRegionMap[whoRegion];