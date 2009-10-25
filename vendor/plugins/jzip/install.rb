# Install hook code here

puts "Installing 'defaults' Jzip template..."
FileUtils.mkdir_p(template_dir = File.join(RAILS_ROOT, "assets", "jzip"))
File.open(File.join(template_dir, "defaults.jz"), "w") do |f|
  f.write("\n//= require /defaults\n") 
end
puts "Done"
