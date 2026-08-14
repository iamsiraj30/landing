/**
 * NovaFlow AI - Single App Landing Page JavaScript Logic
 * Features: Pricing toggle, scroll animations, stats counter, nav highlight
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('shadow-lg');
      navbar.style.background = 'rgba(8, 11, 18, 0.95)';
    } else {
      navbar.classList.remove('shadow-lg');
      navbar.style.background = 'rgba(8, 11, 18, 0.75)';
    }
  });

  // 2. Interactive Pricing Plan Switch (Monthly vs Annual)
  const billingSwitch = document.getElementById('billingSwitch');
  const priceStarter = document.getElementById('priceStarter');
  const pricePro = document.getElementById('pricePro');
  const priceEnterprise = document.getElementById('priceEnterprise');
  const periodLabels = document.querySelectorAll('.pricing-period');

  if (billingSwitch) {
    billingSwitch.addEventListener('change', (e) => {
      const isAnnual = e.target.checked;
      
      if (isAnnual) {
        // Annual Pricing (20% discount applied)
        priceStarter.textContent = '$0';
        pricePro.textContent = '$29';
        priceEnterprise.textContent = '$79';
        
        periodLabels.forEach(el => el.textContent = '/ month (billed annually)');
      } else {
        // Monthly Pricing
        priceStarter.textContent = '$0';
        pricePro.textContent = '$39';
        priceEnterprise.textContent = '$99';

        periodLabels.forEach(el => el.textContent = '/ month');
      }

      // Add quick pulse animation to price numbers
      [priceStarter, pricePro, priceEnterprise].forEach(el => {
        el.style.transform = 'scale(1.1)';
        setTimeout(() => el.style.transform = 'scale(1)', 200);
      });
    });
  }

  // 3. Animated Counter for Metrics Section
  const counters = document.querySelectorAll('.counter-val');
  let animated = false;

  const startCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 1500; // ms
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target.toLocaleString() + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toLocaleString() + suffix;
        }
      }, stepTime);
    });
  };

  // Trigger counters when scrolled into view
  const statsSection = document.getElementById('metrics');
  if (statsSection) {
    window.addEventListener('scroll', () => {
      const sectionPos = statsSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.2;

      if (sectionPos < screenPos && !animated) {
        animated = true;
        startCounters();
      }
    });
  }

  // 4. Smooth Scroll for internal navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        
        // Close collapse navbar menu on mobile if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) bsCollapse.hide();
        }

        targetEl.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
