/* ==========================================================================
   K. THULASI — PORTFOLIO SCRIPT
   Sections: Starfield background, Navbar behavior, Mobile menu, Typing effect,
   Count-up stats, Scroll reveal, Skill ring animation, Contact form,
   Back-to-top, Button ripple.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  /* ---------- Logo Shimmer ---------- */

const logo = document.querySelector(".nav-logo");

if (logo) {
    setTimeout(() => {
        logo.classList.add("shimmer");
    }, 700);
}

  /* ---------------- Starfield background ---------------- */
  initStarfield();

  /* ---------------- Navbar scroll state ---------------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile nav toggle ---------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ---------------- Typing effect for hero name ---------------- */
  const typingTarget = document.getElementById('typingTarget');
  const fullName = 'Thulasi';
  let ti = 0;
  function typeLoop() {
    if (ti <= fullName.length) {
      typingTarget.textContent = fullName.slice(0, ti);
      ti++;
      setTimeout(typeLoop, 130);
    } else {
      typingTarget.style.borderRight = 'none';
    }
  }
  setTimeout(typeLoop, 500);

  /* ---------------- Count-up stats ---------------- */
  const statEls = document.querySelectorAll('.stat-num');
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const isYear = target > 1000;
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = isYear ? value : value;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  };

  /* ---------------- Scroll reveal (AOS-lite) + skill rings + stat counters ---------------- */
  const revealEls = document.querySelectorAll('[data-aos]');
  const skillOrbits = document.querySelectorAll('.skill-orbit');
  const heroStats = document.querySelector('.hero-stats');
  let statsAnimated = false;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillRing(entry.target);
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillOrbits.forEach(el => skillObserver.observe(el));

  if (heroStats) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          statEls.forEach(animateCount);
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });
    statsObserver.observe(heroStats);
  }

  function animateSkillRing(card) {
    const percent = parseInt(card.dataset.percent, 10);
    const circle = card.querySelector('.ring-fill');
    const percentLabel = card.querySelector('.skill-percent');
    const circumference = 326.7; // 2 * PI * 52
    const offset = circumference - (percent / 100) * circumference;

    requestAnimationFrame(() => {
      circle.style.strokeDashoffset = offset;
    });

    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      percentLabel.textContent = Math.floor(eased * percent) + '%';
      if (progress < 1) requestAnimationFrame(tick);
      else percentLabel.textContent = percent + '%';
    }
    requestAnimationFrame(tick);
  }

  /* ---------------- Contact Form (EmailJS) ---------------- */

emailjs.init({
  publicKey: "MO8bQmpH_-76EQw1q",
});

const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("formNote");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
      "service_672007",
      "template_672007",
      this
    ).then(() => {
      formNote.textContent = "✅ Message sent successfully!";
      contactForm.reset();
    }).catch((error) => {
      formNote.textContent = "❌ Failed to send message.";
      console.log(error);
    });
  });
}

  /* ---------------- Back to top ---------------- */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  /* ---------------- Active Navigation ---------------- */

const sections = document.querySelectorAll("section, header");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }

  });

  navItems.forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }

  });

});

  /* ---------------- Button ripple ---------------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

});

/* ==========================================================================
   STARFIELD — realistic layered stars + drifting nebula particles
   ========================================================================== */
function initStarfield() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let w, h, stars, particles;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    buildStars();
  }

  function buildStars() {
    const count = Math.floor((w * h) / 6000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.3 + 0.2,
      baseAlpha: Math.random() * 0.6 + 0.25,
      twinkleSpeed: Math.random() * 0.015 + 0.004,
      phase: Math.random() * Math.PI * 2,
    }));

    const pCount = Math.floor((w * h) / 90000);
    particles = Array.from({ length: pCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 60 + 40,
      dx: (Math.random() - 0.5) * 0.06,
      dy: (Math.random() - 0.5) * 0.06,
      hue: Math.random() > 0.5 ? 'gold' : 'blue',
      alpha: Math.random() * 0.05 + 0.02,
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);

    // Nebula particles (soft glow blobs)
    particles.forEach(p => {
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      if (p.hue === 'gold') {
        grad.addColorStop(0, `rgba(232,183,104,${p.alpha})`);
      } else {
        grad.addColorStop(0, `rgba(91,141,239,${p.alpha})`);
      }
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      if (!reduceMotion) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < -100) p.x = w + 100;
        if (p.x > w + 100) p.x = -100;
        if (p.y < -100) p.y = h + 100;
        if (p.y > h + 100) p.y = -100;
      }
    });

    // Stars with twinkle
    stars.forEach(s => {
      const twinkle = reduceMotion ? s.baseAlpha : s.baseAlpha + Math.sin(t * s.twinkleSpeed + s.phase) * 0.25;
      ctx.fillStyle = `rgba(241,240,238,${Math.max(0, Math.min(1, twinkle))})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    if (!reduceMotion) requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  requestAnimationFrame(draw);
}
fetch("https://api.countapi.xyz/hit/thulasi-portfolio-2026/visits")
  .then(response => response.json())
  .then(data => {
    document.getElementById("visitorCount").textContent = data.value;
  })
  .catch(() => {
    document.getElementById("visitorCount").textContent = "0";
  });
  /* ===========================
   DARK / LIGHT MODE
=========================== */

const themeBtn = document.getElementById("theme-toggle");

if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light-mode");
    themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';
}

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){

        localStorage.setItem("theme","light");

        themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

    }else{

        localStorage.setItem("theme","dark");

        themeBtn.innerHTML='<i class="fa-solid fa-moon"></i>';

    }

});
  