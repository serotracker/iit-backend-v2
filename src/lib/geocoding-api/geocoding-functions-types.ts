import { MongoClient } from "mongodb";

export interface GetCityLatLngInput {
  city: string | undefined;
  state: string | undefined;
  country: string;
  geocodingApiRequestReportFileName: string;
  mongoClient: MongoClient;
}

export interface GetStateLatLngInput {
  state: string | undefined;
  country: string;
  geocodingApiRequestReportFileName: string;
  mongoClient: MongoClient;
}

export interface GetCountryLatLngInput {
  country: string;
  geocodingApiRequestReportFileName: string;
  mongoClient: MongoClient;
}