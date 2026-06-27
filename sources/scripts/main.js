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
  const menu = el.closest('.dropdown-menu');
  const btn = menu?.previousElementSibling;
  const isDropdownBtn = btn?.classList.contains('btn-dropdown');

  if (isDropdownBtn) {
    handleDropdownSelection(btn, menu, el);
  } else {
    updateSelectedItem(menu, el);
  }

  if (type) {
    handleFeedback(type);
  }
}

function handleDropdownSelection(btn, menu, el) {
  if (!btn.dataset.placeholder) {
    btn.dataset.placeholder = btn.childNodes[0].textContent.trim();
  }

  const selectedValue = el.textContent.trim();
  const currentValue = btn.childNodes[0].textContent.trim();

  if (currentValue === selectedValue) {
    resetDropdown(btn);
  } else {
    btn.childNodes[0].textContent = selectedValue;
    btn.classList.add('has-value');
  }

  menu.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
}

function updateSelectedItem(menu, el) {
  menu.querySelectorAll('.dropdown-item').forEach(item => {
    item.classList.remove('selected');
  });
  el.classList.add('selected');
}

function handleFeedback(type) {
  const feedbackSuccess = document.getElementById('feedback-success');
  const feedbackError = document.getElementById('feedback-error');
  const btnNext = document.getElementById('btn-next');

  feedbackSuccess.style.display = 'none';
  feedbackError.style.display = 'none';

  const isSuccess = type === 'success';

  feedbackSuccess.style.display = isSuccess ? 'flex' : 'none';
  feedbackError.style.display = isSuccess ? 'none' : 'flex';

  if (btnNext) {
    btnNext.style.display = isSuccess ? 'inline-block' : 'none';
  }
}


function resetDropdown(btn) {
  if (btn.dataset.placeholder) {
    btn.childNodes[0].textContent = btn.dataset.placeholder;
  }
  btn.classList.remove('has-value');
}

document.addEventListener('click', function (e) {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
    document.querySelectorAll('.btn-dropdown').forEach(b => b.setAttribute('aria-expanded', 'false'));
  }
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.btn-dropdown').forEach(btn => {
    btn.dataset.placeholder = btn.childNodes[0].textContent.trim();
  });

  const resetBtn = document.querySelector('button[type="reset"]');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      document.querySelectorAll('.btn-dropdown').forEach(btn => resetDropdown(btn));
    });
  }
});

function sendEmail() {
  const destinataire = document.getElementById('destinataire').value.trim();
  const objet = encodeURIComponent(document.getElementById('objet').value.trim());
  const message = encodeURIComponent(document.getElementById('message').value.trim());

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(destinataire)) {
    setTimeout(() => {
      alert('⚠️ L\'adresse mail saisie n\'est pas valide.');
    }, 300);
    return;
  }

  window.location.href = `mailto:${destinataire}?subject=${objet}&body=${message}`;

  setTimeout(() => {
    document.getElementById('btn-next').style.display = 'block';
  }, 400);
  setTimeout(() => {
    alert('✅ Votre logiciel de messagerie s\'est ouvert pour envoyer le mail. Bravo !');
  }, 500);


}
