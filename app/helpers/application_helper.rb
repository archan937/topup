# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  
  def page_title
    section = controller.action_name == "index" ?
                begin
                  name = controller.controller_name.gsub("Controller", "").capitalize
                  name == "Application" ? "Home" : name
                end :
                controller.action_name.capitalize
    
    "The #1 Javascript Pop Up / Lightbox - Get TopUp! - #{section}"
  end
  
  def menu_items
    %w(home documentation examples demo comments changelog tweets)
  end
  
  def h1(text, add_anchor = true)
    text_tag(:h1, text, add_anchor)
  end
  
  def h2(text, add_anchor = true)
    text_tag(:h2, text, add_anchor)
  end
  
  def span(text)
    text_tag(:span, text, false)
  end
  
  def text_tag(tag, text, add_anchor)
    [
      (content_tag(:a , nil , :name  => css_classify(text)) if add_anchor), 
      (content_tag(tag, text, :class => "sprite #{css_classify(text)}"))
    ].compact.join
  end
  
  def css_classify(text)
    text.gsub(".", "").split(/[^\w]/).join("_").underscore.gsub(/\d+_/, "")
  end
  
end
