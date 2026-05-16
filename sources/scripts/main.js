function toggleDropdown(btn) {
  const menu = btn.nextElementSibling;
  const isOpen = menu.classList.contains('open');

  document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
  document.querySelectorAll('.btn-dropdown').forEach(b => b.setAttribute('aria-expanded', 'false'));

  if (!isOpen) {
    menu.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

function selectOption(el, type) {
  event.preventDefault();
  const menu = el.closest('.dropdown-menu');
  const btn = menu.previousElementSibling;
  const feedbackSuccess = document.getElementById('feedback-success');
  const feedbackError = document.getElementById('feedback-error');
  const btnSuite = document.getElementById('btn-suite');

  // Mise à jour du bouton dropdown si présent
  if (btn && btn.classList.contains('btn-dropdown')) {
    btn.childNodes[0].textContent = el.textContent;
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  // Reset feedbacks
  if (feedbackSuccess) feedbackSuccess.style.display = 'none';
  if (feedbackError) feedbackError.style.display = 'none';
  if (btnSuite) btnSuite.style.display = 'none';

  if (type === 'success') {
    if (feedbackSuccess) feedbackSuccess.style.display = 'flex';
    if (btnSuite) btnSuite.style.display = 'inline-flex';
  } else if (type === 'error') {
    if (feedbackError) feedbackError.style.display = 'flex';
    else window.location.href = 'erreur.html';
  }
}

document.addEventListener('click', function (e) {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
    document.querySelectorAll('.btn-dropdown').forEach(b => b.setAttribute('aria-expanded', 'false'));
  }
});
