// Smooth scroll for navigation
document.querySelectorAll("nav ul li a").forEach(link => {
  link.addEventListener("click", e => {
    const targetId = e.target.getAttribute("href");
    if (targetId && targetId.startsWith("#")) {
      e.preventDefault();
      document.querySelector(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Contact form feedback
const contactForm = document.querySelector(".contact form");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("✅ Your message has been sent successfully!");
    contactForm.reset();
  });
}

// Dynamic "Book Now" link creation
document.querySelectorAll(".card").forEach(card => {
  const destinationName = card.querySelector(".card-title")?.textContent.trim();
  const btn = card.querySelector(".btn");
  
  if (btn && destinationName) {
    // Add destination to URL safely
    const encodedName = encodeURIComponent(destinationName);
    btn.setAttribute("href", `booking.html?destination=${encodedName}`);
  }
});

// Button click animation for feedback
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", e => {
    const href = button.getAttribute("href");

    if (href && href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Booking visual confirmation
      button.textContent = "✔ Booked!";
      button.classList.add("booked");
      setTimeout(() => {
        button.textContent = "Book Now";
        button.classList.remove("booked");
      }, 2000);
    }
  });
});
// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });

  // Keep user preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
}
// Sign Up Logic
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    localStorage.setItem('user', JSON.stringify({ name, email, password, bookings: [] }));
    alert('Account created successfully!');
    window.location.href = 'login.html';
  });
}
const reviewsList = document.getElementById('reviewsList');
const reviewForm = document.getElementById('reviewForm');
const avgRating = document.getElementById('avgRating');
const ratingStars = document.querySelectorAll('#ratingStars span');

let selectedRating = 0;
let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

// STAR HOVER & CLICK
ratingStars.forEach(star => {
  star.addEventListener('mouseover', () => {
    const val = parseInt(star.dataset.value);
    highlightStars(val);
  });

  star.addEventListener('mouseout', () => {
    highlightStars(selectedRating);
  });

  star.addEventListener('click', () => {
    selectedRating = parseInt(star.dataset.value);
    highlightStars(selectedRating);
  });
});

function highlightStars(val) {
  ratingStars.forEach(star => {
    star.classList.toggle('active', parseInt(star.dataset.value) <= val);
  });
}

// DISPLAY REVIEWS
function displayReviews() {
  if (reviews.length === 0) {
    reviewsList.innerHTML = '<p>No reviews yet</p>';
    avgRating.textContent = 'No reviews yet';
    return;
  }

  reviewsList.innerHTML = reviews.map(r => `
    <div class="review-item">
      <strong>${r.name}</strong> — ⭐ ${r.rating}<br>
      ${r.message}
    </div>
  `).join('');

  const avg = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  avgRating.textContent = `${avg} / 5`;
}

// FORM SUBMISSION
reviewForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('reviewerName').value.trim();
  const message = document.getElementById('reviewMessage').value.trim();

  if (!name || !message) return alert('Please fill all fields');
  if (selectedRating === 0) return alert('Please select a rating');

  const review = { name, message, rating: selectedRating };
  reviews.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));

  reviewForm.reset();
  selectedRating = 0;
  highlightStars(0);

  displayReviews();
});

// INITIAL LOAD
displayReviews();
