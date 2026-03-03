// import express from "express";
// import { Request, Response } from "express";

// const app = express();
// const port = process.env.PORT;
// app.get("/movie/:type", (req: Request, res: Response) => {
//   //   const params = req.params;
//   //   const query = req.query;
//   const headers = req.headers;
//   const token = "token";
//   const token1 = headers.authorization?.split(" ").slice(1).toString();
//   token !== token1
//     ? res.status(403).send("Token is not right")
//     : res.status(200).send("Success");
//   console.log(token1);
//   //   console.log("params", params);
//   //   console.log(query);
//   console.log(headers);
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
// app.use(express.json());
