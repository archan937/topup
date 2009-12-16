class Comment < ActiveRecord::Base
  include ActionView::Helpers::SanitizeHelper
  
  validates_presence_of :name, :message, :sign_up_as_tracker
  validates_format_of :email_address, :with => /\A[\w\.\-]+\@[\w\.\-]+\.[\w]+\Z/i
  
  before_create :generate_deletion_code
  before_save :sanitize_message
  after_create :deliver_notification
  
  attr_accessor :sign_up_as_tracker
  
  def generate_deletion_code
    self.deletion_code = random_hex(28)
    self.generate_deletion_code if Comment.find_by_deletion_code(self.deletion_code)
  end
  
  def sanitize_message
    self.message = sanitize self.message, :tags => %w(a abbr acronym blockquote code i strike strong u), :attributes => %w(href title)
  end
  
  def deliver_notification
    Mailer.deliver_new_comment(self)
  end
  
  def spam?
    self.message.match(/(^Very good site\. Thanks\!\,|^Nice site\. Thank you\.|^hi <a[^>]+>[^<\/]+<\/a>\s*$|http\:\/\/ui\-patterns\.com\/users\/\d+\#\d)/)
  end
  
end
