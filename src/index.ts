import express from "express";
import { NextFunction, Request, Response } from "express";

const app = express();
const port = process.env.PORT ?? "3000";

app.use(express.json());

app.get("/library/:category/:bookId", (req: Request, res: Response) => {
  const { category, bookId } = req.params;

  const userInputKey = 12345678;

  const auth =
    req.headers["x-api-key"] === String(userInputKey)
      ? "Verified"
      : "Unverified";

  const lang = req.query.lang;

  const status =
    auth === "Unverified" ||
    !req.method ||
    !req.path ||
    !category ||
    !bookId ||
    !lang
      ? "Unsuccessful"
      : "Амжилттай";

  res.status(200).json({
    status,
    request_info: {
      method: req.method,
      path: req.path,
    },
    extracted_data: {
      category: category,
      id: bookId,
      language: lang,
      auth,
    },
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
