class AddIndicesToUser < ActiveRecord::Migration
  def change
    add_index :users, :session_token, unique: true
    add_index :users, :username, unique: true
  end
end
