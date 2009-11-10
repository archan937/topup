class TrackersController < ApplicationController
  
  def new
    @tracker = Tracker.new(params[:tracker])
    @tracker.valid? if params.include?(:tracker)
    render :layout => false
  end
  
  def create
    (@tracker = Tracker.new(params[:tracker])).save

    render :update do |page|
      if @tracker.new_record?
        page << "TopUp.display('#{new_tracker_path}', {parameters: '#{params[:tracker].collect{|k, v| "tracker[#{k}]=#{v}"}.join "&"}', effect: 'fade', shaded: 1, overlayClose: 1, resizable: 0})"
      else
        page.call "TopUp.close"
      end
    end
  end
  
  def unsubscribe
    tracker = Tracker.find_by_unsubscription_code(params[:unsubscription_code])
    tracker.update_attribute(:is_inactive, true) unless tracker.nil?
    redirect_to root_path
  end
  
  def service_info
    render :layout => false
  end
  
end