# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time
  layout "common", :except => :demonstrate

  # See ActionController::RequestForgeryProtection for details
  # Uncomment the :secret if you're not using the cookie session store
  protect_from_forgery # :secret => '8e923876552f2a6a79da1ee4a629c76c'
  
  # See ActionController::Base for details 
  # Uncomment this to filter the contents of submitted sensitive data parameters
  # from your application log (in this case, all fields with names like "password"). 
  # filter_parameter_logging :password

  def demonstrate
    # respond_to do |format|
    #   format.html {
    # 
    #   }
    # end
    render :update do |page|
      page.call "TopUp.display", params[:reference], params[:toptions].reject{|key, value| key == "type" and value == "auto"}
    end
  end
  
end
