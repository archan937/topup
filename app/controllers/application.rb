# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time
  layout "common", :except => [:order, :issue]

  # See ActionController::RequestForgeryProtection for details
  # Uncomment the :secret if you're not using the cookie session store
  protect_from_forgery # :secret => '8e923876552f2a6a79da1ee4a629c76c'
  
  # See ActionController::Base for details 
  # Uncomment this to filter the contents of submitted sensitive data parameters
  # from your application log (in this case, all fields with names like "password"). 
  # filter_parameter_logging :password

  def ajax
    respond_to do |format|
      format.html {
        # render :update do |page|
        #   page.alert("Format is HTML")
        # end
        
        # render :text => "Format is HTML"
        
        render :action => "issue"
      }
      format.js {
        render :update do |page|
          page.alert("Format is JS")
        end
      }
    end
  end
  
end
