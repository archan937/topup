class CommentsController < ApplicationController
  
  def index
    @comment = Comment.new
  end
  
  def create
    (@comment = Comment.new(params[:comment])).save
    render :action => "index"
  end
  
end