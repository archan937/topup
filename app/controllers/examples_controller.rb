class ExamplesController < ApplicationController
  require "nokogiri"
  
  def index
    @purposes = Dir.glob(File.join("public", "examples", "**", "*")).inject(ActiveSupport::OrderedHash.new) do |h, x|
                  dir, file = x.gsub(File.join("public", "examples", ""), "").split(File::SEPARATOR)
                  if file and file.match(/(README|.html)/)
                    h[dir] ||= {:description => "", :examples => []}
                    content  = File.readlines(File.join("public", "examples", dir, file))
                    file == "README" ?
                      h[dir][:information] = content :
                      h[dir][:examples] << {:filename => file, :raw_content => content.join(""), :html => Nokogiri::HTML(content.join(""))}
                  end
                  h
                end.reject{|k, v| v[:examples].empty?}
  end
  
end