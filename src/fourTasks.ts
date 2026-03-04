import express from "express";
import { NextFunction, Request, Response } from "express";

const app = express();
const port = process.env.PORT ?? "3000";

app.use(express.json());

// ========================================================

app.get("/name/:name", (req: Request, res: Response) => {
  const { name } = req.params;
  res.status(200).send(`Сайн байна уу, ${name} !`);
});

// ========================================================

app.get("/filter", (req: Request, res: Response) => {
  const city = req.query.city;
  const age = req.query.age;
  const userStatus = {
    age,
    city,
  };
  res.status(200).json(userStatus);
});

// ========================================================

app.get("/auth", (req: Request, res: Response) => {
  const headers = req.headers;
  const auth = headers.authorization;
  const userAgent = headers["user-agent"];
  console.log({ auth, userAgent });
});

// ========================================================

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Та ${req.path} зам руу ${req.method} хүсэлт илгээлээ`);
  next();
});

// ========================================================

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
