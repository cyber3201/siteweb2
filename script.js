const header = document.querySelector('.site-header');
const navLinks = document.querySelectorAll('.nav-list a');
const sections = document.querySelectorAll('main section');
const backToTop = document.querySelector('.back-to-top');
const toast = document.querySelector('.toast');
const yearEl = document.querySelector('.year');

// set current year
yearEl.textContent = new Date().getFullYear();

// smooth scroll with offset
function scrollToTarget(target) {
  const el = document.querySelector(target);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

document.querySelectorAll('[data-scroll-target], .nav-list a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.getAttribute('data-scroll-target') || link.getAttribute('href');
    scrollToTarget(target);
  });
});

// scroll spy
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: `0px 0px -70% 0px` });

sections.forEach(sec => observer.observe(sec));

// back to top
window.addEventListener('scroll', () => {
  if (window.scrollY > window.innerHeight) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => scrollToTarget('#top'));

// reveal animations
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// form handler
const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  showToast('Thank you! We will be in touch.');
  form.reset();
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
