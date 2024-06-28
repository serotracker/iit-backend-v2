type UpperCaseLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

export type TwoLetterIsoCountryCode = `${UpperCaseLetter}${UpperCaseLetter}`;
export type ThreeLetterIsoCountryCode = `${UpperCaseLetter}${UpperCaseLetter}${UpperCaseLetter}`;
