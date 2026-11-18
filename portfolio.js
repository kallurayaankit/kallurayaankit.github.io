'use strict';
const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('[data-category]');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let visible = 0;
  cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; if (!card.hidden) visible++; });
  document.getElementById('filter-status').textContent = `${visible} projects shown.`;
}));
const start = document.getElementById('start-game');
const game = document.getElementById('game');
const question = document.getElementById('game-question');
const options = document.getElementById('game-options');
const feedback = document.getElementById('game-feedback');
function beginGame() {
  start.hidden = true; game.hidden = false;
  question.textContent = 'A checkout totals $100. A 10% discount is applied. Which result is the regression?';
  feedback.textContent = '';
  options.replaceChildren();
  [['$90 total, $10 discount', false], ['$100 total, $10 discount shown', true], ['$90 total, discount applied once', false]].forEach(([label, bug]) => {
    const button = document.createElement('button'); button.textContent = label;
    button.addEventListener('click', () => {feedback.textContent = bug ? '✓ Found it. The UI says “discount”, but the total never changed. Test the outcome, not just the label.' : 'That result is consistent. Look for a discount that changes the label without changing the total.';});
    options.append(button);
  });
  options.querySelector('button').focus();
}
start.addEventListener('click', beginGame);
document.getElementById('game-reset').addEventListener('click', () => {game.hidden = true; start.hidden = false; start.focus();});
