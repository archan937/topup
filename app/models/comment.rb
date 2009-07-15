class Comment < ActiveRecord::Base
  include ActionView::Helpers::SanitizeHelper
  
  validates_presence_of :name, :message
  validates_format_of :email_address, :with => /\A[\w\.\-]+\@[\w\.\-]+\.[\w]+\Z/i
  
  before_save :sanitize_message
  
  def sanitize_message
    self.message = sanitize self.message, :tags => %w(a abbr acronym blockquote code i strike strong u), :attributes => %w(href title)
  end
end
