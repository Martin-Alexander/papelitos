// import { csrfToken } from "@rails/ujs";

// const teamOnePlayers = document.querySelector("#team-1-players");
// const teamTwoPlayers = document.querySelector("#team-2-players");

// const gameId = document.querySelector("#game-id").dataset.gameId;
// setInterval(() => {
//   fetch(`/games/${gameId}/game_users`, {
//     method: "get",
//     headers: {
//       "X-CSRF-Token": csrfToken(),
//       "credentials": 'same-origin',
//       "Accept": "application/json"
//     }
//   })
//     .then(response => response.json())
//     .then((data) => {
//       // console.log(data);
//       const teamOneHTML = data.team_1_players.map((player) => `<li>${player}</li>`).join("")
//       const teamTwoHTML = data.team_2_players.map((player) => `<li>${player}</li>`).join("")
//       if (teamOnePlayers) teamOnePlayers.innerHTML = teamOneHTML;
//       if (teamTwoPlayers) teamTwoPlayers.innerHTML = teamTwoHTML;
//     });
// }, 1000);









