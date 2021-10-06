class Objective < ApplicationRecord
  has_many :key_results, dependent: :destroy
  validates :title, presence: true

  accepts_nested_attributes_for :key_results
end
