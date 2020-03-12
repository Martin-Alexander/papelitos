class Game < ApplicationRecord
  belongs_to :user

  has_many :game_users
  has_many :game_words
  has_many :game_teams

  validates :key_number, uniqueness: true
  enum round: { pending: 0, describe: 1, mime: 2, one_word: 3 }
end