// Navbar scroll shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Animate meter fills on scroll
const meters = document.querySelectorAll('.meter-fill');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.3 });

meters.forEach(m => {
  m.style.animationPlayState = 'paused';
  observer.observe(m);
});

// Simulate live sensor readings
const readings = {
  temp: { el: null, base: 28.4, range: 1.2, unit: ' °C' },
  umid: { el: null, base: 61,   range: 4,   unit: ' %' },
  lux:  { el: null, base: 82400, range: 2000, unit: '' }
};

window.addEventListener('DOMContentLoaded', () => {
  const vals = document.querySelectorAll('.reading-val');
  if (vals.length >= 3) {
    readings.temp.el = vals[0];
    readings.umid.el = vals[1];
    readings.lux.el  = vals[2];

    setInterval(() => {
      for (const key in readings) {
        const r = readings[key];
        if (!r.el) continue;
        const delta = (Math.random() - 0.5) * r.range * 0.4;
        const val = r.base + delta;
        if (key === 'lux') {
          r.el.textContent = Math.round(val).toLocaleString('pt-BR');
        } else {
          r.el.textContent = val.toFixed(1) + r.unit;
        }
      }
    }, 2000);
  }
});