export default <T, U>(mapFn: (val: T, key: string) => U) =>
  (obj: Record<string, T>): Record<string, U> =>
    Object.keys(obj).reduce(
      (result: Record<string, U>, key: string): Record<string, U> => {
        result[key] = mapFn(obj[key], key);
        return result;
      },
      {}
    );
