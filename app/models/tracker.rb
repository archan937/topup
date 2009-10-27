class Tracker < ActiveRecord::Base
  serialize :tracked_versions, Hash
  
  validates_presence_of :name
  validates_format_of :email_address, :with => /\A[\w\.\-]+\@[\w\.\-]+\.[\w]+\Z/i
  
  before_create :generate_unsubscription_code
  
  named_scope :active, :conditions => "is_inactive IS NULL OR is_inactive != 1"
  
  def generate_unsubscription_code
    self.unsubscription_code = random_hex(28)
    self.generate_unsubscription_code if Tracker.find_by_unsubscription_code(self.unsubscription_code)
  end
  
  def notify_about(version)
    return if is_inactive
    if is_valid_release_version?(version)
      (self.tracked_versions ||= {})[version] ||= false
      save
    end
    send_notifications
  end
  
  def send_notifications
    return if is_inactive
    unless (unnotified = unnotified_versions).empty?
      unnotified.each{|x| tracked_versions[x] = true} if Mailer.deliver_release_notifications(self)
      save
    end
  end
  
  def unnotified_changelog
    return if is_inactive
    unnotified = unnotified_versions
    CHANGELOG.collect{|k, v| (v if unnotified.include?(k))}.compact.join.strip
  end
  
private
  
  def unnotified_versions
    tracked_versions.collect{|k, v| (k unless v)}.compact
  end
  
end
