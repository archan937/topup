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
    
    render :layout => !request.xhr?
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
        if @comment.spam?
          @comment.destroy
        else
          Tracker.new({:name => @comment.name, :email_address => @comment.email_address}).save if @comment.sign_up_as_tracker.to_i == 1
        end
        if params[:using_top_up]
          page.redirect_to comment_path(@comment)
        else
          page << "if (jQuery('#comments').length) {"
          page[:error_messages].replace_html ""
          page.insert_html :bottom, "comments", :partial => "comment", :locals => {:comment => @comment, :index => Comment.count} unless @comment.frozen?
          page.form.reset "new_comment"
          page << "} else {"
          page.redirect_to comment_path(@comment)
          page << "}"
        end
      end
    end
  end
  
  def delete
    comment = Comment.find_by_deletion_code(params[:deletion_code])
    comment.destroy if comment
    redirect_to comments_path
  end
  
end