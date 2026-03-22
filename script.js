/* ============================================
   KIWI DOSE — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navigation Scroll ---------- */
  const nav = document.querySelector('.nav');
  const handleScroll = () => {
    nav?.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---------- Hamburger / Mobile Menu ---------- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu?.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-menu-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileMenu?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Active Nav Link ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-menu-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---------- Scroll Reveal ---------- */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ---------- Contact Form ---------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    console.log('Contact form submitted:', data);

    contactForm.style.display = 'none';
    if (formSuccess) {
      formSuccess.classList.add('show');
    }
  });

  /* ---------- Coming Soon Form ---------- */
  document.querySelectorAll('.coming-soon-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.coming-soon-input');
      const email = input?.value;

      if (email) {
        console.log('Newsletter signup:', email);
        form.style.display = 'none';
        const successEl = form.nextElementSibling;
        if (successEl?.classList.contains('coming-soon-success')) {
          successEl.classList.add('show');
        }
      }
    });
  });

  /* ---------- Smooth Scroll for Anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Hero Leaves (subtle floating particles) ---------- */
  const leavesContainer = document.querySelector('.hero-leaves');
  if (leavesContainer) {
    for (let i = 0; i < 6; i++) {
      const leaf = document.createElement('div');
      leaf.classList.add('hero-leaf');
      leaf.innerHTML = `<svg viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 19c4-3 8-4 13-4V8z"/></svg>`;
      leaf.style.left = Math.random() * 100 + '%';
      leaf.style.animationDuration = (12 + Math.random() * 10) + 's';
      leaf.style.animationDelay = -(Math.random() * 15) + 's';
      leaf.style.width = (14 + Math.random() * 14) + 'px';
      leaf.style.height = leaf.style.width;
      leavesContainer.appendChild(leaf);
    }
  }

});
