import { TwoLetterIsoCountryCode } from "../etl/geocoding-api/country-codes";

enum UNRegion {
  NORTHERN_AFRICA = "NORTHERN_AFRICA",
  EASTERN_AFRICA = "EASTERN_AFRICA",
  MIDDLE_AFRICA = "MIDDLE_AFRICA",
  SOUTHERN_AFRICA = "SOUTHERN_AFRICA",
  WESTERN_AFRICA = "WESTERN_AFRICA",
  CARIBBEAN = "CARIBBEAN",
  CENTRAL_AMERICA = "CENTRAL_AMERICA",
  SOUTH_AMERICA = "SOUTH_AMERICA",
  NORTHERN_AMERICA = "NORTHERN_AMERICA",
  CENTRAL_ASIA = "CENTRAL_ASIA",
  EASTERN_ASIA = "EASTERN_ASIA",
  SOUTH_EASTERN_ASIA = "SOUTH_EASTERN_ASIA",
  SOUTHERN_ASIA = "SOUTHERN_ASIA",
  WESTERN_ASIA = "WESTERN_ASIA",
  EASTERN_EUROPE = "EASTERN_EUROPE",
  NORTHERN_EUROPE = "NORTHERN_EUROPE",
  SOUTHERN_EUROPE = "SOUTHERN_EUROPE",
  WESTERN_EUROPE = "WESTERN_EUROPE",
  AUSTRALIA_AND_NEW_ZEALAND = "AUSTRALIA_AND_NEW_ZEALAND",
  MELANESIA = "MELANESIA",
  MICRONESIA = "MICRONESIA",
  POLYNESIA = "POLYNESIA",
}

const countryAlphaTwoCodeToAllRegionsMap: Partial<
  Record<
    TwoLetterIsoCountryCode,
    { name: string; unRegionNames: string[]; whoRegionNames: [] }
  >
