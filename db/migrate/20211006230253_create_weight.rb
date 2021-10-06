class CreateWeight < ActiveRecord::Migration[5.2]
  def change
    create_table :weights do |t|
      t.integer :percentage
      t.references :weightable, polymorphic: true, index: true
      t.timestamps
    end
  end
end
