import express from "express";
import { NextFunction, Request, Response } from "express";

let books = [
  {
    id: 1,
    title: "Hello",
    author: "Orgil",
  },
  {
    id: 2,
    title: "Hello 2",
    author: "Orgil",
  },
  {
    id: 3,
    title: "Hello 3",
    author: "Orgil",
  },
];

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

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/books", (req: Request, res: Response) => {
  res.status(200).send(books);
});

app.get("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const book = books.find((book) => String(book.id) === String(id));

  if (!book) {
    res.status(404).send({ message: "Book not found" });
    return;
  }

  res.status(200).send(book);
});

app.post("/books", validateBook, (req: Request, res: Response) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).send(books);
});

app.put("/books/:id", validateBook, (req: Request, res: Response) => {
  const { id } = req.params;
  const { updateTitle } = req.body;
  books = books.map((book) => {
    if (String(book.id) === id) {
      return { ...book, title: updateTitle };
    } else {
      return book;
    }
  });
  res.send(books);
});

app.delete("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  books = books.filter((book) => String(book.id) !== String(id));
  res.status(200).send(books);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
