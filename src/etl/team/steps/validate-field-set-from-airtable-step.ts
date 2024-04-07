import { FieldSet } from "airtable";
import { AirtableTeamMemberFields, TeamSortOrderEntryFields } from "../types.js";
import { z } from "zod";

export type TeamMemberFieldsAfterValidatingFieldSetFromAirtableStep = AirtableTeamMemberFields;
export type TeamSortOrderEntryFieldsAfterValidatingFieldSetFromAirtableStep = TeamSortOrderEntryFields;

interface ValidateFieldSetFromAirtableStepInput {
  allTeamMembers: FieldSet[];
  teamSortOrder: FieldSet[];
}

interface ValidateFieldSetFromAirtableStepOutput {
  allTeamMembers: TeamMemberFieldsAfterValidatingFieldSetFromAirtableStep[];
  teamSortOrder: TeamSortOrderEntryFieldsAfterValidatingFieldSetFromAirtableStep[];
}

export const validateFieldSetFromAirtableStep = (input: ValidateFieldSetFromAirtableStepInput): ValidateFieldSetFromAirtableStepOutput => {
  console.log(
    `Running step: validateFieldSetFromAirtableStep. Remaining team members: ${input.allTeamMembers.length}`
  );

  const zodAirtableTeamMemberFieldsObject = z.object({
    "First Name": z.string(),
    "Last Name": z.string(),
    "Team": z.string().array().or(z.undefined()),
    "Active? (Y/N)": z.boolean().or(z.undefined()),
    "Shown in about page? (Y/N)": z.boolean(),
    "Email": z.string().or(z.undefined()),
    "Twitter URL": z.string().or(z.undefined()),
    "Linkedin URL": z.string().or(z.undefined()),
    "Affiliation 1": z.string().or(z.undefined()),
    "Affiliation 2": z.string().or(z.undefined()),
    "Affiliation 3": z.string().or(z.undefined()),
    "ArboTracker": z.boolean().or(z.undefined())
  })
  const allTeamMembers = input.allTeamMembers.map((teamMember) => zodAirtableTeamMemberFieldsObject.parse(teamMember));

  const zodSortOrderFieldsObject = z.object({
    "Sort Order": z.number(),
    "Team": z.string()
  });
  const teamSortOrder = input.teamSortOrder.map((teamSortOrderEntry) => zodSortOrderFieldsObject.parse(teamSortOrderEntry));

  return { allTeamMembers, teamSortOrder };
}