# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  
  def h1(text)
    text_tag(:h1, text)
  end
  
  def h2(text)
    text_tag(:h2, text)
  end
  
  def span(text)
    text_tag(:span, text)
  end
  
  def text_tag(tag, text)
    content_tag(tag, text, :style => "background-image: url(/images/text/#{tag}-#{text.gsub(".", "").split(/[^\w]/).join("_").underscore}.jpg)")
  end
  
end
