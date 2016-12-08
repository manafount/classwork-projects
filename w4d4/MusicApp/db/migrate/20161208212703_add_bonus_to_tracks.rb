class AddBonusToTracks < ActiveRecord::Migration[5.0]
  def change
    add_column :tracks, :bonus, :boolean
  end
end
