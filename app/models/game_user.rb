class GameUser < ApplicationRecord
  belongs_to :game
  belongs_to :user
  belongs_to :game_team

  validates_uniqueness_of :user, :scope => [:game]

  before_create :set_order

  def set_order
    # For all teammates, order them by 'order', and select the last one
    team_mate_with_highest_order = game_team.game_users.order(:order).last

    if team_mate_with_highest_order
      # You're 'order' is one greater than the highest 'order' of your team mates
      self.order = team_mate_with_highest_order.order + 1
    else
      # You're the first team mate so your 'order' is 0
      self.order = 0
    end
  end
end
