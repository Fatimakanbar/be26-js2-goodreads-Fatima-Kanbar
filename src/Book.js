export class Book {
  #id;
  #title;
  #author;
  #isRead;
  #score;

  constructor({ id, title, author, isRead = false, score = undefined }) {
    this.#id = id;
    this.#title = title;
    this.#author = author;
    this.#isRead = isRead;
    this.#score = score;
  }
  
  get id() { return this.#id; }
  get title() { return this.#title; }
  get author() { return this.#author; }
  get isRead() { return this.#isRead; }
  get score() { return this.#score; }

  // Metod relevant för funktionaliteten:
  // returnerar ett vanligt objekt som kan skickas till Firebase
  toPlainObject() {
    return {
      title: this.#title,
      author: this.#author,
      isRead: this.#isRead,
      score: this.#isRead ? this.#score : null
    };
  }

  toggleRead() {
    this.#isRead = !this.#isRead;
    if (!this.#isRead) {
      this.#score = undefined;
    }
  }

  setScore(value) {
    if (this.#isRead) {
      this.#score = Number(value);
    }
  }
}