Game.destroy_all

bob   = User.find_or_create_by!(name: "Bob",   email: "bob@email.com")   { |user| user.password = "123456"}
sally = User.find_or_create_by!(name: "Sally", email: "sally@email.com") { |user| user.password = "123456"}
betty = User.find_or_create_by!(name: "Betty", email: "betty@email.com") { |user| user.password = "123456"}
john  = User.find_or_create_by!(name: "John",  email: "john@email.com")  { |user| user.password = "123456"}

game = Game.create!(user: bob)
team_one = GameTeam.create!(game: game, score: 0, active: true)
team_two = GameTeam.create!(game: game, score: 0)

GameUser.create!(user: bob,   game: game, game_team_id: team_one.id, active: true)
GameUser.create!(user: sally, game: game, game_team_id: team_one.id)
GameUser.create!(user: betty, game: game, game_team_id: team_two.id, active: true)
GameUser.create!(user: john,  game: game, game_team_id: team_two.id)

GameWord.create(name: "Bad Dancer",          game: game)
GameWord.create(name: "Construction Worker", game: game)
GameWord.create(name: "Butterfly",           game: game)
GameWord.create(name: "Areoplane",           game: game)
GameWord.create(name: "Chocolate Cookie",    game: game)

puts "Game ready at localhost:3000/games/#{game.id}"