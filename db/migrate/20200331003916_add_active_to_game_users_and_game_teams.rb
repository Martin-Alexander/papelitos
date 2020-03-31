class AddActiveToGameUsersAndGameTeams < ActiveRecord::Migration[6.0]
  def change
    add_column :game_users, :active, :boolean, default: false
    add_column :game_teams, :active, :boolean, default: false
  end
end
