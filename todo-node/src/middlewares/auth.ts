import * as dotenv from "dotenv";
dotenv.config({override: true});
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const jwtPrivateKey: string = process.env.JWT_PRIVATE_KEY!;

export interface IAuth {
  roles?: string[];
  tokenShouldHaveKeys?: string[];
}

export const auth = ({
  roles,
  tokenShouldHaveKeys
}: IAuth) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.header("Authorization");
    if (!bearerHeader) {
      return res.status(401).send("Access Denied. No token provided.");
    }
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    if (!token) return res.status(401).send("Access Denied. No token provided.");

    try {
      // using jwt.verify to verify if it is a valid token
      // JwtPayload type cast is required, because decoded token can be string or JwtPayload; decoded.role was not accessible on type string
      // jwt verify fails for wrong private key and expired token. then it throw errors
      const decoded = jwt.verify(token, jwtPrivateKey) as JwtPayload;

      if(roles && !roles.includes(decoded?.role)){
        const err = {
          statusCode: 401,
          // provide generic message like ("unauthorized", "not accessible") in production
          // this is just for development purpose
          customMessage: `Invalid token, role of token is ${decoded?.role} and it should be ${roles}`,
        };
        throw err;
      }

      if(tokenShouldHaveKeys){
        tokenShouldHaveKeys.forEach((singleKey)=>{
          if(!decoded.hasOwnProperty(singleKey)){
            const err = {
              statusCode: 401,
              // provide generic message like ("unauthorized", "not accessible") in production
              // this is just for development purpose
              customMessage: `Invalid token, token should have key ${singleKey} available keys in token are ${Object.keys(decoded)}`,
            };
            throw err;
          }
        })
      }

      //returns the value of the jwt if the token is verified
      req.app.locals.user = decoded;
      next();
    } catch (err: any) {
      console.log('err: ', err);
      next({
        statusCode: err?.statusCode ?? 403,
        customMessage: err?.customMessage ?? "Invalid token",
        error: err,
      });
    }
  }
};
