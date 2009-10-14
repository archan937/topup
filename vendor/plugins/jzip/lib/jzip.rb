
class String
  
  def jzip_require_statement?
    !!self.strip.match(Jzip::Plugin::REG_EXPS[:require_statement])
  end
  
  def required_jzip_source(exclude_exclamation_mark = true)
    self.strip.gsub(Regexp.new([Jzip::Plugin::REG_EXPS[:require_statement].source, ("\!?" if exclude_exclamation_mark)].compact.join), "").strip if self.jzip_require_statement?
  end
  
  def overrule_jzip_minification?
    !!required_jzip_source(false).match(/^!/) if self.jzip_require_statement?
  end
  
end

module Jzip
  module Controller
    def self.included(base)
      base.class_eval do
        include InstanceMethods
        before_filter :compile_javascript_files
      end
    end

    module InstanceMethods
      def compile_javascript_files
        Jzip::Plugin.compile_javascript_files
      end
    end
  end

  module Plugin
    extend self
    
    REG_EXPS = {:require_statement => /^\/\/\=\s*require\s*/}
    TMP_DIR  = File.join(RAILS_ROOT, "tmp", "jzip")
    
    @options = {
      :minify        => RAILS_ENV == "production",
      :always_update => RAILS_ENV != "production"
    }
    attr_reader :options
    
    def options=(value)
      @options.merge!(value)
    end
    
    def add_template_location(location)
      @template_locations << location
    end
    
    def compile_javascript_files
      return unless @options[:always_update] or @initial_compile
      template_refs.each{|source, target| parse_templates(source, target)}
      @initial_compile = false
    end
    
  private
    
    @template_locations = [File.join(RAILS_ROOT, "assets", "jzip")]
    @initial_compile    = true
    
    def template_refs
      Hash[
        *@template_locations.collect do |location|
          (location.is_a?(Hash) ? location.to_a : [location].flatten).collect do |x|
            ref = [x].flatten
            [ref.shift, ref.shift || File.join(RAILS_ROOT, "public", "javascripts")]
          end
        end.flatten
      ]
    end
    
    def parse_templates(source, target)
      Dir.glob(File.join(source, "**", "*.jz")).each do |template|
        parse(derive_attributes(template, source, target))
      end
    end
    
    def derive_attributes(template, source, target)
      {:template     => template,
       :requirements => File.open(template).readlines.collect{|x| requirements(template, x.required_jzip_source) if x.jzip_require_statement?}.compact.flatten,
       :file_name    => (file_name  = "#{File.basename(template, ".jz")}.js"),
       :target_dir   => (target_dir = File.dirname(File.join(target, template.gsub(source, "")))),
       :target_file  => File.join(target_dir, file_name)}
    end
    
    def requirements(template, required_source)
      reserved = {"defaults" => %w(prototype effects dragdrop controls application)}
      basename = File.basename(required_source)
      dirname  = File.dirname(required_source)

      source_dirname = required_source.match(/^\//) ?
                         File.join(RAILS_ROOT, "public", "javascripts") :
                         File.dirname(template)
      
      sources = reserved.include?(basename) ?
                  reserved[basename].collect{|x| File.join(dirname, x)}.
                                     select {|x| File.exists?(File.join(source_dirname, "#{x}.js"))} :
                  [required_source]
                  
      sources.collect{|x| File.join(source_dirname, "#{x}.js")}
    end
    
    def parse(attributes)
      return unless requires_parsing?(attributes)
      notify("Parsing template '#{attributes[:template]}'")
      
      code = File.open(attributes[:template]).readlines.collect do |line|
        if line.jzip_require_statement?
          requirements(attributes[:template], line.required_jzip_source).collect do |x|
            require_code(attributes, x, line.overrule_jzip_minification?)
          end.join("\n\n") + "\n\n"
        else
          line
        end
      end
      
      publish(attributes, code)
    end
    
    def requires_parsing?(attributes)
      return true if !File.exists?(attributes[:target_file]) or (@initial_compile and options[:minify])

      latest_modification_time = File.mtime(attributes[:target_file])
      ([attributes[:template]] + attributes[:requirements]).any?{|x| File.mtime(x) > latest_modification_time}
    end
    
    def require_code(attributes, required_source, overrule_minification)
      if options[:minify]
        if overrule_minification
          notify("Overruling minification of '#{required_source}'")
        else
          tmp_file = File.join(TMP_DIR, attributes[:file_name])
          `ruby #{File.join(File.dirname(__FILE__), "support", "jsmin.rb")} <#{required_source} >#{tmp_file}`
        end
      end
      
      code = File.open(tmp_file || required_source).read
      File.delete(tmp_file) if tmp_file
      code
    end
    
    def publish(attributes, code)
      FileUtils.mkdir_p(attributes[:target_dir])
      File.open(attributes[:target_file], "w") do |f|
        f.write(code)
      end
    end
    
    def notify(message)
      puts "== JZIP: #{message}"
    end
  end  
end
