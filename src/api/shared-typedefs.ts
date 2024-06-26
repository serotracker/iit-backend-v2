export const sharedTypedefs = `
  enum WHORegion {
    AFR
    AMR
    SEAR
    EUR
    EMR
    WPR
  }

  enum Month {
    JANUARY
    FEBRUARY
    MARCH
    APRIL
    MAY
    JUNE
    JULY
    AUGUST
    SEPTEMBER
    OCTOBER
    NOVEMBER
    DECEMBER
  }

  enum UNRegion {
    NORTHERN_AFRICA
    EASTERN_AFRICA
    MIDDLE_AFRICA
    SOUTHERN_AFRICA
    WESTERN_AFRICA
    CARIBBEAN
    CENTRAL_AMERICA
    SOUTH_AMERICA
    NORTHERN_AMERICA
    CENTRAL_ASIA
    EASTERN_ASIA
    SOUTH_EASTERN_ASIA
    SOUTHERN_ASIA
    WESTERN_ASIA
    EASTERN_EUROPE
    NORTHERN_EUROPE
    SOUTHERN_EUROPE
    WESTERN_EUROPE
    AUSTRALIA_AND_NEW_ZEALAND
    MELANESIA
    MICRONESIA
    POLYNESIA
  }

  enum GBDSuperRegion {
    SOUTH_EAST_ASIA_EAST_ASIA_AND_OCEANIA
    SOUTH_ASIA
    SUB_SAHARAN_AFRICA
    LATIN_AMERICA_AND_CARIBBEAN
    CENTRAL_EUROPE_EASTERN_EUROPE_AND_CENTRAL_ASIA
    NORTH_AFRICA_AND_MIDDLE_EAST
    HIGH_INCOME
  }

  enum GBDSubRegion {
    SOUTH_EAST_ASIA_EAST_ASIA_AND_OCEANIA_SUBREGION_SOUTH_EAST_ASIA
    SOUTH_EAST_ASIA_EAST_ASIA_AND_OCEANIA_SUBREGION_OCEANIA
    SOUTH_EAST_ASIA_EAST_ASIA_AND_OCEANIA_SUBREGION_EAST_ASIA
    SOUTH_ASIA_SUBREGION_SOUTH_ASIA
    SUB_SAHARAN_AFRICA_SUBREGION_WESTERN
    SUB_SAHARAN_AFRICA_SUBREGION_SOUTHERN
    SUB_SAHARAN_AFRICA_SUBREGION_CENTRAL
    SUB_SAHARAN_AFRICA_SUBREGION_EASTERN
    LATIN_AMERICA_AND_CARIBBEAN_SUBREGION_TROPICAL
    LATIN_AMERICA_AND_CARIBBEAN_SUBREGION_CARIBBEAN
    LATIN_AMERICA_AND_CARIBBEAN_SUBREGION_ANDEAN
    LATIN_AMERICA_AND_CARIBBEAN_SUBREGION_CENTRAL
    CENTRAL_EUROPE_EASTERN_EUROPE_AND_CENTRAL_ASIA_SUBREGION_CENTRAL_ASIA
    CENTRAL_EUROPE_EASTERN_EUROPE_AND_CENTRAL_ASIA_SUBREGION_CENTRAL_EUROPE
    CENTRAL_EUROPE_EASTERN_EUROPE_AND_CENTRAL_ASIA_SUBREGION_EASTERN_EUROPE
    NORTH_AFRICA_AND_MIDDLE_EAST_SUBREGION_NORTH_AFRICA_AND_MIDDLE_EAST
    HIGH_INCOME_SUBREGION_WESTERN_EUROPE
    HIGH_INCOME_SUBREGION_SOUTHERN_LATIN_AMERICA
    HIGH_INCOME_SUBREGION_NORTH_AMERICA
    HIGH_INCOME_SUBREGION_ASIA_PACIFIC
    HIGH_INCOME_SUBREGION_AUSTRALASIA
  }

  type CountryIdentifiers {
    name: String!
    alphaTwoCode: String!
    alphaThreeCode: String!
  }
`
