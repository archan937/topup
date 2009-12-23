class Tweet < ActiveRecord::Base
  
  def self.sink #;)
    store new_tweets "topup"
    store new_tweets "gettopup"
  end
  
private

  def self.new_tweets(criteria)
    client = TwitterSearch::Client.new("topup")
    args   = {:q => criteria, :since_id => Tweet.maximum(:tweet_id), :rpp => 100, :page => page = 1}
    
    tweets = client.query(args)
    until (search_results = client.query(args.merge({:page => page += 1}))).empty?
      tweets.concat search_results
    end
    tweets.sort{|a, b| Time.parse(a.created_at) <=> Time.parse(b.created_at)}
  end
  
  def self.store(tweets)
    refs = {:id => :tweet_id, :created_at => :tweeted_at}
    tweets.each do |tweet|
      attrs = Hash[*TwitterSearch::Tweet::VARS.collect do |x|
                [refs[x] || x, tweet.send(x)]
              end.flatten]
      create attrs unless find_by_tweet_id(attrs[:tweet_id])
    end
  end
  
end