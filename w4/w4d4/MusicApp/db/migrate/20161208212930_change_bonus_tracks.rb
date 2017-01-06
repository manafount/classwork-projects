class ChangeBonusTracks < ActiveRecord::Migration[5.0]
  def change
    change_column :tracks, :bonus, :boolean, default: true
  end
end
