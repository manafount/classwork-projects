class ChangeTracks < ActiveRecord::Migration[5.0]
  def change
    add_column :tracks, :ord, :integer, presence: true
    add_column :tracks, :lyrics, :string
  end
end
