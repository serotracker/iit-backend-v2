import { mergeTypeDefs } from "@graphql-tools/merge";
import { sharedMersTypedefs } from "./shared-mers-typedefs.js";
import { legacyMersTypedefs } from "./legacy-mers-typedefs.js";
import { mersCamelPopulationDataTypedefs } from "./mers-camel-population-data-typedef.js";
import { mersEventTypedefs } from "./mers-event-typedefs.js";
import { mersEstimateTypedefs } from "./mers-estimate-typedefs.js";
import { mersMacroSampleFramesTypedefs } from "./mers-macro-sample-frames-typedefs.js";

export const mersTypedefs = mergeTypeDefs([
  sharedMersTypedefs,
  legacyMersTypedefs,
  mersCamelPopulationDataTypedefs,
  mersEventTypedefs,
  mersEstimateTypedefs,
  mersMacroSampleFramesTypedefs
])