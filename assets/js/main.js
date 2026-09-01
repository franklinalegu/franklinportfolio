/* Menu */
const navMenu = document.getElementById('nav-menu'), navToggle = document.getElementById('nav-toggle');
if(navToggle) navToggle.addEventListener('click', () => { const open = navMenu.classList.toggle('show-menu'); navToggle.innerHTML = open ? `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>` : `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`; });
document.querySelectorAll('.nav__menu .nav__link').forEach(a => a.addEventListener('click', () => { navMenu.classList.remove('show-menu'); if(navToggle) navToggle.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`; }));

/* Active link */
const sections = document.querySelectorAll('section[id]'), navLinks = document.querySelectorAll('.nav__link');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  sections.forEach(s => {
    const top = s.offsetTop - 100, h = s.offsetHeight, id = s.getAttribute('id');
    if(y >= top && y < top + h){ navLinks.forEach(a => a.classList.remove('active-link')); const act = document.querySelector(`.nav__link[href="#${id}"]`); if(act) act.classList.add('active-link'); }
  });
  const header = document.getElementById('header');
  if(header){ if(y > 20) header.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'; else header.style.boxShadow = 'none'; }
});

/* Reveal — IntersectionObserver (mrjamesbrand) */
const reveals = document.querySelectorAll('.reveal');
reveals.forEach(el => { if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) el.classList.add('is-visible'); });
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const io = new IntersectionObserver(entries => { entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } }); }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));
}

/* Testimonials duplicate for marquee */
const track = document.getElementById('testimonials-track');
if(track){ [...track.children].forEach(c => track.appendChild(c.cloneNode(true))); }

/* Contact offline — no EmailJS remote */
const form = document.getElementById('contact-form'), msg = document.getElementById('contact-message');
if(form){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    if(!fd.get('user_name') || !fd.get('user_email') || !fd.get('user_message')){
      if(msg){ msg.textContent = 'Please fill in all fields.'; msg.className = 'form-msg form-msg--err'; }
      return;
    }
    if(msg){ msg.textContent = 'Message sent successfully ✓ (offline demo)'; msg.className = 'form-msg form-msg--ok'; }
    form.reset();
    setTimeout(() => { if(msg){ msg.textContent = ''; msg.className = 'form-msg'; } }, 4000);
  });
}

/* Scroll up */
const su = document.getElementById('scroll-up');
window.addEventListener('scroll', () => { if(window.scrollY >= 500) su.classList.add('show'); else su.classList.remove('show'); });
if(su) su.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
