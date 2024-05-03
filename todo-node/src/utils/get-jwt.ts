import jwt from "jsonwebtoken";

const jwtPrivateKey: string = process.env.JWT_PRIVATE_KEY!;

export const getJWT = (payload: any) => {
  console.debug(`Generating JWT for payload ${JSON.stringify(payload)}`);
  // Create a payload using the secret key and set the validity of 15 mins
  return jwt.sign(payload, jwtPrivateKey);
};
