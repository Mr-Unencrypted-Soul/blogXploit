export const isString = (toCheck: any): toCheck is string => {
  if (toCheck === undefined || toCheck === null) {
    return false;
  }
  return typeof toCheck === "string" ? true : false;
}

export const isNumber = (toCheck: any): toCheck is string => {
  if (toCheck === undefined || toCheck === null) {
    return false;
  }
  return typeof toCheck === "number" ? true : false;
}

export const isBoolean = (toCheck: any): toCheck is boolean => {
  if (toCheck === undefined || toCheck === null) {
    return false;
  }
  return typeof toCheck === "boolean" ? true : false;
}

export const isObject = (toCheck: any): toCheck is Object => {
  return (
    typeof toCheck === "object" &&
    toCheck !== undefined &&
    toCheck !== null &&
    Object.prototype.toString.call(toCheck) === "[object Object]" &&
    toCheck.constructor === Object
  );
};

export const isArray = (toCheck: any): toCheck is any[] => {
  return (
    toCheck !== undefined &&
    toCheck !== null &&
    Array.isArray(toCheck)
  );
}

export const isArrayOfObject = (toCheck: any): toCheck is Object[] => {
  return (
    typeof toCheck === "object" &&
    toCheck !== undefined &&
    toCheck !== null &&
    Object.prototype.toString.call(toCheck) === "[object Array]" &&
    toCheck.constructor === Array &&
    typeof toCheck?.[0] === "object"
  );
};