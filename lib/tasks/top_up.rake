namespace :top_up do
  desc "Export Top up for external usage"
  task :export, :version do |task, args|
    if args[:version].blank?
      raise "usage: rake top_up:export[version]" 
    end
    
    require "action_controller"
    require "action_view"
    require "application"
    
    ActionController::Base.append_view_path File.join(RAILS_ROOT, "app", "views")
    
    timestamp = Time.now
    variables = [{:name => "style",  :files => %w(style dashboard/style quicklook/style)},
                 {:name => "ff2fix", :files => %w(ff2fix)},
                 {:name => "ie6fix", :files => %w(ie6fix dashboard/ie6fix quicklook/ie6fix)},
                 {:name => "iefix",  :files => %w(iefix)}].collect{ |variable|
      
      value = variable[:files].collect{ |file|
        file = "public/stylesheets/top_up/#{file}.css"
        code = File.open(file).readlines.join(" ").gsub("/images/top_up/", "' + images_url + '")
      }.join(" ")
      {:name => variable[:name], :value => "<style type=\"text/css\" media=\"screen\">#{value}</style>"}

    }
    variables << {:name => "html", :value => ActionView::Base.new(Rails::Configuration.new.view_path).render(:partial => "layouts/top_up")}

    variables.each{|variable| variable[:regexp] = Regexp.new("^\\s*var #{variable[:name]} = '.*'\;$")}
    javascript = File.open("public/javascripts/top_up.js").readlines.collect{ |line|
      index = nil
      variables.each_with_index{|variable, i| index = i if line.match variable[:regexp]}
      
      if index.nil?
        line.match("// *") ? line.gsub("{version}", args[:version]).gsub("{year}", timestamp.year.to_s).gsub("{date}", timestamp.strftime("%Y-%m-%d %H:%M:%S +0100 (%a, %d %B %Y)")) : line
      else
        variable = variables.delete_at(index)
        "		var #{variable[:name]} = '#{variable[:value].gsub(/\s+/, " ").gsub("> <", "><").strip}';"
      end
    }
    
    FileUtils.rm_r("assets/export") if File.exists?("assets/export")
    FileUtils.mkdir_p("assets/export")
    
    File.open("assets/export/top_up.js", "w").puts(javascript)
    FileUtils.cp_r("public/images/top_up", "assets/export")
  end
end