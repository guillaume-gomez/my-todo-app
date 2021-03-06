# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_10_06_230253) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "key_results", force: :cascade do |t|
    t.string "title"
    t.bigint "objective_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["objective_id"], name: "index_key_results_on_objective_id"
  end

  create_table "objectives", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "weights", force: :cascade do |t|
    t.integer "percentage"
    t.string "weightable_type"
    t.bigint "weightable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["weightable_type", "weightable_id"], name: "index_weights_on_weightable_type_and_weightable_id"
  end

end
