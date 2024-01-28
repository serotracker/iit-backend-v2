export const teamTypedefs = `
  type Affiliation {
    label: String!
  }

  type TeamMember {
    firstName: String!
    lastName: String!
    email: String
    twitterUrl: String
    linkedinUrl: String
    affiliations: [Affiliation!]!
  }

  type TeamMemberGroup {
    label: String!
    teamMembers: [TeamMember!]!
  }

  type Query {
    groupedTeamMembers: [TeamMemberGroup!]!
  }
`