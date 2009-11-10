module ExamplesHelper
  
  def block(&block)
    concat render(:partial => "examples/block", :locals => {:content => capture(&block)}), block.binding
  end
  
  def method(example)
    example[:filename].gsub(/(^[\d\.\s]+|\.html)/, "")
  end
  
  def description(example)
    example[:html].css("#description").inner_html
  end
  
  def demo(example, purpose)
    example[:html].css("#demo").inner_html.
                                gsub("thumbnails", "/examples/#{purpose}/thumbnails").
                                gsub("photos", "/examples/#{purpose}/photos").
                                gsub("id=\"examples\"", "id=\"#{[purpose, example[:title], "examples"].join(" ").gsub(/[^\w]/, "_")}\"".squeeze("_").downcase).
                                gsub("#examples", "##{[purpose, example[:title], "examples"].join(" ").gsub(/[^\w]/, "_")}".squeeze("_").downcase)
  end
  
  def code(example)
    content = html_escape(example[:raw_content].gsub(/<title>.*<\/title>/m, "").
                                                gsub(/<link.*css"\/>/m, "").
                                                gsub(/<body>.*<div id="description">/m, '<body><div id="description">').
                                                gsub(/<div id="description">.*<div id="demo">/m, "").
                                                gsub(/<\/div>\s*<\/div>\s+<\/div>\s+<\/body>$/m, "</body>").reject{|x| x.blank?})
    content_tag :pre, content, :style => "*height: #{(content.split("\n").size * 16.56) + 11.5}px"
  end
  
end