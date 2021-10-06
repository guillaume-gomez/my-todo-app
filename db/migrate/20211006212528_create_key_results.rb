class CreateKeyResults < ActiveRecord::Migration[5.2]
  def change
    create_table :key_results do |t|
      t.string :title
      t.belongs_to :objective, index: true
      t.timestamps
    end
  end
end
