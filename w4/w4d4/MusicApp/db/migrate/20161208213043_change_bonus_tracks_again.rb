class ChangeBonusTracksAgain < ActiveRecord::Migration[5.0]
  def change
    change_column :tracks, :bonus, :boolean, default: false
  end
end
