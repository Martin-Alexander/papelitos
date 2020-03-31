class User < ApplicationRecord
  has_one_attached :photo
  has_many :game_users, dependent: :destroy
  has_many :game_teams, through: :game_users
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
