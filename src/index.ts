import express from "express";
import { Request, Response } from "express";

const books = [
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
const port = "3000";

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
app.use(express.json());

app.get("/books", (req: Request, res: Response) => {
  res.status(200).send(books);
});

app.get("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const book = books.find((book) => String(book.id) === String(id));

  res.status(200).send(book);
});

app.post("/books", (req: Request, res: Response) => {
  const { title, author } = req.body;

  const newBookId = books.length + 1;

  const newBook = { id: newBookId, title, author };

  books.push(newBook);
  res.send(books);
});

app.put("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { updateTitle } = req.body;
  const updatedBook = books.map((book) => {
    // String(book.id) === id ? { ...book, title: updateTitle } : book;
    if (String(book.id) === id) {
      return { ...book, title: updateTitle };
    } else {
      return book;
    }
  });
  res.send(updatedBook);
});

app.delete("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteBook = books.filter((book) => String(book.id) !== String(id));
  res.status(200).send(deleteBook);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
