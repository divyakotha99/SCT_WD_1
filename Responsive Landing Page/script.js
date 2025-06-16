const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.content-section');
const exploreServicesBtn = document.getElementById('explore-services-btn');

function activateTab(targetId) {
  navLinks.forEach(link => {
    const isActive = link.getAttribute('aria-controls') === targetId;
    link.classList.toggle('active', isActive);
    link.setAttribute('aria-selected', isActive ? 'true' : 'false');
    link.tabIndex = isActive ? 0 : -1;
  });

  sections.forEach(section => {
    section.classList.toggle('active', section.id === targetId);
    if(section.id === targetId) {
      section.setAttribute('tabindex', '0');
      section.focus();
    } else {
      section.setAttribute('tabindex', '-1');
    }
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.currentTarget.getAttribute('aria-controls');
    activateTab(target);
  });
});

if(exploreServicesBtn) {
  exploreServicesBtn.addEventListener('click', () => {
    activateTab('services');
  });
}

const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get('Name') || contactForm.querySelector('input[placeholder="Your Name"]').value.trim();
  const email = formData.get('Email') || contactForm.querySelector('input[placeholder="Your Email"]').value.trim();
  const message = formData.get('Message') || contactForm.querySelector('textarea[placeholder="Your Message"]').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }
  alert(`Thank you, ${name}! Your message has been received.`);
  contactForm.reset();
});
