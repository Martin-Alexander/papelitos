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
const skipButton     = document.getElementById('skip-button');

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

  // first word is the first one in the array
  currentWord.innerHTML = gameWords[0];

  increaseScrore.addEventListener('click', () => {
    if (gameWords.length > 0) {
      gameWords.shift(); // remove the last word from the array (`unshift` removes the element at the start of the array)
      const nextWord = gameWords[0]; // the next word is the next first one
      const roundOver = nextWord === undefined // if there is no next word then that means the round is over

      fetch(`/game_teams/${gameTeamId}`, {
        method : 'PATCH',
        headers: {
          'X-CSRF_TOKEN': csrfToken(),
          credentials   : 'same-origin',
          Accept        : 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          roundOver: roundOver,
          givePoint: true
        })
      });

      if (nextWord) {
        // if there is a next word display it
        currentWord.innerHTML = nextWord;
      } else {
        // if there isn't (that means the rounds over)...
        // swap displays so that they player sees the 'non-player' view
        activePlayer.style.display = "none";
        inactivePlayer.style.display = "initial";

        // and reset their words for next time
        gameWords = JSON.parse(gameState.dataset.gameWords);
        currentWord.innerHTML = gameWords[0];
      }
    }
  });

  skipButton.addEventListener('click', () => {
    // if they clicked skip it's the same logic for going to the next word
    if (gameWords.length > 0) {
      gameWords.shift();
      const nextWord = gameWords[0];

      if (nextWord) {
        currentWord.innerHTML = nextWord;
      } else {
        // if that was the last word, we need to tell the server that we should go to the next round
        activePlayer.style.display = "none";
        inactivePlayer.style.display = "initial";

        fetch(`/game_teams/${gameTeamId}`, {
          method : 'PATCH',
          headers: {
            'X-CSRF_TOKEN': csrfToken(),
            credentials   : 'same-origin',
            Accept        : 'application/json',
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            roundOver: true,
            givePoint: false // telling the server that they shouldn't get a point
          })
        });

        gameWords = JSON.parse(gameState.dataset.gameWords);
        currentWord.innerHTML = gameWords[0];
      }
    }
  });
}

