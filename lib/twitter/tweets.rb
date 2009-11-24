module TwitterSearch
  class Tweet
    VARS = [:text, :from_user, :to_user, :to_user_id, :id, :iso_language_code, :from_user_id, :created_at, :profile_image_url, :source ]
    attr_reader *VARS
    attr_reader :language

    def initialize(opts)
      @language = opts['iso_language_code']
      VARS.each { |each| instance_variable_set "@#{each}", opts[each.to_s] }
    end

 	
    def eql?(other)
      self.hash == other.hash
    end

    def hash
      @id
    end

  end

  class Tweets < Array
    VARS = [:since_id, :max_id, :results_per_page, :page, :query, :next_page]
    attr_reader *VARS

    def initialize(opts)
      results = opts.delete('results') || []
      results.collect! { |each| Tweet.new(each) }
      super(results)
      VARS.each { |each| instance_variable_set "@#{each}", opts[each.to_s] }
    end

    def has_next_page?
      ! @next_page.nil?
    end

    def get_next_page
      client = Client.new
      return client.query( CGI.parse( @next_page[1..-1] ) )
    end
  end
end
