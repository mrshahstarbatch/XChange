// script.js

console.log("BookWave is live!");

function showComingSoon(message) {
  alert(message || "This feature is coming soon!");
}

function handleListing(event) {
  event.preventDefault();
  const title = document.getElementById("bookTitle").value;
  const mrp = parseFloat(document.getElementById("mrp").value);

  if (!title || isNaN(mrp) || mrp <= 0) {
    alert("Please enter valid details.");
    return;
  }

  const price = (0.4 * mrp).toFixed(2);
  const youGet = (0.9 * price).toFixed(2);

  const output = `📚 Listing created for "${title}" at ₹${price}. You will earn ₹${youGet} after 10% platform fee.`;
  document.getElementById("listing-output").innerText = output;
  document.getElementById("bookTitle").value = "";
  document.getElementById("mrp").value = "";
}
