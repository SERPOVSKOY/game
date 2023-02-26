/**
 * Склоняет слово по числительному
 * @param count числительное
 * @param declinations список склонений (ноздря, ноздри, ноздрей)
 */
export const wordWithDeclination = (count: number, declinations: string[]) => {
  const lastDigit = count % 10;
  if (count >= 11 && count <= 14) return declinations[2];
  if (lastDigit === 1) return declinations[0];
  if (lastDigit >= 2 && lastDigit <= 4) return declinations[1];
  return declinations[2];
};
