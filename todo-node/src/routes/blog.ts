import express, { Request, Response, NextFunction } from "express";
import { auth } from "../middlewares/auth";
import { checkRequireAndType } from "../utils/check-require-and-type";
import { Blog } from "../db-init/models/blogs";
import mongoose from "mongoose";

const router = express.Router();

router.post(
  "/create-blog",
  [auth({ roles: ["user", "admin"] })],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description } = req.body;

      checkRequireAndType({
        allTypeAndValue: [
          {
            forValue: "title in request body",
            value: title,
            type: "string",
          },
          {
            forValue: "description in request body",
            value: description,
            type: "string",
          },
        ],
      });

      const blog = new Blog({
        title,
        description,
        createdBy: req.app.locals.user.username,
      });

      await blog.save();

      res.status(200).json({
        status: 200,
        data: {
          message: "blog added successfully",
          data: blog,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

router.get(
  "/get-blog-details/:blogID",
  [auth({ roles: ["user", "admin"] })],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { blogID } = req.params;

      checkRequireAndType({
        allTypeAndValue: [
          {
            forValue: "blogID in request params",
            value: blogID,
            type: "string",
          },
        ],
      });

      const blog = await Blog.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(blogID),
          },
        }
      ]);

      res.status(200).json({
        status: 200,
        data: blog,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

router.get(
  "/get-all-blogs",
  [auth({ roles: ["user", "admin"] })],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blog = await Blog.find({});

      res.status(200).json({
        status: 200,
        data: blog,
      });

    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

router.get(
  "/delete-blog/:blogID",
  [auth({ roles: ["admin", "user"] })],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { blogID } = req.params;

      checkRequireAndType({
        allTypeAndValue: [
          {
            forValue: "blogID in request params",
            value: blogID,
            type: "string",
          },
        ],
      });

      await Blog.findByIdAndDelete({_id: blogID});

      res.status(200).json({
        status: 200,
        data: `blog deleted successfully`,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

router.patch(
  "/blog/:blogID",
  [auth({ roles: ["admin", "user"] })],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { blogID } = req.params;
      const { title, description } = req.body;

      checkRequireAndType({
        allTypeAndValue: [
          {
            forValue: "blogID in request params",
            value: blogID,
            type: "string",
          },
          {
            forValue: "title in request body",
            value: title,
            type: "string",
          },
          {
            forValue: "description in request body",
            value: description,
            type: "string",
          },
        ],
      });

      const blog = await Blog.findById({_id: blogID});
      if(blog){

        blog.title = title
        blog.description = description
        await blog.save()
      }

      res.status(200).json({
        status: 200,
        data: `blog updated successfully`,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);
export default router;
