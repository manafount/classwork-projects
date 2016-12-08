class AddLiveToAlbums < ActiveRecord::Migration[5.0]
  def change
    add_column :albums, :live, :boolean, default: false
  end
end
