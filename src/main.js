import "./style.css";
import { fetchBooks } from "./api.js";
import { renderBooks, initForm } from "./ui.js";

async function init() {
  const books = await fetchBooks();
  renderBooks(books);
  initForm();
}

init();