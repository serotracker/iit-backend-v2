import { mergeTypeDefs } from "@graphql-tools/merge";
import { sharedMersTypedefs } from "./shared-mers-typedefs";
import { legacyMersTypedefs } from "./legacy-mers-typedefs";
import { mersCamelPopulationDataTypedefs } from "./mers-camel-population-data-typedef";
import { mersEventTypedefs } from "./mers-event-typedefs";
import { mersEstimateTypedefs } from "./mers-estimate-typedefs";

export const mersTypedefs = mergeTypeDefs([
  sharedMersTypedefs,
  legacyMersTypedefs,
  mersCamelPopulationDataTypedefs,
  mersEventTypedefs,
  mersEstimateTypedefs,
])