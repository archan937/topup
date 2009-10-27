class AddUnsubscriptionCodeToComments < ActiveRecord::Migration
  def self.up
    add_column :comments, :unsubscription_code, :string
  end

  def self.down
    remove_column :comments, :unsubscription_code
  end
end
