import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { auth } from "../middlewares/auth";
import { checkRequireAndType } from "../utils/check-require-and-type";
import { User } from "../db-init/models/user";
import { getJWT } from "../utils/get-jwt";

const router = express.Router();

router.post("/create-user", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    checkRequireAndType({
      allTypeAndValue: [
        {
          forValue: "username in request body",
          value: username,
          type: "string",
        },
        {
          forValue: "password in request body",
          value: password,
          type: "string",
        },
      ],
    });

    const user = new User({
      username,
      password,
    });

    await user.save();

    res.status(200).json({
      status: 200,
      data: {
        message: "user created successfully",
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/login-user", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    checkRequireAndType({
      allTypeAndValue: [
        {
          forValue: "username in request body",
          value: username,
          type: "string",
        },
        {
          forValue: "password in request body",
          value: password,
          type: "string",
        },
      ],
    });

    const user = await User.findOne({ username });

    // If the user is not found, return an error
    // for dev purpose, in prod use invalid credentials
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    // const passwordMatch = password == user.password;

    // If the passwords don't match, return an error
    // for dev purpose, in prod use invalid credentials
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      data: {
        token: getJWT({
          username: user.username,
          role: user.role,
        }),
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
