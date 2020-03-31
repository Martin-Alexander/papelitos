namespace :game_timers do
  task start: :environment do
    loop do
      Game.all.each do |game|
        game.update(seconds_left: game.seconds_left - 1);

        if game.seconds_left <= 0
          game.next_round!
        end

        sleep 1
      end
    end
  end
end
