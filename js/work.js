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
      if (slidesWrapper) {
        slidesWrapper.style.transform = `translateX(${index * -100}%)`;
      }

      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === index);
      });
    }

    if (prev) {
      prev.addEventListener('click', () => updateCarousel(currentIndex - 1));
    }

    if (next) {
      next.addEventListener('click', () => updateCarousel(currentIndex + 1));
    }

    dots.forEach((dot, dotIndex) => {
      dot.addEventListener('click', () => updateCarousel(dotIndex));
    });

    updateCarousel(0);
  });

  window.addEventListener('load', function() {
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetElement.style.animation = 'projectHighlight 1s ease-in-out';
        }, 300);
      }
    }
  });

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
})();
