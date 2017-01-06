class ChangeUsers < ActiveRecord::Migration[5.0]
  def self.up
    remove_column :users, :email
    rename_column :users, :name, :username
  end
end
