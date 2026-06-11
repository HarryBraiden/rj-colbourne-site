/* Gemcoast Boutique — script.js */

(() => {
  'use strict';

  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      mobileNav.setAttribute('aria-hidden', String(!open));
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }

  const searchToggle = document.getElementById('search-toggle');
  const searchBar = document.getElementById('search-bar');
  const searchClose = document.getElementById('search-close');
  if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', () => {
      const open = searchBar.classList.toggle('open');
      searchBar.setAttribute('aria-hidden', String(!open));
      if (open) searchBar.querySelector('input')?.focus();
    });
    searchClose?.addEventListener('click', () => {
      searchBar.classList.remove('open');
      searchBar.setAttribute('aria-hidden', 'true');
    });
  }

  const particlesContainer = document.getElementById('particles-container');
  if (particlesContainer) {
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 60 + 10;
      p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--dur:${(Math.random()*8+5).toFixed(1)}s;--delay:${(Math.random()*-10).toFixed(1)}s;opacity:${(Math.random()*0.3+0.05).toFixed(2)};`;
      particlesContainer.appendChild(p);
    }
  }

  const revealEls = document.querySelectorAll('.reveal-up,.reveal-fade,.reveal-left,.reveal-right');
  if (revealEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('in-view'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  const backTop = document.getElementById('back-top');
  if (backTop) {
    window.addEventListener('scroll', () => { backTop.hidden = window.scrollY <= 500; }, { passive: true });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const nlForm = document.getElementById('nl-form');
  const nlSuccess = document.getElementById('nl-success');
  if (nlForm && nlSuccess) {
    nlForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!nlForm.querySelector('input[type="email"]')?.value) return;
      nlForm.hidden = true;
      nlSuccess.hidden = false;
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.getElementById(a.getAttribute('href').slice(1));
      if (!target) return;
      e.preventDefault();
      const off = (header?.offsetHeight ?? 0) + (document.querySelector('.announce-bar')?.offsetHeight ?? 0) + 8;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - off, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.p-wishlist').forEach(btn => {
    btn.addEventListener('click', function() {
      const path = this.querySelector('svg path');
      if (path) {
        const saved = this.dataset.saved === '1';
        this.dataset.saved = saved ? '0' : '1';
        path.setAttribute('fill', saved ? 'none' : '#e8705e');
        path.setAttribute('stroke', saved ? 'currentColor' : '#e8705e');
      }
    });
  });

  document.querySelectorAll('.p-quick').forEach(btn => {
    btn.addEventListener('click', () => {
      const bubble = document.querySelector('.cart-bubble');
      if (bubble) {
        bubble.textContent = (parseInt(bubble.textContent, 10) || 0) + 1;
        bubble.classList.add('pop');
        setTimeout(() => bubble.classList.remove('pop'), 300);
      }
    });
  });

  const style = document.createElement('style');
  style.textContent = '.cart-bubble.pop{animation:cart-pop 0.3s cubic-bezier(0.36,0.07,0.19,0.97) both}@keyframes cart-pop{0%{transform:scale(1)}50%{transform:scale(1.5)}100%{transform:scale(1)}}';
  document.head.appendChild(style);

})();