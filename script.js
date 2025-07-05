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
