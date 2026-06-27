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

function selectOption(el) {
  event.preventDefault();
  const menu = el.closest('.dropdown-menu');
  const btn = menu.previousElementSibling;

  if (btn && btn.classList.contains('btn-dropdown')) {
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
