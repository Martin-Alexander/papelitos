class GameUsersController < ApplicationController
  def index
   @game = Game.find(params[:game_id])
      respond_to do |format|
        # if the browser requested HTML then render HTML response -> app/views/game_users/index.html.erb
        format.html do
          @game_users = GameUser.all
          @game_teams = GameTeam.all
        end
        # if the browser requested JSON then send back JSON
        format.json do
        team_1_players = @game.game_teams.first.users.pluck(:name)
        team_2_players = @game.game_teams.second.users.pluck(:name)
        render json: {
          team_1_players: team_1_players,
          team_2_players: team_2_players
        }
        end
      end
  end

  def create
    @game_user = GameUser.new
    @game = Game.find_by_key_number(params[:key_number])
    @game_user.game = @game
    @game_user.user = current_user
    @game_users = @game.game_users
    if @game_users.count.even?
      @game_user.game_team = @game.game_teams.first
    else
      @game_user.game_team = @game.game_teams.second
    end

    if @game_user.game_team.game_users.count == 1
      @game_user.active = true
    end

    if @game_user.save
      redirect_to new_game_game_word_path(@game.id)
    else
      redirect_to root_path, flash: { alo: "Player already joined!" }
    end
  end
end

