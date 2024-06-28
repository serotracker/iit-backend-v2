import { Collection } from "mongodb";
import { CountryIdentifiers } from "../graphql-types/__generated__/graphql-types";

interface RunCountryIdentifierAggregationInput<TDocument extends {
  countryAlphaTwoCode: string;
  countryAlphaThreeCode: string;
  country: string;
}> {
  collection: Collection<TDocument>;
}

export const runCountryIdentifierAggregation = async <TDocument extends {
  countryAlphaTwoCode: string;
  countryAlphaThreeCode: string;
  country: string;
}>(
  input: RunCountryIdentifierAggregationInput<TDocument>
): Promise<CountryIdentifiers[]> => 
  input.collection.aggregate([
    {
      $group: {
        _id: {
          alphaTwoCode: "$countryAlphaTwoCode"
        },
        name: {
          $first: "$country"
        },
        alphaThreeCode: {
          $first: "$countryAlphaThreeCode"
        }
      }
    },
    {
      $project: {
        "_id": 0,
        "alphaTwoCode": "$_id.alphaTwoCode",
        "name": 1,
        "alphaThreeCode": 1
      }
    },
    {
      $sort: {
        name: 1,
        alphaTwoCode: 1,
        alphaThreeCode: 1,
      }
    }
  ]).toArray() as Promise<CountryIdentifiers[]>;