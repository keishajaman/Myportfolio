(function() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) {
    return;
  }

  function showFormMessage(messageText, type) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = messageText;
    contactForm.insertBefore(messageDiv, contactForm.firstChild);
  }

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
      showFormMessage('Please fill in all fields', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormMessage('Please enter a valid email address', 'error');
      return;
    }

    showFormMessage('Message sent successfully! Thank you for contacting me.', 'success');
    contactForm.reset();

    setTimeout(() => {
      const messageEl = document.querySelector('.form-message');
      if (messageEl) {
        messageEl.remove();
      }
    }, 5000);
  });
})();
