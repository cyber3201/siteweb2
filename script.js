// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

menuToggle.addEventListener('click', () => {
  const open = primaryNav.classList.toggle('open');
  menuToggle.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', open);
});

primaryNav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    primaryNav.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('click', (e) => {
  if (
    primaryNav.classList.contains('open') &&
    !primaryNav.contains(e.target) &&
    e.target !== menuToggle
  ) {
    primaryNav.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && primaryNav.classList.contains('open')) {
    primaryNav.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// Scroll spy
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav-list a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: '-50% 0px -50% 0px' }
);

sections.forEach((section) => observer.observe(section));

// Back to top
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact form mailto + toast
const form = document.querySelector('#contact form');
const toast = document.getElementById('toast');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`);
  window.location.href = `mailto:holistichealth@2h-academy.org?subject=Contact%20Form&body=${body}`;
  toast.textContent = 'Thank you! We will be in touch.';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
  form.reset();
});
