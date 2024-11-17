export const mersMacroSampleFramesTypedefs = `
  enum MersMacroSampleFrameType {
    HIGH_RISK_OCCUPATIONALLY_EXPOSED_TO_DROMEDARY_CAMELS
    HIGH_RISK_NOT_OCCUPATIONALLY_EXPOSED_TO_DROMEDARY_CAMELS
    HIGH_RISK_OTHER
    HIGH_RISK_HEALTHCARE_WORKERS
    HIGH_RISK_CLINICAL_MONITORING
    GENERAL_POPULATION
    UNCATEGORIZED
  }

  type MersMacroSampleFrame {
    id: String!
    macroSampleFrame: MersMacroSampleFrameType!
    sampleFrames: [String!]!
  }

  type Query {
    mersMacroSampleFrames: [MersMacroSampleFrame!]!
  }
`