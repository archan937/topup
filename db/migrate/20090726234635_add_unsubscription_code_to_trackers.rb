class AddUnsubscriptionCodeToTrackers < ActiveRecord::Migration
  def self.up
    add_column :trackers, :unsubscription_code, :string
  end

  def self.down
    remove_column :trackers, :unsubscription_code
  end
end
