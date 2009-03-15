namespace :top_up do
  desc "Release Top up for external usage"
  task :release, :version do |task, args|
    if args[:version].blank?
      raise "usage: rake top_up:release[version]" 
    end
    
    require "action_controller"
    require "action_view"
    require "application"
    
    ActionController::Base.append_view_path File.join(RAILS_ROOT, "app", "views")
    
    timestamp = Time.now
    variables = [{:name => "style",  :files => %w(style dashboard/style quicklook/style)},
                 {:name => "ie7fix", :files => %w(dashboard/ie7fix)},
                 {:name => "ie6fix", :files => %w(dashboard/ie6fix quicklook/ie6fix)},
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
        line.match("// *") ?
          line.gsub(/\{(version|year|date|jQuery)\}/) do |matched|
            case matched
            when "{version}"
              args[:version]
            when "{year}"
              timestamp.year.to_s
            when "{date}"
              timestamp.strftime("%Y-%m-%d %H:%M:%S +0100 (%a, %d %B %Y)")
            when "{jQuery}"
              File.open("public/javascripts/jquery.js").readlines
            end
          end : 
          line
      else
        variable = variables.delete_at(index)
        "		var #{variable[:name]} = '#{variable[:value].gsub(/\s+/, " ").gsub("> <", "><").strip}';"
      end
    }

    releases_dir    = "#{RAILS_ROOT}/assets/releases"
    release_dir     = "#{releases_dir}/#{args[:version]}"
    release_symlink = "#{releases_dir}/latest"
    
    # Create directories
    FileUtils.rm_r(release_dir) if File.exists?(release_dir)
    FileUtils.mkdir_p(release_dir)
    
    # Create symbolic link to latest version
    File.delete(release_symlink) if File.exists?(release_symlink)
    File.symlink(args[:version], release_symlink)
    
    # Copy release
    File.open("#{release_dir}/top_up.js", "w").puts(javascript)
    FileUtils.cp_r("public/images/top_up", release_dir)
    
    # Packed release
    packed_dir      = "#{releases_dir}/packed"
    packed_symlink  = "#{packed_dir}/latest.tar.gz"
    
    FileUtils.mkdir_p(packed_dir)
    system "cd #{releases_dir} && tar -cvzf packed/#{args[:version]}.tar.gz #{args[:version]}"
    
    File.delete(packed_symlink) if File.exists?(packed_symlink)
    File.symlink("#{args[:version]}.tar.gz", packed_symlink)
    
    # Set current release in secondary partial
    secondary = File.open("app/views/layouts/_secondary.html.erb").readlines.collect{ |line| 
      line.gsub(/\<small\>Current Release\: [\d\.]+<\/small\>/, "<small>Current Release: #{args[:version]}</small>")
    }
    File.open("app/views/layouts/_secondary.html.erb", "w").puts(secondary)
  end
end