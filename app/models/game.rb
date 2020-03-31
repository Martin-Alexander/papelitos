class Game < ApplicationRecord
  belongs_to :user

  has_many :game_users, dependent: :destroy
  has_many :game_words, dependent: :destroy
  has_many :game_teams, dependent: :destroy

  validates :key_number, uniqueness: true
  enum round: { describe: 1, mime: 2, one_word: 3 }

  before_create :generate_key, :set_round

  def next_round!
    team_that_just_went = game_teams.find_by(active: true)
    next_up_team = game_teams.find_by(active: false)

    team_that_just_went.update(active: false)
    next_up_team.update(active: true)

    player_that_just_went = team_that_just_went.game_users.find_by(active: true)
    player_that_just_went.update(active: false)

    next_up_player = team_that_just_went.game_users.find_by("game_users.order > ?", player_that_just_went.order)

    if next_up_player.nil?
      next_up_player = team_that_just_went.game_users.find_by(order: 0)
    end

    next_up_player.update(active: true)
    self.update(seconds_left: 60, round: next_round)
  end

  def generate_words_array
    self.game_words.map { |game_word| game_word.name }.shuffle
  end

  def generate_players_array
    self.game_users.map { |game_users| game_users.user.name }
  end

  private

  def generate_key
    result = rand(1000..9999)
    self.assign_attributes(key_number: result)
  end

  def set_round
    self.round = :describe
  end

  def next_round
    case self.round
    when "describe" then "mime"
    when "mime" then "one_word"
    else
      "describe"
    end
  end
end
