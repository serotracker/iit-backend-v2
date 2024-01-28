interface GetCityLatLngInput {
  city: string | undefined;
  state: string | undefined;
  country: string;
  geocodingApiRequestReportFileName: string;
}

interface GetStateLatLngInput {
  state: string | undefined;
  country: string;
  geocodingApiRequestReportFileName: string;
}

interface GetCountryLatLngInput {
  country: string;
  geocodingApiRequestReportFileName: string;
}