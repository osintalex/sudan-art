export const makeRepeated = (arr, repeats) =>
  Array.from({ length: repeats }, () => arr).flat();
