class CreateTrackers < ActiveRecord::Migration
  def self.up
    create_table :trackers do |t|
      t.string :name
      t.string :email_address
      t.boolean :is_inactive
      t.text :tracked_versions
      t.timestamps
    end
  end

  def self.down
    drop_table :trackers
  end
end
