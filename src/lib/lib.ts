export const isArrayOfUnknownType = (input: unknown): input is unknown[] => {
  return Array.isArray(input);
}