# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  
  def page_title
    section = controller.action_name == "index" ?
                begin
                  name = controller.controller_name.gsub("Controller", "").capitalize
                  name == "Application" ? "Home" : name
                end :
                controller.action_name.capitalize
    
    "The #1 Javascript Pop Up - Get TopUp! - #{section}"
  end
  
  def menu_items
    %w(home documentation examples demo comments)
  end
  
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
    content_tag(tag, text, :class => "sprite #{text.gsub(".", "").split(/[^\w]/).join("_").underscore.gsub(/\d+_/, "")}")
  end
  
end
