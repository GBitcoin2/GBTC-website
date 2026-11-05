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


// HBTC Active Navigation
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
const navSections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && navSections.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', isActive);

          if (isActive) {
            link.setAttribute('aria-current', 'location');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, { rootMargin: '-20% 0px -60% 0px' });

  navSections.forEach((section) => navObserver.observe(section));
}

// GBTC Contract Address Copy
document.addEventListener('DOMContentLoaded', () => {
  const copyButton = document.getElementById('copy-gbtc-address');
  const addressElement = document.getElementById('gbtc-contract-address');
  const feedback = document.getElementById('token-copy-feedback');
  const languageSwitcher = document.getElementById('language-switcher');

  if (!copyButton || !addressElement || !feedback) return;

  const messages = {
    en: ['Address copied successfully.', 'Copy failed. Please select and copy the address manually.'],
    ar: ['تم نسخ عنوان العقد بنجاح.', 'تعذر نسخ العنوان. يرجى تحديده ونسخه يدوياً.'],
    fr: ['Adresse copiée avec succès.', 'Échec de la copie. Veuillez copier l’adresse manuellement.'],
    es: ['Dirección copiada correctamente.', 'No se pudo copiar. Copie la dirección manualmente.'],
    de: ['Adresse erfolgreich kopiert.', 'Kopieren fehlgeschlagen. Bitte kopieren Sie die Adresse manuell.'],
    tr: ['Adres başarıyla kopyalandı.', 'Kopyalama başarısız. Lütfen adresi manuel olarak kopyalayın.'],
    zh: ['地址已成功复制。', '复制失败，请手动复制地址。'],
    ru: ['Адрес успешно скопирован.', 'Не удалось скопировать，请手动复制地址。']
  };

  async function copyAddress(address) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(address);
        return true;
      } catch (_) {
        // Try the compatibility method below.
      }
    }

    const field = document.createElement('textarea');
    field.value = address;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.top = '0';
    field.style.left = '-9999px';
    field.style.opacity = '0';

    document.body.appendChild(field);
    field.focus();
    field.select();
    field.setSelectionRange(0, field.value.length);

    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch (_) {
      copied = false;
    }

    field.remove();
    return copied;
  }

  copyButton.addEventListener('click', async () => {
    const address = addressElement.textContent.trim();
    const lang = languageSwitcher?.value || 'en';
    const message = messages[lang] || messages.en;

    feedback.textContent = '';

    const copied = await copyAddress(address);
    feedback.textContent = copied ? message[0] : message[1];
  });
});
