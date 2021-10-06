class Project < ApplicationRecord
  has_many :objectives, dependent: :destroy

  validates :name, presence: true
end
