class GameTeamsController < ApplicationController
  def update
    @game_team = GameTeam.find(params[:id])
    if params[:givePoint]
      @game_team.update(score: @game_team.score + 1)
    end

    if params[:roundOver]
      @game_team.game.next_round!
    end
  end
end
