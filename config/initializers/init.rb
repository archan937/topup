TOPTIONS  = YAML.load_file("doc/toptions.yml")
FUNCTIONS = YAML.load_file("doc/functions.yml")
CHANGELOG = File.readlines("CHANGELOG").inject(ActiveSupport::OrderedHash.new){ |log, line|
              if (version = line.match(/\=\= Version \d+(\.\d+)*/))
                log[version.to_s.match(/\d+(\.\d+)*$/).to_s] = []
              end
              log.last.last << line if log.last
              log
            }

require "lib/support"
require "lib/extensions"
require "lib/random_hex"
require "lib/notification_service"
require "lib/twitter/search"