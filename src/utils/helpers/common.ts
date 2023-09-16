export const getURLParamsObject = (url: string): Record<string, string> => {
  const searchParams = new URLSearchParams(url);

  const paramsObject: Record<string, string> = {};

  for (const [key, value] of searchParams) {
    paramsObject[key] = value;
  }

  return paramsObject
}

export const getURLParamsInstance = (obj: Record<string, unknown>): URLSearchParams => {
  return new URLSearchParams(
    Object.fromEntries(
      Object.entries(obj)
        .map(entry => [entry[0], String(entry[1])])
    )
  )
}