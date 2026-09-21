import { Book } from "./Book.js";
import { addBookToDb, updateBookInDb, deleteBookFromDb } from "./api.js";

const bookList = document.querySelector("#book-list");
const bookForm = document.querySelector("#book-form");

let books = [];

export function renderBooks(bookDataArray) {
  books = bookDataArray.map(data => new Book(data));
  draw();
}

function draw() {
  bookList.innerHTML = "";
  books.forEach(book => bookList.appendChild(createBookElement(book)));
}


function createBookElement(book) {
  const li = document.createElement("li");
  li.classList.add("book-card");
  li.dataset.id = book.id;

  li.innerHTML = `
    <h3>${book.title}</h3>
    <p>${book.author}</p>
    <label>
      <input type="checkbox" class="read-checkbox" ${book.isRead ? "checked" : ""}>
      Läst
    </label>
    <div class="score-container">
      ${book.isRead ? renderScoreSelect(book) : ""}
    </div>
    <button class="delete-btn">Ta bort</button>
  `;

  li.querySelector(".read-checkbox").addEventListener("change", () =>
    handleToggleRead(book)
  );
  li.querySelector(".delete-btn").addEventListener("click", () =>
    handleDelete(book)
  );

  const scoreSelect = li.querySelector(".score-select");
  if (scoreSelect) {
    scoreSelect.addEventListener("change", (e) =>
      handleSetScore(book, e.target.value)
    );
  }

  return li;
}

function renderScoreSelect(book) {
  const options = [1, 2, 3, 4, 5]
    .map(n => `<option value="${n}" ${book.score === n ? "selected" : ""}>${n}</option>`)
    .join("");
  return `
    <select class="score-select">
      <option value="">Betyg</option>
      ${options}
    </select>
      `;
}

async function handleToggleRead(book) {
  book.toggleRead();
  await updateBookInDb(book.id, book.toPlainObject());
  draw();
}

async function handleSetScore(book, value) {
  book.setScore(value);
  await updateBookInDb(book.id, book.toPlainObject());
  draw();
}

async function handleDelete(book) {
  await deleteBookFromDb(book.id);
  books = books.filter(b => b.id !== book.id);
  draw();
}

export function initForm() {
  bookForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = bookForm.title.value.trim();
    const author = bookForm.author.value.trim();
    if (!title || !author) return;

    const newBookData = { title, author, isRead: false, score: null };
    const id = await addBookToDb(newBookData);
    books.push(new Book({ id, ...newBookData }));
    draw();
    bookForm.reset();
  });
}