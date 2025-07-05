const uploadForm = document.getElementById("uploadForm");
const bookList = document.getElementById("bookList");

uploadForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const bookName = document.getElementById("bookName").value;
  const location = document.getElementById("bookLocation").value;
  const subject = document.getElementById("bookSubject").value;
  const file = document.getElementById("bookImage").files[0];

  const reader = new FileReader();
  reader.onloadend = function () {
    const book = {
      name: bookName,
      location: location,
      subject: subject,
      image: reader.result,
    };

    const books = JSON.parse(localStorage.getItem("books") || "[]");
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));

    uploadForm.reset();
    loadBooks();
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

function displayBook(book) {
  const card = document.createElement("div");
  card.className = "book-card";

  card.innerHTML = `
    <img src="${book.image}" alt="Book Image" />
    <h3>${book.name}</h3>
    <p><strong>Subject:</strong> ${book.subject}</p>
    <p><strong>Location:</strong> ${book.location}</p>
  `;

  bookList.appendChild(card);
}

function loadBooks() {
  const books = JSON.parse(localStorage.getItem("books") || "[]");
  window.allBooks = books; // Save for filtering
  applyFilters();
}

function applyFilters() {
  const locationQuery = document.getElementById("searchLocation").value.toLowerCase();
  const subjectFilter = document.getElementById("filterSubject").value;

  const filteredBooks = window.allBooks.filter(book => {
    const matchesLocation = book.location.toLowerCase().includes(locationQuery);
    const matchesSubject = subjectFilter === "all" || book.subject === subjectFilter;
    return matchesLocation && matchesSubject;
  });

  displayBooks(filteredBooks);
}

function displayBooks(bookArray) {
  bookList.innerHTML = ""; // Clear current list
  bookArray.forEach(displayBook);
}

window.addEventListener("load", loadBooks);
document.getElementById("searchLocation").addEventListener("input", applyFilters);
document.getElementById("filterSubject").addEventListener("change", applyFilters);
