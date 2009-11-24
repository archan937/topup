class CreateTweets < ActiveRecord::Migration
  def self.up
    create_table :tweets do |t|
      t.column :tweet_id, :bigint
      t.string :profile_image_url
      t.string :from_user
      t.string :to_user
      t.integer :from_user_id
      t.integer :to_user_id
      t.string :source
      t.text :text
      t.datetime :tweeted_at
      t.string :iso_language_code
      t.boolean :ignored
      t.timestamps
    end
  end

  def self.down
    drop_table :tweets
  end
end
