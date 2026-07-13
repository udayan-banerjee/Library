class Book {
  constructor(title, author, status) {
    this.title = title;
    this.author = author;
    this.status = status;
    this.id = crypto.randomUUID();
  }

  toggleStatus() {
    this.status = this.status === "Read" ? "Not read" : "Read";
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author, status) {
    const book = new Book(title, author, status);
    this.books.push(book);
    return book;
  }

  removeBook(id) {
    const index = this.books.findIndex((book) => book.id === id);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  getBook(id) {
    return this.books.find((book) => book.id === id);
  }
}

const myLibrary = new Library();

const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".close-button");
const modal = document.querySelector("#add-book-popup");
const form = document.querySelector("#bookForm");
const container = document.querySelector(".container");

function displayBook(book) {
  const newBook = document.createElement("div");
  newBook.dataset.id = book.id;
  newBook.classList.add("card");

  const title = document.createElement("p");
  title.textContent = `Title: ${book.title}`;

  const author = document.createElement("p");
  author.textContent = `Author: ${book.author}`;

  const status = document.createElement("p");
  status.textContent = `Status: ${book.status}`;

  const removeBtn = document.createElement("div");
  removeBtn.classList.add("delete-button");
  removeBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
        <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"/>
    </svg>
  `;

  removeBtn.addEventListener("click", () => {
    myLibrary.removeBook(newBook.dataset.id);
    newBook.remove();
  });

  const toggleBtn = document.createElement("button");
  toggleBtn.classList.add("toggle-button");
  toggleBtn.textContent = "Toggle Status";

  toggleBtn.addEventListener("click", () => {
    const book = myLibrary.getBook(newBook.dataset.id);
    book.toggleStatus();
    status.textContent = `Status: ${book.status}`;
  });

  newBook.append(title, author, status, removeBtn, toggleBtn);
  container.appendChild(newBook);
}

// ===== Event wiring =====

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});

form.addEventListener("submit", () => {
  const book = myLibrary.addBook(
    form.title.value,
    form.author.value,
    form.status.value
  );
  displayBook(book);
});

modal.addEventListener("close", () => {
  form.reset();
});