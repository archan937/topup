# Include hook code here
ActionController::Base.send(:include, Jzip::Controller)
FileUtils.mkdir_p(Jzip::Plugin::TMP_DIR)