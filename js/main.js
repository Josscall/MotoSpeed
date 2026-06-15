  // Cambiar clase del navbar al hacer scroll
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }
  });
    // Efecto de scroll para navbar
  window.addEventListener('scroll', function() {
    const nav = document.getElementById('nav');
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }
  });
  // Marcar el enlace activo según la página actual (opcional)
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });

  