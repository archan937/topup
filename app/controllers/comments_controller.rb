class CommentsController < ApplicationController
  
  def index
    @comment = Comment.new
  end
  
  def show
    index
    render :action => "index"
  end
  
  def new
    @comment = Comment.new(params[:comment])
    @comment.valid? if params.include?(:comment)
    render :layout => false
  end
  
  def create
    (@comment = Comment.new(params[:comment])).save

    render :update do |page|
      if @comment.new_record?
        if params[:using_top_up]
          page << "TopUp.display('#{new_comment_path}', {parameters: '#{params[:comment].collect{|k, v| "comment[#{k}]=#{v}"}.join "&"}', effect: 'fade', shaded: 1, overlayClose: 1, resizable: 0})"
        else
          page[:error_messages].replace_html error_messages_for(:comment, :class => "box", :header_tag => "h3", :header_message => "Oops... Your comment couldn't be saved", :message => nil)
        end
      else
        Mailer.deliver_new_comment(@comment)
        if params[:using_top_up]
          page.redirect_to comment_path(@comment)
        else
          page[:error_messages].replace_html ""
          page.insert_html :bottom, "comments", :partial => "comment", :locals => {:comment => @comment, :index => Comment.count}
          page.form.reset "new_comment"
        end
      end
    end
  end
  
end