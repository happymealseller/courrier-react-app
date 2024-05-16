export const areAllKeysEmptyStrings = (obj: Record<string, string>): boolean => {
    return Object.values(obj).every(value => value === "");
  };