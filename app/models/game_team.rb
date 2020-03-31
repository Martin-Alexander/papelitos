class GameTeam < ApplicationRecord
  belongs_to :game

  has_many :game_users, dependent: :destroy
  has_many :users, through: :game_users
end
