module NotificationService
  
  def self.check_versions
    notify_about(current_download_version) unless last_notified_version == current_download_version
  end

  def self.send_notifications
    Tracker.active.each{|x| x.send_notifications}
  end
  
private

  def self.last_notified_version
    ActiveRecord::Base.connection.select_value "SELECT version FROM release_info"
  end
  
  def self.notify_about(version)
    return unless is_valid_release_version?(version)
    Tracker.active.each{|x| x.notify_about(version)}
    ActiveRecord::Base.connection.update "UPDATE release_info SET version = '#{version}'"
  end
  
end
