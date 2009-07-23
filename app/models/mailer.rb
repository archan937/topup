class Mailer < ActionMailer::Base
  
  def new_comment(comment)
    @recipients      = "paul.engel@holder.nl"
    @from            = "GetTopUp.com <no-reply@gettopup.com>"
    @subject         = "New comment posted"
    @body["comment"] = comment
  end

end
