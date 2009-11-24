class Tweet < ActiveRecord::Base
  
  def self.sink #;)
    store new_tweets
  end
  
private

  def self.new_tweets
    client = TwitterSearch::Client.new("topup")
    query  = "topup"
    unless (max_tweet_id = maximum :tweet_id).nil?
      query << " since_id:#{max_tweet_id}"
    end
    
    tweets = client.query(:q => query, :rpp => rpp = 100, :page => page = 1)
    until (search_results = client.query(:q => query, :rpp => rpp, :page => page += 1)).empty?
      tweets.concat search_results
    end
    tweets.sort{|a, b| Time.parse(a.created_at) <=> Time.parse(b.created_at)}
  end
  
  def self.store(tweets)
    refs = {:id => :tweet_id, :created_at => :tweeted_at}
    tweets.each do |tweet|
      attrs = TwitterSearch::Tweet::VARS.collect do |x|
                [refs[x] || x, tweet.send(x)]
              end.flatten
      create Hash[*attrs]
    end
  end
  
end