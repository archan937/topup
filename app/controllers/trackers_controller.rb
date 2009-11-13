class TrackersController < ApplicationController
  
  def new
    @tracker = Tracker.new(params[:tracker])
    @tracker.valid? if params.include?(:tracker)
    
    render :layout => !request.xhr?
  end
  
  def create
    (@tracker = Tracker.new(params[:tracker])).save

    render :update do |page|
      if @tracker.new_record?
        if params[:using_top_up]
          page << "TopUp.display('#{new_tracker_path}', {parameters: '#{params[:tracker].collect{|k, v| "tracker[#{k}]=#{v}"}.join "&"}', effect: 'fade', shaded: 1, overlayClose: 1, resizable: 0})"
        else
          page[:error_messages].replace_html error_messages_for(:tracker, :class => "box", :header_tag => "h3", :header_message => "Oops... You aren't subscribed yet", :message => nil)
        end
      else
        if params[:using_top_up]
          page.call "TopUp.close"
        else
          page.redirect_to root_path
        end
      end
    end
  end
  
  def unsubscribe
    tracker = Tracker.find_by_unsubscription_code(params[:unsubscription_code])
    tracker.update_attribute(:is_inactive, true) unless tracker.nil?
    redirect_to root_path
  end
  
  def service_info
    render :layout => !request.xhr?
  end
  
end