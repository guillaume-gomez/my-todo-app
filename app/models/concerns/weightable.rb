module Weightable
  extend ActiveSupport::Concern

  included do
    has_one :weight, :as => :weightable
  end
end