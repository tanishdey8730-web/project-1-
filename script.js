// script.js
// Minimal JS for interactive bits (nav highlight + small animations).
document.addEventListener('DOMContentLoaded', () => {
  // Simple smooth scroll for internal anchors if used later
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // small entrance animation for cards
  const cards = document.querySelectorAll('.card');
  cards.forEach((c,i)=>{
    c.style.opacity = 0;
    c.style.transform = 'translateY(12px)';
    setTimeout(()=> {
      c.style.transition = 'all 520ms cubic-bezier(.2,.9,.2,1)';
      c.style.opacity = 1;
      c.style.transform = 'translateY(0)';
    }, 120 + i*80);
  });
});

