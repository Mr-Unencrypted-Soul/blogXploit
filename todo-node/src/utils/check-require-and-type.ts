import STATUS from "../constants/statusCode";
import { isString, isArrayOfObject, isBoolean, isNumber, isObject, isArray } from "./check-types";

export type allTypes = "string" | "number" | "boolean" | "object" | 'any' | 'object[]' | 'array';

export interface ICheckRequireAndType {
  allTypeAndValue: {
    forValue: string;
    value: any;
    type: allTypes;
  }[];
}

const allTypeCheck: Record<allTypes, (checkValue: any)=>boolean> = {
  "string": (checkValue)=>{
    return isString(checkValue)
  },
  "number": (checkValue)=>{
    return isNumber(checkValue)
  },
  "boolean": (checkValue)=>{
    return isBoolean(checkValue)
  },
  "object": (checkValue)=>{
    return isObject(checkValue)
  },
  "object[]": (checkValue)=>{
    return isArrayOfObject(checkValue)
  },
  "array": (checkValue)=>{
    return isArray(checkValue)
  },
  "any": () => true
}

const typeString: Record<allTypes, string> = {
  string: "String",
  number: "Number",
  boolean: "Boolean",
  object: "Object",
  any: "Any",
  "array": "Array",
  "object[]": "Array of Objects"
}

export const checkRequireAndType = ({
  allTypeAndValue
}:ICheckRequireAndType) => {
  allTypeAndValue.forEach((singleTypeAndValue)=>{
    if(!singleTypeAndValue.value && !isBoolean(singleTypeAndValue.value)){
      const err = {
        statusCode: STATUS.BAD_REQUEST,
        customMessage: `${singleTypeAndValue.forValue} is required parameter.`,
      };
      throw err;
    }
    if(!allTypeCheck[singleTypeAndValue.type](singleTypeAndValue.value)){
      const err = {
        statusCode: STATUS.BAD_REQUEST,
        customMessage: `${singleTypeAndValue.forValue} type should be ${typeString[singleTypeAndValue.type]}.`,
      };
      throw err;
    }
  }) 
}