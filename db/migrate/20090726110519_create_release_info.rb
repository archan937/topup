class CreateReleaseInfo < ActiveRecord::Migration
  def self.up
    create_table :release_info, :id => false do |t|
      t.string :version
    end
    ActiveRecord::Base.connection.insert "INSERT INTO release_info (version) VALUES ('0')"
  end

  def self.down
    drop_table :release_info
  end
end
