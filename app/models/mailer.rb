class Mailer < ActionMailer::Base
  
  def new_comment(comment)
    @recipients      = "paul.engel@holder.nl"
    @from            = "GetTopUp.com <no-reply@gettopup.com>"
    @subject         = "New comment posted"
    @body["comment"] = comment
  end
  
  def release_notifications(tracker)
    @recipients      = RAILS_ENV == "development" ? "paul.engel@holder.nl" : tracker.email_address
    @from            = "GetTopUp.com <no-reply@gettopup.com>"
    @subject         = "New TopUp version released"
    @body["tracker"] = tracker
  end

end
