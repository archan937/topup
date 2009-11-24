# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20091123231617) do

  create_table "comments", :force => true do |t|
    t.string   "name"
    t.string   "email_address"
    t.text     "message"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "deletion_code"
  end

  create_table "release_info", :id => false, :force => true do |t|
    t.string "version"
  end

  create_table "trackers", :force => true do |t|
    t.string   "name"
    t.string   "email_address"
    t.boolean  "is_inactive"
    t.text     "tracked_versions"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "unsubscription_code"
  end

  create_table "tweets", :force => true do |t|
    t.integer  "tweet_id",          :limit => 8
    t.string   "profile_image_url"
    t.string   "from_user"
    t.string   "to_user"
    t.integer  "from_user_id"
    t.integer  "to_user_id"
    t.string   "source"
    t.text     "text"
    t.datetime "tweeted_at"
    t.string   "iso_language_code"
    t.boolean  "ignored"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
