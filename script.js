document.getElementById('bookForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const bookName = document.getElementById('bookName').value;
  const sellerLocation = document.getElementById('sellerLocation').value;
  const imageFile = document.getElementById('bookImage').files[0];

  const reader = new FileReader();

  reader.onload = function () {
    const imageUrl = reader.result;
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    bookCard.innerHTML = `
      <img src="${imageUrl}" alt="${bookName}" />
      <div class="card-content">
        <h3>${bookName}</h3>
        <p><strong>Location:</strong> ${sellerLocation}</p>
        <p><em>Contact seller directly</em></p>
      </div>
    `;

    document.getElementById('bookContainer').appendChild(bookCard);
    document.getElementById('bookForm').reset();
  };

  reader.readAsDataURL(imageFile);
});

const books = [
  {
    name: "Concepts of Physics Vol 1",
    category: "Physics",
    location: "Ahmedabad",
    seller: "9876543210",
    image: "images/physics1.jpg"
  },
  {
    name: "Modern ABC Chemistry",
    category: "Chemistry",
    location: "Delhi",
    seller: "9998887776",
    image: "images/chemistry.jpg"
  },
  {
    name: "NCERT Biology",
    category: "Biology",
    location: "Mumbai",
    seller: "9123456789",
    image: "images/biology.jpg"
  }
];

// Function to display books
function displayBooks(filteredBooks) {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';

  filteredBooks.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <img src="${book.image}" alt="${book.name}" class="book-img"/>
      <h3>${book.name}</h3>
      <p><strong>Category:</strong> ${book.category}</p>
      <p><strong>Location:</strong> ${book.location}</p>
      <p><strong>Contact:</strong> ${book.seller}</p>
    `;
    bookList.appendChild(card);
  });
}

// Initial display
displayBooks(books);

// Filtering Logic
document.getElementById('searchBar').addEventListener('input', applyFilters);
document.getElementById('categoryFilter').addEventListener('change', applyFilters);
document.getElementById('locationFilter').addEventListener('input', applyFilters);

function applyFilters() {
  const searchText = document.getElementById('searchBar').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const location = document.getElementById('locationFilter').value.toLowerCase();

  const filtered = books.filter(book => {
    return (
      (book.name.toLowerCase().includes(searchText) || book.category.toLowerCase().includes(searchText)) &&
      (category === '' || book.category === category) &&
      (location === '' || book.location.toLowerCase().includes(location))
    );
  });

  displayBooks(filtered);
}

function scrollToPartners() {
  const element = document.getElementById("partners");
  if (element) element.scrollIntoView({ behavior: "smooth" });
}


