class Weight < ApplicationRecord
    belongs_to :weightable, polymorphic: true
end
