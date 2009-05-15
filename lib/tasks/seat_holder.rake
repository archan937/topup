namespace :seat_holder do
  desc "Release SeatHolder for external usage"
  task :release, :version do |task, args|
    if args[:version].blank?
      raise "usage: rake seat_holder:release[version]" 
    end
    
    timestamp = Time.now
    javascript = File.open("public/javascripts/seat_holder.js").readlines.collect{ |line|
      line.match("// *") ?
        line.gsub(/\{(version|year|date)\}/) do |matched|
          case matched
          when "{version}"
            args[:version]
          when "{year}"
            timestamp.year.to_s
          when "{date}"
            timestamp.strftime("%Y-%m-%d %H:%M:%S +0100 (%a, %d %B %Y)")
          end
        end : 
        line
    }
    
    # Define variables
    releases_dir = "#{RAILS_ROOT}/assets/releases/seat_holder"
    release_dir  = "#{releases_dir}/#{args[:version]}"
    release_symlink = "#{releases_dir}/latest"
    
    # Create directories
    FileUtils.rm_r(release_dir) if File.exists?(release_dir)
    FileUtils.mkdir_p(release_dir)
    
    # Create files
    File.open("#{release_dir}/seat_holder.js", "w").puts(javascript)
    FileUtils.cp("public/javascripts/jquery.js", release_dir)
    
    # Create symbolic links
    File.delete(release_symlink) if File.exists?(release_symlink)
    File.symlink(args[:version], release_symlink)

    # Compress release using YUI compressor
    IO.popen "java -jar lib/yuicompressor-2.4.2.jar -v #{release_dir}/seat_holder.js -o #{release_dir}/seat_holder-min.js"
  end
end