class ExamplesController < ApplicationController
  
  def index
    @examples = Dir.glob(File.join("public", "examples", "**", "*")).inject(ActiveSupport::OrderedHash.new) do |h, x|
                  dir, file = x.gsub(File.join("public", "examples", ""), "").split(File::SEPARATOR)
                  if file and file.match(/(README|.html)/)
                    h[dir] ||= {:description => "", :examples => []}
                    content  = File.readlines(File.join("public", "examples", dir, file))
                    file == "README" ?
                      h[dir][:description] = content :
                      h[dir][:examples] << {:title => file, :code => content.join("")}
                  end
                  h
                end.reject{|k, v| v[:examples].empty?}
  end
  
end