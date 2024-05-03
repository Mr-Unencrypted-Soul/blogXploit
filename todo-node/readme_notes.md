.env file
POSTGRES_URL=postgres://postgres:6542@127.0.0.1:5432/myapp
JWT_PRIVATE_KEY=rahul123

MY_MONGO_URL=mongodb://127.0.0.1:27017/myapp
JWT_PRIVATE_KEY=rahul123

notes -->
1st we need to create myapp database from pgadmin,
rest table creation part script is written inside code,


<!-- get token -->
https://playcode.io/javascript'

import jwt from "jsonwebtoken";
console.log(jwt.sign({"role": "user"}, "rahul123"))

import jwt from "jsonwebtoken";
<!-- 60 is seconds here, if you want 1h then 60 * 60 -->
console.log(jwt.sign({"role": "user"}, "rahul123", {expiresIn: 60})) 