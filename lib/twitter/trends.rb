module TwitterSearch
  class Trend
    VARS = [:query, :name]
    attr_reader *VARS
    attr_reader :exclude_hashtags

    def initialize(opts)
      @exclude_hashtags = !!opts['exclude_hashtags']
      VARS.each { |each| instance_variable_set "@#{each}", opts[each.to_s] }
    end
  end

  class Trends < Array
    VARS = [:date]
    attr_reader *VARS

    def initialize(opts)
      trends = opts('trends').delete
      trends = trends.values.first.collect { |each| Trend.new(each) }
      super(trends)
      VARS.each { |each| instance_variable_set "@#{each}", opts[each.to_s] }
    end
  end
end
