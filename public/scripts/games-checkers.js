// GAME TYPE SELECTION
// game type buttons
const checkersClassic = document.getElementById('checkers-classic');
const checkers100 = document.getElementById('checkers-10x10');
// html content
const title = document.getElementById('game-title');
const action = document.getElementById('form');

checkersClassic.addEventListener('click', () => {
  title.textContent = 'Checkers classic';
  action.setAttribute('action', '/games/checkers-classic-lobby');
});

checkers100.addEventListener('click', () => {
  title.textContent = 'Checkers 10x10';
  action.setAttribute('action', '/games/checkers-100-lobby');
});