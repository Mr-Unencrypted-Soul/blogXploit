import * as dotenv from 'dotenv';
dotenv.config({ override: true });
import mongoose from "mongoose";
import logger from "../utils/logger";

export const createConnection = () => {
  const uri = process.env["MY_MONGO_URL"];
  mongoose.connect(uri!).then(()=>{
    logger.info('Connected to MongoDB');
  }).catch((error)=>{
    logger.error(error)
  });
};

export const disconnect = () => {
  mongoose.disconnect();
};
