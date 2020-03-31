class AddSecondsLeftToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :seconds_left, :integer, default: 60
  end
end
