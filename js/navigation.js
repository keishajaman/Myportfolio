(function() {
  const navButtons = document.querySelectorAll('.header-buttons button');

  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      const buttonText = this.textContent.trim();

      switch (buttonText) {
        case 'Home':
          window.location.href = 'index.html';
          break;
        case 'My work':
          window.location.href = 'software.html';
          break;
        case 'About me':
          window.location.href = 'about.html';
          break;
        case 'Contact':
          window.location.href = 'contact.html';
          break;
      }
    });
  });
})();
