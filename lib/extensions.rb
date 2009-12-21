
module HelperExtensions
  
  def self.check_options(name, options, html_options = nil)
    html_options ||= {}

    if html_options.delete(:wrapped)
      html_options[:class] = ["css_wrapper", html_options[:class]].compact.join(" ")
      name                 = "<span><span>#{name}</span></span>"
    end
  
    [name, options, html_options]
  end

end

module ActionView::Helpers::JavaScriptHelper

  def link_to_function_with_options(name, *args, &block) 
    if block_given?
      link_to_function_without_options name, *args, &block
    else
      name, foo, html_options = HelperExtensions.check_options(name, nil, args.extract_options!.symbolize_keys)
      link_to_function_without_options name, *args.push(html_options)
    end
  end
  
  alias_method_chain :link_to_function, :options
end

class String
  
  def count_matches(pattern)
    c = 0
    scan(pattern) do |m|
      c += 1
    end
    c
  end
  
end
