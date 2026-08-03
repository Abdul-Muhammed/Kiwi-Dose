/* ============================================
   KIWI DOSE — Shared JavaScript
   ============================================ */

/* --------------------------------------------------------------
   ONLINE ORDERING (Tabin)

   Set this to the live Tabin ordering URL when it is ready. That
   single change is all that is required: every "Order Online"
   button across all seven pages carries a data-order-link hook and
   is repointed automatically, and the order page swaps its holding
   copy for the live ordering copy.

   Leave it as an empty string while ordering is not yet available.
   -------------------------------------------------------------- */
const TABIN_ORDER_URL = '';

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Online ordering wiring ---------- */
  if (TABIN_ORDER_URL) {
    document.querySelectorAll('[data-order-link]').forEach(link => {
      link.href = TABIN_ORDER_URL;
      link.target = '_blank';
      link.rel = 'noopener';
    });
  }

  // Show the holding block or the live block, never both.
  document.querySelectorAll('[data-order-state]').forEach(el => {
    const wantsLive = el.dataset.orderState === 'live';
    el.hidden = wantsLive !== Boolean(TABIN_ORDER_URL);
  });

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
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-menu-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
      mobileMenu?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Active Nav Link ----------
     URLs are served both with and without the .html extension, so
     normalise before comparing: /menu.html, /menu and /index.html
     must all match their nav entry. */
  const normalisePath = (path) => {
    let p = (path || '/').replace(/\.html$/, '').replace(/\/index$/, '/');
    if (p.length > 1) p = p.replace(/\/+$/, '');
    return p || '/';
  };

  const currentPath = normalisePath(window.location.pathname);
  let submenuMatched = false;

  document.querySelectorAll('.nav-link, .mobile-menu-link, .nav-sublink').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) return;
    if (normalisePath(href) === currentPath) {
      link.classList.add('active');
      if (link.classList.contains('nav-sublink')) submenuMatched = true;
    }
  });

  // Keep the parent highlighted when a landing page under it is open.
  if (submenuMatched) {
    document.querySelector('.nav-link-parent')?.classList.add('active');
  }

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

  /* ---------- Forms ----------
     Submitted to Netlify Forms over fetch so the page keeps its own
     success state. A success message is only ever shown after
     Netlify has actually accepted the submission. */
  const submitToNetlify = (form) =>
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString(),
    });

  const showFormError = (form, message) => {
    let error = form.querySelector('.form-error');
    if (!error) {
      error = document.createElement('p');
      error.className = 'form-error';
      error.setAttribute('role', 'alert');
      form.appendChild(error);
    }
    error.textContent = message;
  };

  const FALLBACK = 'Sorry, that did not send. Please email team@kiwidose.nz or call 021 244 3421.';

  /* Contact form */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = contactForm.querySelector('button[type="submit"]');
    const buttonHTML = button?.innerHTML;
    if (button) {
      button.disabled = true;
      button.textContent = 'Sending...';
    }

    try {
      const response = await submitToNetlify(contactForm);
      if (!response.ok) throw new Error('HTTP ' + response.status);
      contactForm.style.display = 'none';
      formSuccess?.classList.add('show');
    } catch (err) {
      if (button) {
        button.disabled = false;
        button.innerHTML = buttonHTML;
      }
      showFormError(contactForm, FALLBACK);
    }
  });

  /* Order page notify-me form */
  document.querySelectorAll('.coming-soon-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const button = form.querySelector('.coming-soon-submit');
      const buttonText = button?.textContent;
      if (button) {
        button.disabled = true;
        button.textContent = 'Sending...';
      }

      try {
        const response = await submitToNetlify(form);
        if (!response.ok) throw new Error('HTTP ' + response.status);
        form.style.display = 'none';
        const successEl = form.nextElementSibling;
        if (successEl?.classList.contains('coming-soon-success')) {
          successEl.classList.add('show');
        }
      } catch (err) {
        if (button) {
          button.disabled = false;
          button.textContent = buttonText;
        }
        showFormError(form, FALLBACK);
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
