class CommentsController < ApplicationController
  
  def index
    @comment = Comment.new
  end
  
  def new
    @comment = Comment.new(params[:comment])
    @comment.valid? if params.include?(:comment)
    render :layout => false
  end
  
  def create
    respond_to do |format|
      format.html {
        render :action => "index"
      }
      format.js {
        render :update do |page|
          unless (@comment = Comment.new(params[:comment])).save
            page << "TopUp.display('#{new_comment_path}', {parameters: '#{params[:comment].collect{|k, v| "comment[#{k}]=#{v}"}.join "&"}', effect: 'fade', shaded: 1, overlayClose: 1, resizable: 0})"
          else
            page.redirect_to comments_path
          end
        end
      }
    end
  end
  
end