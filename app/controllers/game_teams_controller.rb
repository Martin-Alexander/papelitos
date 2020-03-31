class GameTeamsController < ApplicationController
  def update
    @game_team = GameTeam.find(params[:id])
    @game_team.update(score: @game_team.score + 1)

    if params[:roundOver]
      @game_team.game.next_round!
    end
  end
end
