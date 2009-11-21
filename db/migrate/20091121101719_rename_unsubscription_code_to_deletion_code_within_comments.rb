class RenameUnsubscriptionCodeToDeletionCodeWithinComments < ActiveRecord::Migration
  def self.up
    rename_column :comments, :unsubscription_code, :deletion_code
  end
  
  def self.down
    rename_column :comments, :deletion_code, :unsubscription_code
  end
end