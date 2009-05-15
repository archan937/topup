# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  
  def include_src_for(file)
    RAILS_ENV == "production" ?
      "/releases/#{file unless file == "top_up"}/latest/#{file}-min".squeeze("/") :
      file
  end
  
end
