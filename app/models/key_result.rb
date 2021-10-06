class KeyResult < ApplicationRecord
  include Weightable
  belongs_to :objective
  validates :title, presence: true
end
