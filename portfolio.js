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
// Native dialogs retain keyboard focus and support Escape without a framework.
const gameDialog = document.getElementById('game-dialog');
document.querySelectorAll('[data-open-game]').forEach(button => button.addEventListener('click', () => gameDialog.showModal()));
document.getElementById('open-guide').addEventListener('click', () => document.getElementById('guide-dialog').showModal());
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => document.getElementById(button.dataset.close).close()));
document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => { if(event.target === dialog) { const r=dialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close(); }}));
document.getElementById('contact-form').addEventListener('submit', event => {
  event.preventDefault(); const fields = new FormData(event.currentTarget);
  const subject = `Portfolio enquiry from ${fields.get('name')}`;
  const body = `Hello Ankit,\n\n${fields.get('message')}\n\n${fields.get('name')}\n${fields.get('email')}`;
  window.location.href = `mailto:kallurayaankit@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
let ticking=false;
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{const range=document.documentElement.scrollHeight-innerHeight;document.getElementById('scroll-player').style.top=`${Math.min(95,Math.max(3,range>0?scrollY/range*92+3:3))}%`;ticking=false;});ticking=true;}},{passive:true});
