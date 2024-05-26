import { MongoClient } from "mongodb";
import { TwoLetterIsoCountryCode } from "./country-codes";

export interface GetCityLatLngInput {
  city: string | undefined;
  state: string | undefined;
  countryName: string;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  geocodingApiRequestReportFileName: string;
  mongoClient: MongoClient;
}

export interface GetStateLatLngInput {
  state: string | undefined;
  countryName: string;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  geocodingApiRequestReportFileName: string;
  mongoClient: MongoClient;
}

export interface GetCountryLatLngInput {
  countryName: string;
  countryAlphaTwoCode: TwoLetterIsoCountryCode;
  geocodingApiRequestReportFileName: string;
  mongoClient: MongoClient;
}