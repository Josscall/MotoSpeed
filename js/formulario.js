const rules = {
  nombre:   { minLen: 3,  pattern: null,                  errId: 'err-nombre',   icoOk: 'ico-nombre',     icoErr: 'ico-nombre-err'   },
  email:    { minLen: 5,  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, errId: 'err-email', icoOk: 'ico-email', icoErr: 'ico-email-err' },
  asunto:   { required: true,                              errId: 'err-asunto'                                                        },
  mensaje:  { minLen: 20,                                  errId: 'err-mensaje'                                                       },
};

function showErr(field, show) {
  const el   = document.getElementById(field);
  const err  = document.getElementById('err-' + field);
  if (!el || !err) return;
  el.classList.toggle('invalid', show);
  el.classList.toggle('valid',  !show);
  err.classList.toggle('show',   show);
  // Íconos flotantes (solo campos de texto/email/tel)
  const ok  = document.getElementById('ico-' + field);
  const bad = document.getElementById('ico-' + field + '-err');
  if (ok)  { ok.style.display  = show ? 'none' : 'block'; }
  if (bad) { bad.style.display = show ? 'block' : 'none'; }
}

function validateField(id) {
  const el  = document.getElementById(id);
  const val = el.value.trim();
  const r   = rules[id];
  if (!r) return true;

  // Select requerido
  if (r.required) { showErr(id, !val); return !!val; }
  // Longitud mínima
  if (r.minLen && val.length < r.minLen) { showErr(id, true); return false; }
  // Patrón
  if (r.pattern && !r.pattern.test(val)) { showErr(id, true); return false; }
  showErr(id, false);
  return true;
}

// Teléfono: opcional, pero si tiene algo debe ser válido
function validateTel() {
  const val = document.getElementById('telefono').value.trim();
  if (!val) {
    // Limpiar
    const el = document.getElementById('telefono');
    el.classList.remove('invalid','valid');
    document.getElementById('err-telefono').classList.remove('show');
    document.getElementById('ico-telefono').style.display     = 'none';
    document.getElementById('ico-telefono-err').style.display = 'none';
    return true;
  }
  const ok = /^\+?[\d\s\-]{7,15}$/.test(val);
  showErr('telefono', !ok);
  return ok;
}

// Live validation
['nombre','email','mensaje'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => validateField(id));
  document.getElementById(id).addEventListener('blur',  () => validateField(id));
});
document.getElementById('asunto').addEventListener('change', () => validateField('asunto'));
document.getElementById('telefono').addEventListener('input', validateTel);
document.getElementById('telefono').addEventListener('blur',  validateTel);

// Contador de caracteres para mensaje
const msgEl = document.getElementById('mensaje');
const charEl = document.getElementById('charCount');
msgEl.addEventListener('input', () => {
  const n = msgEl.value.length;
  charEl.textContent = n;
  if (n > 500) { msgEl.value = msgEl.value.slice(0, 500); charEl.textContent = 500; }
});

// ─── SUBMIT ───────────────────────────────────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const v1 = validateField('nombre');
  const v2 = validateField('email');
  const v3 = validateTel();
  const v4 = validateField('asunto');
  const v5 = validateField('mensaje');

  if (!(v1 && v2 && v3 && v4 && v5)) {
    // Scroll al primer error
    const firstErr = document.querySelector('.form-control-ms.invalid');
    if (firstErr) firstErr.scrollIntoView({behavior:'smooth', block:'center'});
    return;
  }

  // Simular envío
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i> Enviando…';

  setTimeout(() => {
    document.getElementById('formWrap').style.display = 'none';
    const banner = document.getElementById('successBanner');
    banner.classList.add('show');
    banner.scrollIntoView({behavior:'smooth', block:'center'});
  }, 1600);
});

function resetForm() {
  document.getElementById('contactForm').reset();
  document.getElementById('submitBtn').disabled = false;
  document.getElementById('submitBtn').innerHTML = 'Enviar mensaje <i class="bi bi-arrow-right"></i>';
  charEl.textContent = '0';
  // Limpiar clases
  ['nombre','email','telefono','asunto','mensaje'].forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('valid','invalid');
  });
  document.querySelectorAll('.err-msg').forEach(e => e.classList.remove('show'));
  document.querySelectorAll('.valid-ico').forEach(e => e.style.display = 'none');
  document.getElementById('successBanner').classList.remove('show');
  document.getElementById('formWrap').style.display = 'block';
}

// ─── SCROLL / AOS ─────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
});
const aosEls = document.querySelectorAll('.aos');
const aosObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); aosObs.unobserve(e.target); }});
}, {threshold:.12});
aosEls.forEach(el => aosObs.observe(el));