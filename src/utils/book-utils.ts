import fs from "node:fs/promises";
import { Book } from "./types.js";

export const getBooks = async () => {
  try {
    const data = await fs.readFile("./db.json", { encoding: "utf8" });
    const books: Book[] = JSON.parse(data);
    return books;
  } catch (err) {
    console.error(err);
  }
};
