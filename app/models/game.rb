class Game < ApplicationRecord
  belongs_to :user

  has_many :game_users, dependent: :destroy
  has_many :game_words, dependent: :destroy
  has_many :game_teams, dependent: :destroy

  validates :key_number, uniqueness: true
  # enum round: { describe: 1, mime: 2, one_word: 3 }

  before_save :generate_key, :set_round

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
    self.round = 0
  end
end
