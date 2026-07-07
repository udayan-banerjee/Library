const myLibrary = [];
const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".close-button");
const modal = document.querySelector("#add-book-popup");
const submit = document.querySelector("#submit-button");
const form = document.querySelector("#bookForm");

function Book(title, author, status, id) {
  this.title = title;
  this.author = author;
  this.status = status;
  this.id = id;
}

function addBookToLibrary(title, author, status) {
  let id = crypto.randomUUID();
  let book = new Book(title, author, status, id);
  myLibrary.push(book);
}

let container = document.querySelector(".container");

function displayBook() {
    const book = myLibrary.at(-1);
    const newBook = document.createElement("div");

    const title = document.createElement("p");
    title.textContent = `Title: ${book.title}`;

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    const status = document.createElement("p");
    status.textContent = `Status: ${book.status}`;

    newBook.dataset.id = book.id;

    const removeBtn = document.createElement("div");
    removeBtn.classList.add("delete-button");

    removeBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
        <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"/>
    </svg>
    `;

    removeBtn.addEventListener('click', () => {
      let index = 0;
      for(let book of myLibrary) {
        if(book.id === newBook.dataset.id)
          break;
        else
          index++;
      }
      myLibrary.splice(index, 1);
      newBook.remove();
    })

    const toggleBtn = document.createElement("button");
    toggleBtn.classList.add("toggle-button");
    toggleBtn.textContent = "Toggle Status";

    toggleBtn.addEventListener("click", () => {
      const book = myLibrary.find(
          book => book.id === newBook.dataset.id
      );

      if (book.status === "Read") {
          book.status = "Not read";
      } else {
          book.status = "Read";
      }

      status.textContent = `Status: ${book.status}`;
    });

    newBook.append(title, author, status, removeBtn, toggleBtn);
    newBook.classList.add("card");
    container.appendChild(newBook);
}

openModal.addEventListener('click', () => {
  modal.showModal();
})

closeModal.addEventListener('click', () => {
  modal.close();
})

form.addEventListener("submit", (event) => {
    const title = form.title.value;
    const author = form.author.value;
    const status = form.status.value;

    addBookToLibrary(title, author, status);
    displayBook();
});

modal.addEventListener("close", () => {
    form.reset();
});

