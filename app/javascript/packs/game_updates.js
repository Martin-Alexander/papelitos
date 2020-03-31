import { csrfToken } from '@rails/ujs';

const increaseScrore = document.getElementById('increase-score');
const currentWord    = document.querySelector('#current-word');
const teamPlaying    = document.querySelector('#team-playing');
const whoIsPlaying   = document.querySelector('#who-is-playing');
const activePlayer   = document.querySelector('#active-player');
const inactivePlayer = document.querySelector('#inactive-player');
const secondsLeft    = document.querySelector('#seconds-left');
const teamOnePoints  = document.querySelector('#team-1-points');
const teamTwoPoints  = document.querySelector('#team-2-points');
const roundName      = document.querySelector('#round-name');
const gameState      = document.getElementById('game-state');

if (gameState) {
  const gameId = gameState.dataset.gameId;
  const gameTeamId = gameState.dataset.gameTeam;
  let gameWords = JSON.parse(gameState.dataset.gameWords);

  setInterval(() => {
    fetch(`/games/${gameId}`, {
      method : 'get',
      headers: {
        'X-CSRF-Token': csrfToken(),
        credentials   : 'same-origin',
        Accept        : 'application/json'
      }
    })
    .then(response => response.json())
    .then((data) => {
      if (teamPlaying) teamPlaying.innerHTML = data.team_playing;

      if (data.you_are_playing) {
        activePlayer.style.display = "initial";
        inactivePlayer.style.display = "none";
      } else {
        activePlayer.style.display = "none";
        inactivePlayer.style.display = "initial";
      }

      secondsLeft.innerHTML = data.seconds_left;
      teamOnePoints.innerHTML = data.team_1_points;
      teamTwoPoints.innerHTML = data.team_2_points;
      roundName.innerHTML = data.round_name;
      whoIsPlaying.innerHTML = data.who_is_playing;
    });
  }, 1000);

  currentWord.innerHTML = gameWords[0];

  if (increaseScrore) {
    increaseScrore.addEventListener('click', () => {
      if (gameWords.length > 0) {
        const completedWord = gameWords.shift();
        const nextWord = gameWords[0];
        
        fetch(`/game_teams/${gameTeamId}`, {
          method : 'PATCH',
          headers: {
            'X-CSRF_TOKEN': csrfToken(),
            credentials   : 'same-origin',
            Accept        : 'application/json',
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            roundOver: nextWord === undefined,
            completedWord: completedWord
          })
        });

        if (nextWord) {
          currentWord.innerHTML = nextWord;
        } else {
          activePlayer.style.display = "none";
          inactivePlayer.style.display = "initial";
          gameWords = JSON.parse(gameState.dataset.gameWords);
          currentWord.innerHTML = gameWords[0];
        }
      }
    });
  }
}

