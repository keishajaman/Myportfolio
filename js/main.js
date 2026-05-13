/**
 * Navigation Button Handler
 * This script manages all navigation buttons in the header.
 * When a button is clicked, it redirects to the corresponding page.
 */

// Get all navigation buttons from the header
// querySelectorAll() finds all buttons inside the .header-buttons container
const navButtons = document.querySelectorAll('.header-buttons button');

// Loop through each navigation button and add a click event listener
// addEventListener() attaches a function that runs when the button is clicked
navButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Get the button's text content (e.g., "My work", "Home", etc.)
    // trim() removes any extra whitespace from the text
    const buttonText = this.textContent.trim();
    
    // Use a switch statement to check which button was clicked
    // and redirect to the appropriate page
    switch(buttonText) {
      case 'Home':
        // Redirect to the home page
        window.location.href = 'index.html';
        break;
      case 'My work':
        // Redirect to the software engineering page as the main work page
        window.location.href = 'software.html';
        break;
      case 'About me':
        // Redirect to the about page
        window.location.href = 'about.html';
        break;
      case 'Contact':
        // Redirect to the contact page
        window.location.href = 'contact.html';
        break;
    }
  });
});

/**
 * Projects Slider Functionality
 * This script manages the projects slider with navigation arrows.
 * Users can click on project slides to view the full project in "My work" page
 */

// Get slider elements
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slides = document.querySelectorAll('.project-slide');
let currentSlide = 0;

// Function to show a specific slide
function showSlide(index) {
  // Hide all slides
  slides.forEach(slide => {
    slide.classList.remove('active');
  });
  
  // Show the current slide
  slides[index].classList.add('active');
  
  // Update button states
  if (prevBtn && nextBtn) {
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === slides.length - 1;
  }
}

// Add click handlers to project slides for navigation to software work page
slides.forEach((slide, index) => {
  slide.addEventListener('click', function() {
    // Navigate to the software engineering work page
    window.location.href = 'software.html';
  });
  
  // Add cursor pointer to indicate the slide is clickable
  slide.style.cursor = 'pointer';
});

// Event listeners for navigation buttons
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      showSlide(currentSlide);
    }
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      showSlide(currentSlide);
    }
  });
}

// Initialize slider
if (slides.length > 0) {
  showSlide(currentSlide);
}

/**
 * Image Carousel Handler
 * Enables carousel navigation for each project image container on work pages
 */
const imageCarousels = document.querySelectorAll('.image-carousel');

imageCarousels.forEach((carousel) => {
  const slidesWrapper = carousel.querySelector('.carousel-slides');
  const slides = carousel.querySelectorAll('.project-image-placeholder');
  const prev = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');
  const dots = carousel.querySelectorAll('.carousel-dot');
  let currentIndex = 0;

  function updateCarousel(index) {
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }
    currentIndex = index;
    const offset = index * -100;
    if (slidesWrapper) {
      slidesWrapper.style.transform = `translateX(${offset}%)`;
    }

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === index);
    });
  }

  if (prev) {
    prev.addEventListener('click', () => {
      updateCarousel(currentIndex - 1);
    });
  }

  if (next) {
    next.addEventListener('click', () => {
      updateCarousel(currentIndex + 1);
    });
  }

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => {
      updateCarousel(dotIndex);
    });
  });

  updateCarousel(0);
});

/**
 * Scroll to Project Handler
 * When the page loads with a project hash, smooth scroll to that project
 */
window.addEventListener('load', function() {
  // Check if there's a hash in the URL (e.g., #project-1)
  if (window.location.hash) {
    // Get the target element ID from the hash
    const targetId = window.location.hash.substring(1); // Remove the '#'
    const targetElement = document.getElementById(targetId);
    
    // If the target element exists, scroll to it smoothly
    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Optional: Add a highlight animation to the project
        targetElement.style.animation = 'projectHighlight 1s ease-in-out';
      }, 300);
    }
  }
});

/**
 * Project Highlight Animation
 * Adds visual feedback when a project is scrolled to
 */
const style = document.createElement('style');
style.textContent = `
  @keyframes projectHighlight {
    0% {
      transform: scale(1);
      filter: brightness(1);
    }
    50% {
      transform: scale(1.02);
      filter: brightness(1.05);
    }
    100% {
      transform: scale(1);
      filter: brightness(1);
    }
  }
`;
document.head.appendChild(style);

/**
 * Contact Form Handler
 * Handles form submission and displays success/error messages
 */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate form fields
    if (!name || !email || !subject || !message) {
      showFormMessage('Please fill in all fields', 'error');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormMessage('Please enter a valid email address', 'error');
      return;
    }
    
    // Show success message (in a real app, this would send the form data to a server)
    showFormMessage('Message sent successfully! Thank you for contacting me.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // Clear message after 5 seconds
    setTimeout(() => {
      const message = document.querySelector('.form-message');
      if (message) {
        message.remove();
      }
    }, 5000);
  });
}

/**
 * Display Form Message
 * Shows success or error messages to the user
 */
function showFormMessage(messageText, type) {
  // Remove existing message if present
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create new message element
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message ${type}`;
  messageDiv.textContent = messageText;
  
  // Insert message at the top of the form
  contactForm.insertBefore(messageDiv, contactForm.firstChild);
}
