class KeyResult < ApplicationRecord
  belongs_to :objective
  validates :title, presence: true
end
