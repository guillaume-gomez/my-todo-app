class CreateObjectives < ActiveRecord::Migration[5.2]
  def change
    create_table :objectives do |t|
      t.string :title
      t.belongs_to :project
      t.timestamps
    end
  end
end
