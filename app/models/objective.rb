class Objective < ApplicationRecord
  include Weightable
  has_many :key_results, dependent: :destroy
  validates :title, presence: true

  accepts_nested_attributes_for :key_results
end
