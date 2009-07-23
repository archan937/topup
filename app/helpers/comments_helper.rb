module CommentsHelper
  
  def comments
    @comments ||= Comment.find :all, :order => "created_at"
  end
  
end