module ExamplesHelper
  
  def block(&block)
    concat render(:partial => "examples/block", :locals => {:content => capture(&block)}), block.binding
  end
  
  def title(example)
    example[:title].gsub(/(^[\d\.\s]+|\.html)/, "")
  end
  
  def info(example)
    first = example[:code]. index("<p>")
    last  = example[:code].rindex("</p>") - 1
    example[:code][first..last]
  end
  
  def demo(title, example)
    example[:code].gsub(/^.*\<body\>\s*/m, "").
                   gsub(/\s*\<\/body\>.*/m, "").
                   gsub(/\<p\>.*\<\/p\>/m, "").
                   gsub("thumbnails", "/examples/#{title}/thumbnails").
                   gsub("photos", "/examples/#{title}/photos").
                   gsub("id=\"examples\"", "id=\"#{[title, example[:title], "examples"].join(" ").gsub(/[^\w]/, "_")}\"".squeeze("_").downcase).
                   gsub("#examples", "##{[title, example[:title], "examples"].join(" ").gsub(/[^\w]/, "_")}".squeeze("_").downcase)
  end
  
  def demo_code(example)
    content_tag(:pre, html_escape(example[:code].gsub(/\<p\>.*\<\/p\>/m, "")).split("\n").reject{|x| x.blank?}.join("\n"))
  end
  
end