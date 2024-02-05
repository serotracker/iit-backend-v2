export type AirtableTeamMemberFields = {
  "First Name": string;
  "Last Name": string;
  "Team"?: string[] | undefined;
  "Active? (Y/N)"?: boolean | undefined;
  "Shown in about page? (Y/N)"?: boolean | undefined;
  "Email"?: string | undefined;
  "Twitter URL"?: string | undefined;
  "Linkedin URL"?: string | undefined;
  "Affiliation 1"?: string | undefined;
  "Affiliation 2"?: string | undefined;
  "Affiliation 3"?: string | undefined;
};

export type TeamSortOrderEntryFields = {
  "Sort Order": number;
  "Team": string;
};