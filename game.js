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
    updateScore(id);
    randomizeBackground();
    checkAllClicked();
  });
}

const scores = {
  giveBtn: 0,
  sarcasmBtn: 0,
  coffeeBtn: 0,
};

const scoreIds = {
  giveBtn: 'giftCount',
  sarcasmBtn: 'sarcasmCount',
  coffeeBtn: 'coffeeCount',
};

function updateScore(id) {
  if (!(id in scores)) return;
  scores[id]++;
  const el = document.getElementById(scoreIds[id]);
  if (el) {
    el.textContent = String(scores[id]);
  }
}

function randomizeBackground() {
  const colors = ['#fef3bd', '#fde2e4', '#cdeac0', '#bee1e6', '#e3f2fd'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = color;
}

let celebrated = false;

function checkAllClicked() {
  if (celebrated) return;
  const allClicked = Object.values(scores).every((count) => count > 0);
  if (allClicked) {
    celebrated = true;
    celebrateBackground();
  }
}

function celebrateBackground() {
  document.body.style.backgroundColor = '';
  document.body.classList.add('celebrate');
  setTimeout(() => document.body.classList.remove('celebrate'), 1000);
}

bindButton('giveBtn', 'You gave a gift!');
bindButton('sarcasmBtn', 'Sarcasm deployed!');
bindButton('coffeeBtn', 'Coffee purchased!');

if (typeof module !== 'undefined') {
  module.exports = { showToast, bindButton, updateScore };
}
