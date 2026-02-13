const panels = document.querySelectorAll('.panel');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
      }
    });
  },
  { threshold: 0.2 }
);

panels.forEach((panel, i) => {
  panel.style.opacity = 0;
  panel.style.transform = 'translateY(12px)';
  panel.style.transition = `opacity 500ms ease ${i * 70}ms, transform 500ms ease ${i * 70}ms`;
  observer.observe(panel);
});

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

const typingTitle = document.getElementById('typing-title');

if (typingTitle) {
  const typingPhrases = ['A Professional', 'A Full Stacl Marketer'];
  const typingSpeed = 95;
  const deletingSpeed = 55;
  const pauseAfterType = 1300;
  const pauseAfterDelete = 350;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const runTyping = () => {
    const currentPhrase = typingPhrases[phraseIndex];
    typingTitle.textContent = currentPhrase.slice(0, charIndex);

    if (!isDeleting && charIndex < currentPhrase.length) {
      charIndex += 1;
      setTimeout(runTyping, typingSpeed);
      return;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(runTyping, pauseAfterType);
      return;
    }

    if (isDeleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(runTyping, deletingSpeed);
      return;
    }

    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    setTimeout(runTyping, pauseAfterDelete);
  };

  runTyping();
}
