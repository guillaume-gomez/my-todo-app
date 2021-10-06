# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
project_names = ["Learn Ruby", "Learn React", "Learn Typescript"]
objective_titles = ["Read the documentation", "Write the basics", "Implement an sort algorithm", "Make a usable tool"]

project_names.each do |project_name|
  project = Project.create(name: project_name)
  objective_titles.each do |objective_title|
    objective = project.objectives.create(title: objective_title)
  end
end