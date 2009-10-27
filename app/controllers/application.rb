# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time

  # See ActionController::RequestForgeryProtection for details
  # Uncomment the :secret if you're not using the cookie session store
  protect_from_forgery # :secret => '8e923876552f2a6a79da1ee4a629c76c'
  
  # See ActionController::Base for details 
  # Uncomment this to filter the contents of submitted sensitive data parameters
  # from your application log (in this case, all fields with names like "password"). 
  # filter_parameter_logging :password

  def demonstrate
    render :update do |page|
      toptions = {"preset" => "demo"}.merge(params[:toptions].reject{|key, value| key == "type" and value == "auto"})
      page << "TopUp.display('#{params[:reference]}', {#{toptions.collect{|key, value| "#{key}: #{%w(ondisplay onclose).include?(key) ? value : "'#{value}'"}"}.join(", ")}})"
    end
  end
  
end
