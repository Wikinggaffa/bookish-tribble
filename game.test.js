/**
 * @jest-environment jsdom
 */

global.requestAnimationFrame = (cb) => cb();

describe('showToast', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('adds and removes toast element with correct text', () => {
    jest.isolateModules(() => {
      const { showToast } = require('./game');
      showToast('Test');
    });

    const toast = document.querySelector('.toast');
    expect(toast).not.toBeNull();
    expect(toast.textContent).toBe('Test');
    expect(toast.classList.contains('show')).toBe(true);

    jest.advanceTimersByTime(2300);
    expect(document.querySelector('.toast')).toBeNull();
  });
});

describe('button clicks', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="giveBtn"></button>
      <button id="sarcasmBtn"></button>
      <button id="coffeeBtn"></button>
      <div id="scoreboard">
        <div><span id="giftCount">0</span></div>
        <div><span id="sarcasmCount">0</span></div>
        <div><span id="coffeeCount">0</span></div>
      </div>
    `;
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const cases = [
    ['giveBtn', 'You gave a gift!', 'giftCount'],
    ['sarcasmBtn', 'Sarcasm deployed!', 'sarcasmCount'],
    ['coffeeBtn', 'Coffee purchased!', 'coffeeCount'],
  ];

  test.each(cases)('clicking %s shows toast with message and updates score', (id, message, countId) => {
    jest.isolateModules(() => require('./game'));
    document.getElementById(id).click();
    const toast = document.querySelector('.toast');
    expect(toast).not.toBeNull();
    expect(toast.textContent).toBe(message);
    expect(document.getElementById(countId).textContent).toBe('1');
  });

  test('flashes background when all buttons clicked', () => {
    jest.isolateModules(() => require('./game'));
    document.getElementById('giveBtn').click();
    document.getElementById('sarcasmBtn').click();
    document.getElementById('coffeeBtn').click();
    expect(document.body.classList.contains('celebrate')).toBe(true);
    jest.advanceTimersByTime(1000);
    expect(document.body.classList.contains('celebrate')).toBe(false);
  });
});
