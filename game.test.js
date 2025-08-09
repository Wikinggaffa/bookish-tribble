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
    `;
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const cases = [
    ['giveBtn', 'You gave a gift!'],
    ['sarcasmBtn', 'Sarcasm deployed!'],
    ['coffeeBtn', 'Coffee purchased!'],
  ];

  test.each(cases)('clicking %s shows toast with message', (id, message) => {
    jest.isolateModules(() => require('./game'));
    document.getElementById(id).click();
    const toast = document.querySelector('.toast');
    expect(toast).not.toBeNull();
    expect(toast.textContent).toBe(message);
  });
});
