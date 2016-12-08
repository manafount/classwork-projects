class AddYearToAlbums < ActiveRecord::Migration[5.0]
  def change
    add_column :albums, :year, :integer
  end
end
