export const teamTypedefs = `
  type Affiliation {
    label: String!
  }

  type TeamMember {
    firstName: String!
    lastName: String!
    email: String
    additionalSymbols: [TeamMemberSymbol!]!
    twitterUrl: String
    linkedinUrl: String
    affiliations: [Affiliation!]!
  }

  enum TeamMemberSymbol {
    ARBOTRACKER_SYMBOL
  }

  type TeamMemberGroup {
    label: String!
    teamMembers: [TeamMember!]!
  }

  type Query {
    groupedTeamMembers: [TeamMemberGroup!]!
  }
`