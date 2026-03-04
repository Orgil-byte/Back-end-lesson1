import express from "express";
import { NextFunction, Request, Response } from "express";
import fs from "node:fs/promises";

const app = express();
const port = process.env.PORT ?? "3000";

const getBooks = async () => {
  try {
    const data = await fs.readFile("./db.json", { encoding: "utf8" });

    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
};

const validateBook = (req: Request, res: Response, next: NextFunction) => {
  const { title, author } = req.body;
  if (!title || !author) {
    res.status(400).send("Title and Author is required");
    return;
  }
  next();
};

app.use(express.json());

app.get("/books", async (req: Request, res: Response) => {
  const books = await getBooks();
  res.status(200).json(books);
});

app.get("/books/:id", async (req: Request, res: Response) => {
  const books = await getBooks();
  const { id } = req.params;
  const book = books.find(
    (book: { id: any }) => String(book.id) === String(id),
  );

  if (!book) {
    res.status(404).send({ message: "Book not found" });
    return;
  }

  res.status(200).send(book);
});

app.post("/books", validateBook, async (req: Request, res: Response) => {
  const books = await getBooks();
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).send(books);
});

app.put("/books/:id", validateBook, async (req: Request, res: Response) => {
  let books = await getBooks();
  const { id } = req.params;
  const { updateTitle } = req.body;
  books = books.map((book: { id: any }) => {
    if (String(book.id) === id) {
      return { ...book, title: updateTitle };
    } else {
      return book;
    }
  });
  res.send(books);
});

app.delete("/books/:id", async (req: Request, res: Response) => {
  let books = await getBooks();
  const { id } = req.params;
  books = books.filter((book: { id: any }) => String(book.id) !== String(id));
  res.status(200).send(books);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
