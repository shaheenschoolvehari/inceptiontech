/* =========================================================
   INCEPTION TECHNOLOGY - JAVASCRIPT
   ========================================================= */

/* ========== 0. PAGE PRELOADER WITH BIG OFFICIAL LOGO ========== */
const preloader = document.getElementById('preloader');
if (preloader) {
  const startTime = Date.now();
  const minDisplayTime = 1800; // 1.8 seconds so the big logo & animation are clearly visible

  const hidePreloader = () => {
    if (!preloader.classList.contains('hide')) {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

      setTimeout(() => {
        preloader.classList.add('hide');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 750);
      }, remainingTime);
    }
  };

  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader);
    // Fallback: dismiss after 3.2s max so user is never blocked
    setTimeout(hidePreloader, 3200);
  }

  // Allow clicking anywhere to dismiss instantly if user prefers
  preloader.addEventListener('click', () => {
    preloader.classList.add('hide');
    setTimeout(() => { preloader.style.display = 'none'; }, 500);
  });
}

document.addEventListener('DOMContentLoaded', () => {

  /* ========== 1. HEADER MOBILE MENU ========== */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
    });

    // Close menu when a navigation link is clicked
    document.querySelectorAll('#nav a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
      });
    });
  }

  /* ========== 2. HERO VIDEO PLAY / PAUSE ========== */
  const heroVideo = document.getElementById('heroVideo');
  const playBtn = document.getElementById('playBtn');

  if (heroVideo && playBtn) {
    playBtn.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play();
        playBtn.style.opacity = '0.35';
      } else {
        heroVideo.pause();
        playBtn.style.opacity = '1';
      }
    });
  }

  /* ========== 3. SCROLL REVEAL ANIMATIONS ========== */
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('in'));
  }

  /* ========== 4. STATS COUNTER ANIMATION ========== */
  const countElements = document.querySelectorAll('[data-count]');
  let countStarted = false;

  const startCounters = () => {
    countElements.forEach(el => {
      const target = +el.dataset.count;
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const interval = setInterval(() => {
        count = Math.min(target, count + step);
        el.textContent = count;
        if (count >= target) {
          clearInterval(interval);
        }
      }, 30);
    });
  };

  if ('IntersectionObserver' in window && countElements.length > 0) {
    const statsSection = countElements[0].closest('.stats') || countElements[0];
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countStarted) {
        countStarted = true;
        startCounters();
        statsObserver.unobserve(entries[0].target);
      }
    }, { threshold: 0.2 });
    statsObserver.observe(statsSection);
  } else {
    startCounters();
  }

  /* ========== 5. PORTFOLIO FILTER ========== */
  const tabs = document.querySelectorAll('.tab');
  const projects = document.querySelectorAll('.proj');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.f;
      projects.forEach(proj => {
        const isMatch = filter === 'all' || proj.dataset.cat === filter;
        proj.classList.toggle('hide', !isMatch);
        if (isMatch) {
          proj.classList.add('in');
          proj.classList.remove('pop');
          void proj.offsetWidth; // Trigger reflow
          proj.classList.add('pop');
        }
      });
    });
  });

  /* ========== 6. TESTIMONIAL SLIDER ========== */
  const track = document.getElementById('track');
  const dotsContainer = document.getElementById('dotsn');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  if (track && dotsContainer) {
    const cards = [...track.children];
    let currentIndex = 0;
    let autoPlayTimer;

    const cardsPerPage = () => (window.innerWidth <= 640 ? 1 : 2);
    const maxIndex = () => Math.max(0, cards.length - cardsPerPage());

    // Generate pagination dots
    dotsContainer.innerHTML = '';
    cards.forEach((_, k) => {
      const dot = document.createElement('i');
      dot.addEventListener('click', () => goToSlide(k));
      dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
      const max = maxIndex();
      currentIndex = Math.max(0, Math.min(index, max));
      if (cards[0]) {
        const cardWidth = cards[0].offsetWidth + 24; // width + gap
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      }

      [...dotsContainer.children].forEach((dot, k) => {
        dot.style.display = k > max ? 'none' : '';
        dot.classList.toggle('on', k === currentIndex);
      });
    }

    const nextSlide = () => goToSlide(currentIndex >= maxIndex() ? 0 : currentIndex + 1);
    const prevSlide = () => goToSlide(currentIndex <= 0 ? maxIndex() : currentIndex - 1);

    const startAutoPlay = () => {
      clearInterval(autoPlayTimer);
      autoPlayTimer = setInterval(nextSlide, 5000);
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoPlay();
      });
    }

    window.addEventListener('resize', () => goToSlide(currentIndex));
    goToSlide(0);
    startAutoPlay();
  }

  /* ========== 7. FAQ ACCORDION ========== */
  const faqItems = document.querySelectorAll('.item');

  faqItems.forEach(item => {
    const answer = item.querySelector('.ans');
    const questionBtn = item.querySelector('.qbtn');

    if (item.classList.contains('open') && answer) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all other items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('open');
          const otherAns = otherItem.querySelector('.ans');
          if (otherAns) otherAns.style.maxHeight = '0px';
        });

        // Toggle current item
        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  /* ========== 8. BACK TO TOP BUTTON WITH SCROLL RING ========== */
  const backToTopBtn = document.getElementById('totop');
  const totopRingFill = document.getElementById('totopRingFill');
  const circleCircumference = 2 * Math.PI * 20; // 125.66

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;

      backToTopBtn.classList.toggle('show', scrollY > 400);

      if (totopRingFill && scrollTotal > 0) {
        const ratio = Math.min(1, Math.max(0, scrollY / scrollTotal));
        totopRingFill.style.strokeDashoffset = circleCircumference - (ratio * circleCircumference);
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ========== 9. TOAST NOTIFICATION HELPER ========== */
  const toast = document.getElementById('toastMsg');
  const toastText = document.getElementById('toastText');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    if (toastText) toastText.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  /* ========== 10. QUOTE MODAL LOGIC ========== */
  const quoteModal = document.getElementById('quoteModal');
  const closeQuoteModal = document.getElementById('closeQuoteModal');
  const quoteForm = document.getElementById('quoteForm');
  const serviceSelect = document.getElementById('qService');

  function openQuote(preselectedService = null) {
    if (!quoteModal) return;
    if (preselectedService && serviceSelect) {
      serviceSelect.value = preselectedService;
    }
    quoteModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeQuote() {
    if (!quoteModal) return;
    quoteModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-quote]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openQuote();
    });
  });

  if (closeQuoteModal) {
    closeQuoteModal.addEventListener('click', closeQuote);
  }

  if (quoteModal) {
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) closeQuote();
    });
  }

  // Pre-select service from Learn More cards
  document.querySelectorAll('[data-service-select]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.dataset.serviceSelect;
      openQuote(serviceName);
    });
  });

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('qName')?.value || 'Client';
      closeQuote();
      quoteForm.reset();
      showToast(`Thank you ${name}! Your inquiry has been received.`);
    });
  }

  /* ========== 11. NEWSLETTER FORM ========== */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsEmail');
      const email = emailInput?.value || '';
      newsletterForm.reset();
      showToast(`Thanks for subscribing! We'll keep you updated.`);
    });
  }

  /* ========== 12. PROJECT PREVIEW MODAL ========== */
  const projModal = document.getElementById('projectModal');
  const closeProjModal = document.getElementById('closeProjModal');
  const projModalTitle = document.getElementById('projModalTitle');
  const projModalTag = document.getElementById('projModalTag');
  const projModalDesc = document.getElementById('projModalDesc');
  const projModalCta = document.getElementById('projModalCta');

  function closeProjectModal() {
    if (!projModal) return;
    projModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeProjModal) {
    closeProjModal.addEventListener('click', closeProjectModal);
  }

  if (projModal) {
    projModal.addEventListener('click', (e) => {
      if (e.target === projModal) closeProjectModal();
    });
  }

  document.querySelectorAll('.proj').forEach(proj => {
    const viewBtn = proj.querySelector('.proj-view-btn');
    if (viewBtn) {
      viewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const title = proj.dataset.title || proj.querySelector('h3')?.textContent || 'Project';
        const tag = proj.querySelector('.tag')?.textContent || 'Web';
        const desc = proj.dataset.desc || proj.querySelector('p')?.textContent || '';

        if (projModalTitle) projModalTitle.textContent = title;
        if (projModalTag) projModalTag.textContent = tag;
        if (projModalDesc) projModalDesc.textContent = desc;

        if (projModal) {
          projModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    }
  });

  if (projModalCta) {
    projModalCta.addEventListener('click', () => {
      closeProjectModal();
      openQuote();
    });
  }

  /* ========== 13. SCROLL SPY (ACTIVE NAV LINK) ========== */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('#nav a');

  function updateActiveNav() {
    let currentId = 'home';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  /* ========== 14. HEADER SCROLLED CLASS ========== */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  /* ========== 15. INTERACTIVE HERO CANVAS PARTICLES ========== */
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resizeCanvas() {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      if (particles.length > 0 && width > 0 && height > 0) {
        particles.forEach(p => {
          if (p.x > width) p.x = Math.random() * width;
          if (p.y > height) p.y = Math.random() * height;
        });
      }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particleCount = 42;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (width || 500),
        y: Math.random() * (height || 500),
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.2 + 1.2,
        color: Math.random() > 0.4 ? 'rgba(160, 104, 253, 0.75)' : 'rgba(111, 139, 255, 0.75)'
      });
    }

    function animateParticles() {
      if (!width || !height) {
        resizeCanvas();
      }
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(160, 104, 253, ${0.35 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  /* ========== 16. HERO LEFT SLIDER CONTROLS ========== */
  const heroSlides = document.querySelectorAll('.hslide');
  const heroDots = document.querySelectorAll('.hdot');
  const heroPrev = document.getElementById('heroPrev');
  const heroNext = document.getElementById('heroNext');

  if (heroSlides.length > 0) {
    let currentHeroIdx = 0;
    let heroTimer;

    function goToHeroSlide(index) {
      currentHeroIdx = (index + heroSlides.length) % heroSlides.length;
      heroSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentHeroIdx);
      });
      heroDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentHeroIdx);
      });
    }

    function startHeroTimer() {
      clearInterval(heroTimer);
      heroTimer = setInterval(() => {
        goToHeroSlide(currentHeroIdx + 1);
      }, 4500);
    }

    if (heroNext) {
      heroNext.addEventListener('click', () => {
        goToHeroSlide(currentHeroIdx + 1);
        startHeroTimer();
      });
    }

    if (heroPrev) {
      heroPrev.addEventListener('click', () => {
        goToHeroSlide(currentHeroIdx - 1);
        startHeroTimer();
      });
    }

    heroDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToHeroSlide(idx);
        startHeroTimer();
      });
    });

    startHeroTimer();
  }

  /* ========== 17. SCROLL PROGRESS BAR ========== */
  const scrollProgressBar = document.getElementById('scrollProgress');
  if (scrollProgressBar) {
    window.addEventListener('scroll', () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
      scrollProgressBar.style.width = `${progress}%`;
    });
  }

  /* ========== 18. LIVE PAKISTAN TIME (FOOTER WIDGET) ========== */
  const pktClock = document.getElementById('pktClock');
  if (pktClock) {
    function updatePktTime() {
      const options = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat([], options);
      pktClock.textContent = `· ${formatter.format(new Date())}`;
    }
    updatePktTime();
    setInterval(updatePktTime, 1000);
  }

  /* ========== 19. TECHNOLOGIES TICKER CLICK (COLOR #A068FD) ========== */
  const techItems = document.querySelectorAll('.tech-item');
  if (techItems.length > 0) {
    techItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const techKey = item.getAttribute('data-tech');
        const isNowActive = !item.classList.contains('active');

        // Toggle .active on all matching items (both in original set and marquee clone)
        const allMatching = document.querySelectorAll(`.tech-item[data-tech="${techKey}"]`);
        allMatching.forEach(el => {
          if (isNowActive) {
            el.classList.add('active');
          } else {
            el.classList.remove('active');
          }
        });

        const techName = item.querySelector('.tech-name')?.textContent || 'Technology';
        if (isNowActive && typeof showToast === 'function') {
          showToast(`⚡ ${techName} selected!`);
        }
      });
    });
  }

  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuote();
      closeProjectModal();
    }
  });

});

