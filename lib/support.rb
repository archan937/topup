
def current_download_version
  File.readlink("#{RAILS_ROOT}/assets/releases/latest")
end

def is_valid_release_version?(version)
  version.match(/^\d+(\.\d+)*$/)
end

def download_url_for(version)
  %w(tar.gz zip).each do |ext|
    return "http://gettopup.com/releases/packed/#{version}.#{ext}" if File.exists? File.join(RAILS_ROOT, "public", "releases", "packed", "#{version}.#{ext}")
  end
  ""
end
