module ExamplesHelper
  
  def block(&block)
    concat render(:partial => "examples/block", :locals => {:content => capture(&block)}), block.binding
  end
  
  def method(example)
    example[:filename].gsub(/(^[\d\.\s]+|\.html)/, "")
  end
  
  def description(example)
    example[:content].css("#description").inner_html
  end
  
  def demo(example, purpose)
    example[:content].css("#demo").inner_html.
                      gsub("thumbnails", "/examples/#{purpose}/thumbnails").
                      gsub("photos", "/examples/#{purpose}/photos").
                      gsub("id=\"examples\"", "id=\"#{[purpose, example[:title], "examples"].join(" ").gsub(/[^\w]/, "_")}\"".squeeze("_").downcase).
                      gsub("#examples", "##{[purpose, example[:title], "examples"].join(" ").gsub(/[^\w]/, "_")}".squeeze("_").downcase)
  end
  
  def code(example)
    content_tag :pre, html_escape(render(:partial => "examples/code", :locals => {:html => example[:content].css("#demo").inner_html.collect{|x| x.gsub(/^\s\s\s/, "")}})).reject{|x| x.blank?}
  end
  
end