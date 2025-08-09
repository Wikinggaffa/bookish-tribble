function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

function bindButton(id, message) {
  const btn = document.getElementById(id);
  if (!btn) {
    console.warn(`Button with id ${id} not found`);
    return;
  }
  btn.addEventListener('click', () => {
    showToast(message);
  });
}

bindButton('giveBtn', 'You gave a gift!');
bindButton('sarcasmBtn', 'Sarcasm deployed!');
bindButton('coffeeBtn', 'Coffee purchased!');

if (typeof module !== 'undefined') {
  module.exports = { showToast, bindButton };
}
