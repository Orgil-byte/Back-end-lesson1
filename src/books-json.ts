import express from "express";
import { NextFunction, Request, Response } from "express";
import { getBooks } from "./utils/book-utils.js";
import { error } from "node:console";
import fs from "node:fs/promises";

const app = express();
const port = process.env.PORT ?? "3000";

const validateBook = (req: Request, res: Response, next: NextFunction) => {
  const { title, author } = req.body;
  if (!title || !author) {
    res.status(400).send("Title and Author is required");
    return;
  }
  next();
};

app.use(express.json());

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.get("/books", async (req: Request, res: Response) => {
  const books = await getBooks();
  res.status(200).json(books);
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.get("/books/:id", async (req: Request, res: Response) => {
  const books = await getBooks();
  const { id } = req.params;
  if (books === undefined) {
    throw error;
  }
  const book = books.find(
    (book: { id: any }) => String(book.id) === String(id),
  );

  if (!book) {
    res.status(404).send({ message: "Book not found" });
    return;
  }

  res.status(200).send(book);
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.post("/books", validateBook, async (req: Request, res: Response) => {
  const books = await getBooks();
  const { title, author } = req.body;
  if (books === undefined) {
    throw error;
  }
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  await fs.writeFile("./db.json", JSON.stringify(books), {
    encoding: "utf8",
  });
  res.status(200).send(books);
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.put("/books/:id", validateBook, async (req: Request, res: Response) => {
  const books = await getBooks();
  const { id } = req.params;
  const { title, author } = req.body;
  if (books === undefined) {
    throw error;
  }
  const newBooks = books.map((book: any) => {
    if (String(book.id) === id) {
      return { ...book, title, author };
    }
    return book;
  });

  await fs.writeFile("./db.json", JSON.stringify(newBooks), {
    encoding: "utf8",
  });
  res.status(200).send(newBooks);
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.delete("/books/:id", async (req: Request, res: Response) => {
  let books = await getBooks();
  const { id } = req.params;
  if (books === undefined) {
    throw error;
  }
  books = books.filter((book: { id: any }) => String(book.id) !== String(id));
  await fs.writeFile("./db.json", JSON.stringify(books), {
    encoding: "utf8",
  });
  res.status(200).send(books);
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
