class ChangeUser < ActiveRecord::Migration[5.0]
  def change
  end

  add_index(:contacts, :user_id)
  add_index(:contact_shares, :contact_id)
  add_index(:contact_shares, :user_id)
end
