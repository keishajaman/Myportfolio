(function() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const slides = document.querySelectorAll('.project-slide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));

    if (slides[index]) {
      slides[index].classList.add('active');
    }

    if (prevBtn && nextBtn) {
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === slides.length - 1;
    }
  }

  if (slides.length > 0) {
    slides.forEach(slide => {
      slide.addEventListener('click', function() {
        window.location.href = 'software.html';
      });
      slide.style.cursor = 'pointer';
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
          currentSlide -= 1;
          showSlide(currentSlide);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
          currentSlide += 1;
          showSlide(currentSlide);
        }
      });
    }

    showSlide(currentSlide);
  }
})();
