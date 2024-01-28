export type CsvTeamMemberFields = {
  "First Name": string;
  "Last Name": string;
  "Team ID 1": string | undefined;
  "Team ID 2": string | undefined;
  "Team ID 3": string | undefined;
  "Active? (Y/N)": string;
  "Shown in about page? (Y/N)": string;
  "Email": string | undefined;
  "Twitter URL": string | undefined;
  "Linkedin URL": string | undefined;
  "Affiliation 1": string | undefined;
  "Affiliation 2": string | undefined;
  "Affiliation 3": string | undefined;
} & Record<string, never>;