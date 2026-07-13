import emailjs from '@emailjs/browser';

// Toast notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast-${type}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// Dynamic copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Active nav highlighting
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollY = window.scrollY;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNav);

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');

function reveal() {
  const windowHeight = window.innerHeight;
  const revealPoint = 150;
  
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    
    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// Skill bar animation with counter
const skillBars = document.querySelectorAll('.skill-bar-fill');

function animateSkillBars() {
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width;

    const parent = bar.closest('div');
    const percentEl = parent?.querySelector('.text-accent.text-sm.font-semibold');
    if (percentEl) {
      const target = parseInt(width);
      let current = 0;
      const step = Math.ceil(target / 30);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        percentEl.textContent = current + '%';
      }, 40);
    }
  });
}

const resumeSection = document.getElementById('resume');
if (resumeSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  observer.observe(resumeSection);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});




// Back to top button
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Form validation
function validateField(input) {
  const error = input.parentElement.querySelector('.form-error');
  if (!error) return true;
  if (input.validity.valid && input.value.trim() !== '') {
    input.classList.remove('error');
    error.classList.remove('visible');
    return true;
  } else {
    input.classList.add('error');
    error.classList.add('visible');
    return false;
  }
}

// ✅ NEW syntax (v4+)
emailjs.init({
  publicKey: "Bxl49RrV9sVpuMi2x",
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const formInputs = contactForm.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) validateField(input);
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let allValid = true;
    formInputs.forEach(input => {
      if (!validateField(input)) allValid = false;
    });
    if (!allValid) {
      showToast('Please fill in all required fields correctly.', 'error');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    emailjs.sendForm(
      "service_ippw0gm",
      "template_hflr1mj",
      contactForm
    )
    .then(() => {
      showToast("Message sent successfully! I'll get back to you soon.", 'success');
      contactForm.reset();
      formInputs.forEach(input => input.classList.remove('error'));
    })
    .catch((error) => {
      console.error("Email send error:", error);
      showToast("Failed to send message. Please try again later.", 'error');
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });
  });
}







const cursor = document.getElementById("custom-cursor");
const bubbleContainer = document.getElementById("bubble-container");

const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

function createBubble(x, y) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  const size = Math.random() * 12 + 8;

  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;

  bubbleContainer.appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, 800);
}

if (!isTouchDevice) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    createBubble(e.clientX, e.clientY);
  });

  const interactiveElements = document.querySelectorAll(
    "a, button, .toggle, input, textarea"
  );

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("cursor-hover");
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("cursor-hover");
    });
  });

} else {
  cursor.style.display = "none";

  let lastBubbleTime = 0;
  const bubbleThrottle = 100;

  document.addEventListener("touchmove", (e) => {
    const now = Date.now();
    if (now - lastBubbleTime < bubbleThrottle) return;
    lastBubbleTime = now;

    const touch = e.touches[0];
    createBubble(touch.clientX, touch.clientY);
  }, { passive: true });

  document.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createBubble(
          touch.clientX + (Math.random() - 0.5) * 40,
          touch.clientY + (Math.random() - 0.5) * 40
        );
      }, i * 50);
    }
  }, { passive: true });
}