> = {
  AF: {
    name: "Afghanistan",
    unRegionNames: [UNRegion.SOUTHERN_ASIA],
    whoRegionNames: [],
  },
  AL: {
    name: "Albania",
    unRegionNames: [UNRegion.SOUTHERN_EUROPE],
    whoRegionNames: [],
  },
  DZ: {
    name: "Algeria",
    unRegionNames: [UNRegion.NORTHERN_AFRICA],
    whoRegionNames: [],
  },
  AS: {
    name: "American Samoa",
    unRegionNames: [UNRegion.POLYNESIA],
    whoRegionNames: [],
  },
  AD: {
    name: "Andorra",
    unRegionNames: [UNRegion.SOUTHERN_EUROPE],
    whoRegionNames: [],
  },
  AO: {
    name: "Angola",
    unRegionNames: [UNRegion.MIDDLE_AFRICA],
    whoRegionNames: [],
  },
  AI: {
    name: "Anguilla",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  AG: {
    name: "Antigua and Barbuda",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  AR: {
    name: "Argentina",
    unRegionNames: [UNRegion.SOUTH_AMERICA],
    whoRegionNames: [],
  },
  AM: {
    name: "Armenia",
    unRegionNames: [UNRegion.WESTERN_ASIA],
    whoRegionNames: [],
  },
  AW: {
    name: "Aruba",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  AU: {
    name: "Australia",
    unRegionNames: [UNRegion.AUSTRALIA_AND_NEW_ZEALAND],
    whoRegionNames: [],
  },
  AT: {
    name: "Austria",
    unRegionNames: [UNRegion.WESTERN_EUROPE],
    whoRegionNames: [],
  },
  AZ: {
    name: "Azerbaijan",
    unRegionNames: [UNRegion.WESTERN_ASIA],
    whoRegionNames: [],
  },
  BS: {
    name: "Bahamas",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  BH: {
    name: "Bahrain",
    unRegionNames: [UNRegion.WESTERN_ASIA],
    whoRegionNames: [],
  },
  BD: {
    name: "Bangladesh",
    unRegionNames: [UNRegion.SOUTHERN_ASIA],
    whoRegionNames: [],
  },
  BB: {
    name: "Barbados",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  BY: {
    name: "Belarus",
    unRegionNames: [UNRegion.EASTERN_EUROPE],
    whoRegionNames: [],
  },
  BE: {
    name: "Belgium",
    unRegionNames: [UNRegion.WESTERN_EUROPE],
    whoRegionNames: [],
  },
  BZ: {
    name: "Belize",
    unRegionNames: [UNRegion.CENTRAL_AMERICA],
    whoRegionNames: [],
  },
  BJ: {
    name: "Benin",
    unRegionNames: [UNRegion.WESTERN_AFRICA],
    whoRegionNames: [],
  },
  BM: {
    name: "Bermuda",
    unRegionNames: [UNRegion.NORTHERN_AMERICA],
    whoRegionNames: [],
  },
  BT: {
    name: "Bhutan",
    unRegionNames: [UNRegion.SOUTHERN_ASIA],
    whoRegionNames: [],
  },
  BO: {
    name: "Bolivia (Plurinational State of)",
    unRegionNames: [UNRegion.SOUTH_AMERICA],
    whoRegionNames: [],
  },
  BQ: {
    name: "Bonaire, Sint Eustatius and Saba",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  BA: {
    name: "Bosnia and Herzegovina",
    unRegionNames: [UNRegion.SOUTHERN_EUROPE],
    whoRegionNames: [],
  },
  BW: {
    name: "Botswana",
    unRegionNames: [UNRegion.SOUTHERN_AFRICA],
    whoRegionNames: [],
  },
  BR: {
    name: "Brazil",
    unRegionNames: [UNRegion.SOUTH_AMERICA],
    whoRegionNames: [],
  },
  VG: {
    name: "British Virgin Islands",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  BN: {
    name: "Brunei Darussalam",
    unRegionNames: [UNRegion.SOUTH_EASTERN_ASIA],
    whoRegionNames: [],
  },
  BG: {
    name: "Bulgaria",
    unRegionNames: [UNRegion.EASTERN_EUROPE],
    whoRegionNames: [],
  },
  BF: {
    name: "Burkina Faso",
    unRegionNames: [UNRegion.WESTERN_AFRICA],
    whoRegionNames: [],
  },
  BI: {
    name: "Burundi",
    unRegionNames: [UNRegion.EASTERN_AFRICA],
    whoRegionNames: [],
  },
  CV: {
    name: "Cabo Verde",
    unRegionNames: [UNRegion.WESTERN_AFRICA],
    whoRegionNames: [],
  },
  KH: {
    name: "Cambodia",
    unRegionNames: [UNRegion.SOUTH_EASTERN_ASIA],
    whoRegionNames: [],
  },
  CM: {
    name: "Cameroon",
    unRegionNames: [UNRegion.MIDDLE_AFRICA],
    whoRegionNames: [],
  },
  CA: {
    name: "Canada",
    unRegionNames: [UNRegion.NORTHERN_AMERICA],
    whoRegionNames: [],
  },
  KY: {
    name: "Cayman Islands",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  CF: {
    name: "Central African Republic",
    unRegionNames: [UNRegion.MIDDLE_AFRICA],
    whoRegionNames: [],
  },
  TD: {
    name: "Chad",
    unRegionNames: [UNRegion.MIDDLE_AFRICA],
    whoRegionNames: [],
  },
  CL: {
    name: "Chile",
    unRegionNames: [UNRegion.SOUTH_AMERICA],
    whoRegionNames: [],
  },
  CN: {
    name: "China",
    unRegionNames: [UNRegion.EASTERN_ASIA],
    whoRegionNames: [],
  },
  CX: {
    name: "Christmas Island",
    unRegionNames: [UNRegion.AUSTRALIA_AND_NEW_ZEALAND],
    whoRegionNames: [],
  },
  CC: {
    name: "Cocos (Keeling) Islands",
    unRegionNames: [UNRegion.AUSTRALIA_AND_NEW_ZEALAND],
    whoRegionNames: [],
  },
  CO: {
    name: "Colombia",
    unRegionNames: [UNRegion.SOUTH_AMERICA],
    whoRegionNames: [],
  },
  KM: {
    name: "Comoros",
    unRegionNames: [UNRegion.EASTERN_AFRICA],
    whoRegionNames: [],
  },
  CG: {
    name: "Congo",
    unRegionNames: [UNRegion.MIDDLE_AFRICA],
    whoRegionNames: [],
  },
  CK: {
    name: "Cook Islands",
    unRegionNames: [UNRegion.POLYNESIA],
    whoRegionNames: [],
  },
  CR: {
    name: "Costa Rica",
    unRegionNames: [UNRegion.CENTRAL_AMERICA],
    whoRegionNames: [],
  },
  HR: {
    name: "Croatia",
    unRegionNames: [UNRegion.SOUTHERN_EUROPE],
    whoRegionNames: [],
  },
  CU: {
    name: "Cuba",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  CW: {
    name: "Cura\u00e7ao",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  CY: {
    name: "Cyprus",
    unRegionNames: [UNRegion.WESTERN_ASIA],
    whoRegionNames: [],
  },
  CZ: {
    name: "Czechia",
    unRegionNames: [UNRegion.EASTERN_EUROPE],
    whoRegionNames: [],
  },
  CI: {
    name: "Côte d'Ivoire",
    unRegionNames: [UNRegion.WESTERN_AFRICA],
    whoRegionNames: [],
  },
  KP: {
    name: "Democratic People's Republic of Korea",
    unRegionNames: [UNRegion.EASTERN_ASIA],
    whoRegionNames: [],
  },
  CD: {
    name: "Democratic Republic of the Congo",
    unRegionNames: [UNRegion.MIDDLE_AFRICA],
    whoRegionNames: [],
  },
  DK: {
    name: "Denmark",
    unRegionNames: [UNRegion.NORTHERN_EUROPE],
    whoRegionNames: [],
  },
  DJ: {
    name: "Djibouti",
    unRegionNames: [UNRegion.EASTERN_AFRICA],
    whoRegionNames: [],
  },
  DM: {
    name: "Dominica",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  DO: {
    name: "Dominican Republic",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  EC: {
    name: "Ecuador",
    unRegionNames: [UNRegion.SOUTH_AMERICA],
    whoRegionNames: [],
  },
  EG: {
    name: "Egypt",
    unRegionNames: [UNRegion.NORTHERN_AFRICA],
    whoRegionNames: [],
  },
  SV: {
    name: "El Salvador",
    unRegionNames: [UNRegion.CENTRAL_AMERICA],
    whoRegionNames: [],
  },
  GQ: {
    name: "Equatorial Guinea",
    unRegionNames: [UNRegion.MIDDLE_AFRICA],
    whoRegionNames: [],
  },
  ER: {
    name: "Eritrea",
    unRegionNames: [UNRegion.EASTERN_AFRICA],
    whoRegionNames: [],
  },
  EE: {
    name: "Estonia",
    unRegionNames: [UNRegion.NORTHERN_EUROPE],
    whoRegionNames: [],
  },
  SZ: {
    name: "Eswatini",
    unRegionNames: [UNRegion.SOUTHERN_AFRICA],
    whoRegionNames: [],
  },
  ET: {
    name: "Ethiopia",
    unRegionNames: [UNRegion.EASTERN_AFRICA],
    whoRegionNames: [],
  },
  FK: {
    name: "Falkland Islands (Malvinas)",
    unRegionNames: [UNRegion.SOUTH_AMERICA],
    whoRegionNames: [],
  },
  FO: {
    name: "Faroe Islands",
    unRegionNames: [UNRegion.NORTHERN_EUROPE],
    whoRegionNames: [],
  },
  FJ: {
    name: "Fiji",
    unRegionNames: [UNRegion.MELANESIA],
    whoRegionNames: [],
  },
  FI: {
    name: "Finland",
    unRegionNames: [UNRegion.NORTHERN_EUROPE],
    whoRegionNames: [],
  },
  FR: {
    name: "France",
    unRegionNames: [UNRegion.WESTERN_EUROPE],
    whoRegionNames: [],
  },
  GF: {
    name: "French Guiana",
    unRegionNames: [UNRegion.SOUTH_AMERICA],
    whoRegionNames: [],
  },
  PF: {
    name: "French Polynesia",
    unRegionNames: [UNRegion.POLYNESIA],
    whoRegionNames: [],
  },
  GA: {
    name: "Gabon",
    unRegionNames: [UNRegion.MIDDLE_AFRICA],
    whoRegionNames: [],
  },
  GM: {
    name: "Gambia",
    unRegionNames: [UNRegion.WESTERN_AFRICA],
    whoRegionNames: [],
  },
  GE: {
    name: "Georgia",
    unRegionNames: [UNRegion.WESTERN_ASIA],
    whoRegionNames: [],
  },
  DE: {
    name: "Germany",
    unRegionNames: [UNRegion.WESTERN_EUROPE],
    whoRegionNames: [],
  },
  GH: {
    name: "Ghana",
    unRegionNames: [UNRegion.WESTERN_AFRICA],
    whoRegionNames: [],
  },
  GI: {
    name: "Gibraltar",
    unRegionNames: [UNRegion.SOUTHERN_EUROPE],
    whoRegionNames: [],
  },
  GR: {
    name: "Greece",
    unRegionNames: [UNRegion.SOUTHERN_EUROPE],
    whoRegionNames: [],
  },
  GL: {
    name: "Greenland",
    unRegionNames: [UNRegion.NORTHERN_AMERICA],
    whoRegionNames: [],
  },
  GD: {
    name: "Grenada",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  GP: {
    name: "Guadeloupe",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  GU: {
    name: "Guam",
    unRegionNames: [UNRegion.MICRONESIA],
    whoRegionNames: [],
  },
  GT: {
    name: "Guatemala",
    unRegionNames: [UNRegion.CENTRAL_AMERICA],
    whoRegionNames: [],
  },
  GG: {
    name: "Guernsey",
    unRegionNames: [UNRegion.NORTHERN_EUROPE],
    whoRegionNames: [],
  },
  GN: {
    name: "Guinea",
    unRegionNames: [UNRegion.WESTERN_AFRICA],
    whoRegionNames: [],
  },
  GW: {
    name: "Guinea-Bissau",
    unRegionNames: [UNRegion.WESTERN_AFRICA],
    whoRegionNames: [],
  },
  GY: {
    name: "Guyana",
    unRegionNames: [UNRegion.SOUTH_AMERICA],
    whoRegionNames: [],
  },
  HT: {
    name: "Haiti",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  VA: {
    name: "Holy See",
    unRegionNames: [UNRegion.SOUTHERN_EUROPE],
    whoRegionNames: [],
  },
  HN: {
    name: "Honduras",
    unRegionNames: [UNRegion.CENTRAL_AMERICA],
    whoRegionNames: [],
  },
  HU: {
    name: "Hungary",
    unRegionNames: [UNRegion.EASTERN_EUROPE],
    whoRegionNames: [],
  },
  IS: {
    name: "Iceland",
    unRegionNames: [UNRegion.NORTHERN_EUROPE],
    whoRegionNames: [],
  },
  IN: {
    name: "India",
    unRegionNames: [UNRegion.SOUTHERN_ASIA],
    whoRegionNames: [],
  },
  ID: {
    name: "Indonesia",
    unRegionNames: [UNRegion.SOUTH_EASTERN_ASIA],
    whoRegionNames: [],
  },
  IR: {
    name: "Iran (Islamic Republic of)",
    unRegionNames: [UNRegion.SOUTHERN_ASIA],
    whoRegionNames: [],
  },
  IQ: {
    name: "Iraq",
    unRegionNames: [UNRegion.WESTERN_ASIA],
    whoRegionNames: [],
  },
  IE: {
    name: "Ireland",
    unRegionNames: [UNRegion.NORTHERN_EUROPE],
    whoRegionNames: [],
  },
  IM: {
    name: "Isle of Man",
    unRegionNames: [UNRegion.NORTHERN_EUROPE],
    whoRegionNames: [],
  },
  IL: {
    name: "Israel",
    unRegionNames: [UNRegion.WESTERN_ASIA],
    whoRegionNames: [],
  },
  IT: {
    name: "Italy",
    unRegionNames: [UNRegion.SOUTHERN_EUROPE],
    whoRegionNames: [],
  },
  JM: {
    name: "Jamaica",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  JP: {
    name: "Japan",
    unRegionNames: [UNRegion.EASTERN_ASIA],
    whoRegionNames: [],
  },
  JE: {
    name: "Jersey",
    unRegionNames: [UNRegion.NORTHERN_EUROPE],
    whoRegionNames: [],
  },
  JO: {
    name: "Jordan",
    unRegionNames: [UNRegion.WESTERN_ASIA],
    whoRegionNames: [],
  },
  KZ: {
    name: "Kazakhstan",
    unRegionNames: [UNRegion.CENTRAL_ASIA],
    whoRegionNames: [],
  },
  KE: {
    name: "Kenya",
    unRegionNames: [UNRegion.EASTERN_AFRICA],
    whoRegionNames: [],
  },
  KI: {
    name: "Kiribati",
    unRegionNames: [UNRegion.MICRONESIA],
    whoRegionNames: [],
  },
  XK: {
    name: "Kosovo",
    unRegionNames: [],
    whoRegionNames: [],
  },
  KW: {
    name: "Kuwait",
    unRegionNames: [UNRegion.WESTERN_ASIA],
    whoRegionNames: [],
  },
  KG: {
    name: "Kyrgyzstan",
    unRegionNames: [UNRegion.CENTRAL_ASIA],
    whoRegionNames: [],
  },
  LA: {
    name: "Lao People's Democratic Republic",
    unRegionNames: [UNRegion.SOUTH_EASTERN_ASIA],
    whoRegionNames: [],
  },
  LV: {
    name: "Latvia",
    unRegionNames: [UNRegion.NORTHERN_EUROPE],
    whoRegionNames: [],
  },
  LB: {
    name: "Lebanon",
    unRegionNames: [UNRegion.WESTERN_ASIA],
    whoRegionNames: [],
  },
  LS: {
    name: "Lesotho",
    unRegionNames: [UNRegion.SOUTHERN_AFRICA],
    whoRegionNames: [],
  },
  LR: {
    name: "Liberia",
    unRegionNames: [UNRegion.WESTERN_AFRICA],
    whoRegionNames: [],
  },
  LY: {
    name: "Libya",
    unRegionNames: [UNRegion.NORTHERN_AFRICA],
    whoRegionNames: [],
  },
  LI: {
    name: "Liechtenstein",
    unRegionNames: [UNRegion.WESTERN_EUROPE],
    whoRegionNames: [],
  },
  LT: {
    name: "Lithuania",
    unRegionNames: [UNRegion.NORTHERN_EUROPE],
    whoRegionNames: [],
  },
  LU: {
    name: "Luxembourg",
    unRegionNames: [UNRegion.WESTERN_EUROPE],
    whoRegionNames: [],
  },
  MG: {
    name: "Madagascar",
    unRegionNames: [UNRegion.EASTERN_AFRICA],
    whoRegionNames: [],
  },
  MW: {
    name: "Malawi",
    unRegionNames: [UNRegion.EASTERN_AFRICA],
    whoRegionNames: [],
  },
  MY: {
    name: "Malaysia",
    unRegionNames: [UNRegion.SOUTH_EASTERN_ASIA],
    whoRegionNames: [],
  },
  MV: {
    name: "Maldives",
    unRegionNames: [UNRegion.SOUTHERN_ASIA],
    whoRegionNames: [],
  },
  ML: {
    name: "Mali",
    unRegionNames: [UNRegion.WESTERN_AFRICA],
    whoRegionNames: [],
  },
  MT: {
    name: "Malta",
    unRegionNames: [UNRegion.SOUTHERN_EUROPE],
    whoRegionNames: [],
  },
  MH: {
    name: "Marshall Islands",
    unRegionNames: [UNRegion.MICRONESIA],
    whoRegionNames: [],
  },
  MQ: {
    name: "Martinique",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  MR: {
    name: "Mauritania",
    unRegionNames: [UNRegion.WESTERN_AFRICA],
    whoRegionNames: [],
  },
  MU: {
    name: "Mauritius",
    unRegionNames: [UNRegion.EASTERN_AFRICA],
    whoRegionNames: [],
  },
  YT: {
    name: "Mayotte",
    unRegionNames: [UNRegion.EASTERN_AFRICA],
    whoRegionNames: [],
  },
  MX: {
    name: "Mexico",
    unRegionNames: [UNRegion.CENTRAL_AMERICA],
    whoRegionNames: [],
  },
  FM: {
    name: "Micronesia (Federated States of)",
    unRegionNames: [UNRegion.MICRONESIA],
    whoRegionNames: [],
  },
  MC: {
    name: "Monaco",
    unRegionNames: [UNRegion.WESTERN_EUROPE],
    whoRegionNames: [],
  },
  MN: {
    name: "Mongolia",
    unRegionNames: [UNRegion.EASTERN_ASIA],
    whoRegionNames: [],
  },
  ME: {
    name: "Montenegro",
    unRegionNames: [UNRegion.SOUTHERN_EUROPE],
    whoRegionNames: [],
  },
  MS: {
    name: "Montserrat",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  MA: {
    name: "Morocco",
    unRegionNames: [UNRegion.NORTHERN_AFRICA],
    whoRegionNames: [],
  },
  MZ: {
    name: "Mozambique",
    unRegionNames: [UNRegion.EASTERN_AFRICA],
    whoRegionNames: [],
  },
  MM: {
    name: "Myanmar",
    unRegionNames: [UNRegion.SOUTH_EASTERN_ASIA],
    whoRegionNames: [],
  },
  NA: {
    name: "Namibia",
    unRegionNames: [UNRegion.SOUTHERN_AFRICA],
    whoRegionNames: [],
  },
  NR: {
    name: "Nauru",
    unRegionNames: [UNRegion.MICRONESIA],
    whoRegionNames: [],
  },
  NP: {
    name: "Nepal",
    unRegionNames: [UNRegion.SOUTHERN_ASIA],
    whoRegionNames: [],
  },
  NL: {
    name: "Netherlands",
    unRegionNames: [UNRegion.WESTERN_EUROPE],
    whoRegionNames: [],
  },
  NC: {
    name: "New Caledonia",
    unRegionNames: [UNRegion.MELANESIA],
    whoRegionNames: [],
  },
  NZ: {
    name: "New Zealand",
    unRegionNames: [UNRegion.AUSTRALIA_AND_NEW_ZEALAND],
    whoRegionNames: [],
  },
  NI: {
    name: "Nicaragua",
    unRegionNames: [UNRegion.CENTRAL_AMERICA],
    whoRegionNames: [],
  },
  NE: {
    name: "Niger",
    unRegionNames: [UNRegion.WESTERN_AFRICA],
    whoRegionNames: [],
  },
  NG: {
    name: "Nigeria",
    unRegionNames: [UNRegion.WESTERN_AFRICA],
    whoRegionNames: [],
  },
  NU: {
    name: "Niue",
    unRegionNames: [UNRegion.POLYNESIA],
    whoRegionNames: [],
  },
  NF: {
    name: "Norfolk Island",
    unRegionNames: [UNRegion.AUSTRALIA_AND_NEW_ZEALAND],
    whoRegionNames: [],
  },
  MK: {
    name: "North Macedonia",
    unRegionNames: [UNRegion.SOUTHERN_EUROPE],
    whoRegionNames: [],
  },
  MP: {
    name: "Northern Mariana Islands (Commonwealth of the)",
    unRegionNames: [UNRegion.MICRONESIA],
    whoRegionNames: [],
  },
  NO: {
    name: "Norway",
    unRegionNames: [UNRegion.NORTHERN_EUROPE],
    whoRegionNames: [],
  },
  PS: {
    name: "occupied Palestinian territory, including east Jerusalem",
    unRegionNames: [UNRegion.WESTERN_ASIA],
    whoRegionNames: [],
  },
  OM: {
    name: "Oman",
    unRegionNames: [UNRegion.WESTERN_ASIA],
    whoRegionNames: [],
  },
  PK: {
    name: "Pakistan",
    unRegionNames: [UNRegion.SOUTHERN_ASIA],
    whoRegionNames: [],
  },
  PW: {
    name: "Palau",
    unRegionNames: [UNRegion.MICRONESIA],
    whoRegionNames: [],
  },
  PA: {
    name: "Panama",
    unRegionNames: [UNRegion.CENTRAL_AMERICA],
    whoRegionNames: [],
  },
  PG: {
    name: "Papua New Guinea",
    unRegionNames: [UNRegion.MELANESIA],
    whoRegionNames: [],
  },
  PY: {
    name: "Paraguay",
    unRegionNames: [UNRegion.SOUTH_AMERICA],
    whoRegionNames: [],
  },
  PE: {
    name: "Peru",
    unRegionNames: [UNRegion.SOUTH_AMERICA],
    whoRegionNames: [],
  },
  PH: {
    name: "Philippines",
    unRegionNames: [UNRegion.SOUTH_EASTERN_ASIA],
    whoRegionNames: [],
  },
  PN: {
    name: "Pitcairn Islands",
    unRegionNames: [UNRegion.POLYNESIA],
    whoRegionNames: [],
  },
  PL: {
    name: "Poland",
    unRegionNames: [UNRegion.EASTERN_EUROPE],
    whoRegionNames: [],
  },
  PT: {
    name: "Portugal",
    unRegionNames: [UNRegion.SOUTHERN_EUROPE],
    whoRegionNames: [],
  },
  PR: {
    name: "Puerto Rico",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  QA: {
    name: "Qatar",
    unRegionNames: [UNRegion.WESTERN_ASIA],
    whoRegionNames: [],
  },
  KR: {
    name: "Republic of Korea",
    unRegionNames: [UNRegion.EASTERN_ASIA],
    whoRegionNames: [],
  },
  MD: {
    name: "Republic of Moldova",
    unRegionNames: [UNRegion.EASTERN_EUROPE],
    whoRegionNames: [],
  },
  RO: {
    name: "Romania",
    unRegionNames: [UNRegion.EASTERN_EUROPE],
    whoRegionNames: [],
  },
  RU: {
    name: "Russian Federation",
    unRegionNames: [UNRegion.EASTERN_EUROPE],
    whoRegionNames: [],
  },
  RW: {
    name: "Rwanda",
    unRegionNames: [UNRegion.EASTERN_AFRICA],
    whoRegionNames: [],
  },
  RE: {
    name: "R\u00e9union",
    unRegionNames: [UNRegion.EASTERN_AFRICA],
    whoRegionNames: [],
  },
  BL: {
    name: "Saint Barth\u00e9lemy",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  SH: {
    name: "Saint Helena",
    unRegionNames: [UNRegion.WESTERN_AFRICA],
    whoRegionNames: [],
  },
  KN: {
    name: "Saint Kitts and Nevis",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  LC: {
    name: "Saint Lucia",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  MF: {
    name: "Saint Martin",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  PM: {
    name: "Saint Pierre and Miquelon",
    unRegionNames: [UNRegion.NORTHERN_AMERICA],
    whoRegionNames: [],
  },
  VC: {
    name: "Saint Vincent and the Grenadines",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  WS: {
    name: "Samoa",
    unRegionNames: [UNRegion.POLYNESIA],
    whoRegionNames: [],
  },
  SM: {
    name: "San Marino",
    unRegionNames: [UNRegion.SOUTHERN_EUROPE],
    whoRegionNames: [],
  },
  ST: {
    name: "Sao Tome and Principe",
    unRegionNames: [UNRegion.MIDDLE_AFRICA],
    whoRegionNames: [],
  },
  SA: {
    name: "Saudi Arabia",
    unRegionNames: [UNRegion.WESTERN_ASIA],
    whoRegionNames: [],
  },
  SN: {
    name: "Senegal",
    unRegionNames: [UNRegion.WESTERN_AFRICA],
    whoRegionNames: [],
  },
  RS: {
    name: "Serbia",
    unRegionNames: [UNRegion.SOUTHERN_EUROPE],
    whoRegionNames: [],
  },
  SC: {
    name: "Seychelles",
    unRegionNames: [UNRegion.EASTERN_AFRICA],
    whoRegionNames: [],
  },
  SL: {
    name: "Sierra Leone",
    unRegionNames: [UNRegion.WESTERN_AFRICA],
    whoRegionNames: [],
  },
  SG: {
    name: "Singapore",
    unRegionNames: [UNRegion.SOUTH_EASTERN_ASIA],
    whoRegionNames: [],
  },
  SX: {
    name: "Sint Maarten",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  SK: {
    name: "Slovakia",
    unRegionNames: [UNRegion.EASTERN_EUROPE],
    whoRegionNames: [],
  },
  SI: {
    name: "Slovenia",
    unRegionNames: [UNRegion.SOUTHERN_EUROPE],
    whoRegionNames: [],
  },
  SB: {
    name: "Solomon Islands",
    unRegionNames: [UNRegion.MELANESIA],
    whoRegionNames: [],
  },
  SO: {
    name: "Somalia",
    unRegionNames: [UNRegion.EASTERN_AFRICA],
    whoRegionNames: [],
  },
  ZA: {
    name: "South Africa",
    unRegionNames: [UNRegion.SOUTHERN_AFRICA],
    whoRegionNames: [],
  },
  SS: {
    name: "South Sudan",
    unRegionNames: [UNRegion.EASTERN_AFRICA],
    whoRegionNames: [],
  },
  ES: {
    name: "Spain",
    unRegionNames: [UNRegion.SOUTHERN_EUROPE],
    whoRegionNames: [],
  },
  LK: {
    name: "Sri Lanka",
    unRegionNames: [UNRegion.SOUTHERN_ASIA],
    whoRegionNames: [],
  },
  SD: {
    name: "Sudan",
    unRegionNames: [UNRegion.NORTHERN_AFRICA],
    whoRegionNames: [],
  },
  SR: {
    name: "Suriname",
    unRegionNames: [UNRegion.SOUTH_AMERICA],
    whoRegionNames: [],
  },
  SJ: {
    name: "Svalbard and Jan Mayen Islands",
    unRegionNames: [UNRegion.NORTHERN_EUROPE],
    whoRegionNames: [],
  },
  SE: {
    name: "Sweden",
    unRegionNames: [UNRegion.NORTHERN_EUROPE],
    whoRegionNames: [],
  },
  CH: {
    name: "Switzerland",
    unRegionNames: [UNRegion.WESTERN_EUROPE],
    whoRegionNames: [],
  },
  SY: {
    name: "Syrian Arab Republic",
    unRegionNames: [UNRegion.WESTERN_ASIA],
    whoRegionNames: [],
  },
  TJ: {
    name: "Tajikistan",
    unRegionNames: [UNRegion.CENTRAL_ASIA],
    whoRegionNames: [],
  },
  TW: {
    name: "Taiwan",
    unRegionNames: [],
    whoRegionNames: [],
  },
  TH: {
    name: "Thailand",
    unRegionNames: [UNRegion.SOUTH_EASTERN_ASIA],
    whoRegionNames: [],
  },
  GB: {
    name: "The United Kingdom",
    unRegionNames: [UNRegion.NORTHERN_EUROPE],
    whoRegionNames: [],
  },
  TL: {
    name: "Timor-Leste",
    unRegionNames: [UNRegion.SOUTH_EASTERN_ASIA],
    whoRegionNames: [],
  },
  TG: {
    name: "Togo",
    unRegionNames: [UNRegion.WESTERN_AFRICA],
    whoRegionNames: [],
  },
  TK: {
    name: "Tokelau",
    unRegionNames: [UNRegion.POLYNESIA],
    whoRegionNames: [],
  },
  TO: {
    name: "Tonga",
    unRegionNames: [UNRegion.POLYNESIA],
    whoRegionNames: [],
  },
  TT: {
    name: "Trinidad and Tobago",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  TN: {
    name: "Tunisia",
    unRegionNames: [UNRegion.NORTHERN_AFRICA],
    whoRegionNames: [],
  },
  TR: {
    name: "Turkey",
    unRegionNames: [UNRegion.WESTERN_ASIA],
    whoRegionNames: [],
  },
  TM: {
    name: "Turkmenistan",
    unRegionNames: [UNRegion.CENTRAL_ASIA],
    whoRegionNames: [],
  },
  TC: {
    name: "Turks and Caicos Islands",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  TV: {
    name: "Tuvalu",
    unRegionNames: [UNRegion.POLYNESIA],
    whoRegionNames: [],
  },
  UG: {
    name: "Uganda",
    unRegionNames: [UNRegion.EASTERN_AFRICA],
    whoRegionNames: [],
  },
  UA: {
    name: "Ukraine",
    unRegionNames: [UNRegion.EASTERN_EUROPE],
    whoRegionNames: [],
  },
  AE: {
    name: "United Arab Emirates",
    unRegionNames: [UNRegion.WESTERN_ASIA],
    whoRegionNames: [],
  },
  TZ: {
    name: "United Republic of Tanzania",
    unRegionNames: [UNRegion.EASTERN_AFRICA],
    whoRegionNames: [],
  },
  VI: {
    name: "United States Virgin Islands",
    unRegionNames: [UNRegion.CARIBBEAN],
    whoRegionNames: [],
  },
  US: {
    name: "United States of America",
    unRegionNames: [UNRegion.NORTHERN_AMERICA],
    whoRegionNames: [],
  },
  UY: {
    name: "Uruguay",
    unRegionNames: [UNRegion.SOUTH_AMERICA],
    whoRegionNames: [],
  },
  UZ: {
    name: "Uzbekistan",
    unRegionNames: [UNRegion.CENTRAL_ASIA],
    whoRegionNames: [],
  },
  VU: {
    name: "Vanuatu",
    unRegionNames: [UNRegion.MELANESIA],
    whoRegionNames: [],
  },
  VE: {
    name: "Venezuela (Bolivarian Republic of)",
    unRegionNames: [UNRegion.SOUTH_AMERICA],
    whoRegionNames: [],
  },
  VN: {
    name: "Viet Nam",
    unRegionNames: [UNRegion.SOUTH_EASTERN_ASIA],
    whoRegionNames: [],
  },
  WF: {
    name: "Wallis and Futuna",
    unRegionNames: [UNRegion.POLYNESIA],
    whoRegionNames: [],
  },
  EH: {
    name: "Western Sahara",
    unRegionNames: [UNRegion.NORTHERN_AFRICA],
    whoRegionNames: [],
  },
  YE: {
    name: "Yemen",
    unRegionNames: [UNRegion.WESTERN_ASIA],
    whoRegionNames: [],
  },
  ZM: {
    name: "Zambia",
    unRegionNames: [UNRegion.EASTERN_AFRICA],
    whoRegionNames: [],
  },
  ZW: {
    name: "Zimbabwe",
    unRegionNames: [UNRegion.EASTERN_AFRICA],
    whoRegionNames: [],
  },
};
