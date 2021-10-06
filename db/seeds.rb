# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
objective_titles = ["Read the documentation", "Write the basics", "Implement an sort algorithm", "Make a usable tool"]

objective_titles.each do |objective_title|
  objective = Objective.create(title: objective_title)
end
