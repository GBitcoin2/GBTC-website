document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const elements = document.querySelectorAll(
    '.feature-card, .roadmap-item, .utility-item'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    elements.forEach((element) => {
      element.classList.add('reveal');
      observer.observe(element);
    });
  }
});
