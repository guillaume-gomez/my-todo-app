class Objective < ApplicationRecord
  belongs_to :project
  validates :title, presence: true
end
